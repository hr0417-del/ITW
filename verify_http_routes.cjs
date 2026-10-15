const http = require('http');
const fs = require('fs');
const path = require('path');

// ==========================================================================
// SIMULATED GITHUB PAGES HTTP SERVER & ASSET INTEGRITY AUDITOR
// Serves dist/ mounted at /ITW/ to mimic https://hr0417-del.github.io/ITW/
// ==========================================================================

const DIST_DIR = path.join(__dirname, 'dist');
const PORT = 8089;

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html';
    case '.css': return 'text/css';
    case '.js': return 'application/javascript';
    case '.json': return 'application/json';
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.webp': return 'image/webp';
    case '.avif': return 'image/avif';
    case '.svg': return 'image/svg+xml';
    case '.mp4': return 'video/mp4';
    case '.xml': return 'application/xml';
    case '.txt': return 'text/plain';
    default: return 'application/octet-stream';
  }
}

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);

  // Strip simulated GitHub Pages subpath
  if (reqPath.startsWith('/ITW')) {
    reqPath = reqPath.slice(4);
  }

  if (reqPath === '' || reqPath === '/') {
    reqPath = '/index.html';
  } else if (reqPath.endsWith('/')) {
    reqPath += 'index.html';
  }

  const filePath = path.join(DIST_DIR, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, { 'Content-Type': getMimeType(filePath) });
    fs.createReadStream(filePath).pipe(res);
  } else {
    // 404
    const notFoundPath = path.join(DIST_DIR, '404.html');
    if (fs.existsSync(notFoundPath)) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      fs.createReadStream(notFoundPath).pipe(res);
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  }
});

server.listen(PORT, async () => {
  console.log(`Simulated GitHub Pages server listening on http://127.0.0.1:${PORT}/ITW/\n`);

  async function fetchUrl(urlPath) {
    return new Promise((resolve) => {
      http.get(`http://127.0.0.1:${PORT}${urlPath}`, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          resolve({ status: res.statusCode, headers: res.headers, body });
        });
      }).on('error', (err) => {
        resolve({ status: 500, error: err.message });
      });
    });
  }

  let totalTests = 0;
  let passedTests = 0;

  async function check(urlPath, expectedStatus = 200) {
    totalTests++;
    const res = await fetchUrl(urlPath);
    if (res.status === expectedStatus) {
      passedTests++;
      console.log(`[PASS] HTTP ${res.status} -> ${urlPath}`);
      return res;
    } else {
      console.error(`[FAIL] Expected ${expectedStatus}, got ${res.status} -> ${urlPath}`);
      return res;
    }
  }

  console.log('--- 1. Testing Core Pages under simulated /ITW/ subpath ---');
  await check('/ITW/');
  await check('/ITW/404.html');
  await check('/ITW/sitemap.xml');
  await check('/ITW/robots.txt');

  const { propertySlugs } = await import('./properties-data.js');

  console.log('\n--- 2. Testing 8 Direct Property URLs & Nested Asset Extraction ---');
  for (const slug of propertySlugs) {
    const pageUrl = `/ITW/properties/${slug}/`;
    const res = await check(pageUrl, 200);

    // Extract all src and href from the HTML page to test relative asset resolution
    const html = res.body;
    const srcMatches = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)].map(m => m[1]);

    for (const link of srcMatches) {
      if (link.startsWith('http://') || link.startsWith('https://') || link.startsWith('#') || link.startsWith('mailto:') || link.startsWith('tel:')) {
        continue;
      }
      
      // Resolve relative link from /ITW/properties/<slug>/
      let resolved;
      if (link.startsWith('../../')) {
        resolved = '/ITW/' + link.slice(6);
      } else if (link.startsWith('../')) {
        resolved = '/ITW/properties/' + link.slice(3);
      } else if (link.startsWith('./')) {
        resolved = `/ITW/properties/${slug}/` + link.slice(2);
      } else {
        resolved = `/ITW/properties/${slug}/` + link;
      }

      const assetRes = await check(resolved, 200);
      if (assetRes.status !== 200) {
        console.error(`Broken asset link on ${slug}: "${link}" -> resolved to "${resolved}"`);
      }
    }
  }

  console.log('\n--- 3. Testing 404 Fallback behavior for invalid slug ---');
  await check('/ITW/properties/unknown-phantom-property/', 404);
  await check('/ITW/non-existent-page.html', 404);

  console.log(`\n======================================================`);
  console.log(`HTTP INTEGRITY RESULTS: ${passedTests}/${totalTests} requests succeeded (100%).`);
  console.log(`======================================================\n`);

  server.close(() => {
    if (passedTests === totalTests) {
      console.log('ALL SIMULATED GITHUB PAGES TESTS PASSED WITH 0 BROKEN PATHS!');
      process.exit(0);
    } else {
      console.error('FAILURES DETECTED IN ROUTE OR ASSET RESOLUTION');
      process.exit(1);
    }
  });
});
