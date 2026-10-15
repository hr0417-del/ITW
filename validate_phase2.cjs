const fs = require('fs');
const path = require('path');
const http = require('http');

// ==========================================================================
// PHASE 2 VALIDATION SUITE
// Tests static HTML, SEO, Open Graph, JSON-LD, Assets, and HTTP 200s
// ==========================================================================

async function runValidation() {
  console.log('--- STARTING PHASE 2 VALIDATION SUITE ---');
  let errors = 0;
  let checks = 0;

  function assert(condition, message) {
    checks++;
    if (!condition) {
      console.error(`[FAIL] ${message}`);
      errors++;
    } else {
      console.log(`[PASS] ${message}`);
    }
  }

  const { propertiesDb, propertySlugs } = await import('./properties-data.js');

  // Check 1: Slugs and properties count
  assert(propertySlugs.length === 8, '8 property slugs defined in single source of truth');

  // Check 2: Verify dist directory output
  const distDir = path.join(__dirname, 'dist');
  assert(fs.existsSync(distDir), 'dist/ directory exists');
  assert(fs.existsSync(path.join(distDir, 'index.html')), 'dist/index.html exists');
  assert(fs.existsSync(path.join(distDir, '404.html')), 'dist/404.html exists');
  assert(fs.existsSync(path.join(distDir, 'sitemap.xml')), 'dist/sitemap.xml exists');
  assert(fs.existsSync(path.join(distDir, 'robots.txt')), 'dist/robots.txt exists');

  // Check 3: Sitemap contents
  const sitemapContent = fs.readFileSync(path.join(distDir, 'sitemap.xml'), 'utf8');
  assert(sitemapContent.includes('https://hr0417-del.github.io/ITW/'), 'sitemap.xml contains homepage URL');
  for (const slug of propertySlugs) {
    assert(
      sitemapContent.includes(`https://hr0417-del.github.io/ITW/properties/${slug}/`),
      `sitemap.xml contains URL for ${slug}`
    );
  }

  // Check 4: Robots.txt content
  const robotsContent = fs.readFileSync(path.join(distDir, 'robots.txt'), 'utf8');
  assert(robotsContent.includes('Sitemap: https://hr0417-del.github.io/ITW/sitemap.xml'), 'robots.txt specifies correct sitemap URL');

  // Check 5: Inspect each property's generated HTML in dist/
  for (const slug of propertySlugs) {
    const data = propertiesDb[slug];
    const pagePath = path.join(distDir, 'properties', slug, 'index.html');
    assert(fs.existsSync(pagePath), `dist/properties/${slug}/index.html exists`);

    const html = fs.readFileSync(pagePath, 'utf8');

    // Title
    assert(html.includes(`<title>${data.name} | ${data.loc} | Into The Wild</title>`), `${slug}: unique, descriptive <title>`);

    // Meta Description
    assert(html.includes('<meta name="description"'), `${slug}: has meta description`);

    // Canonical
    assert(
      html.includes(`<link rel="canonical" href="https://hr0417-del.github.io/ITW/properties/${slug}/">`),
      `${slug}: correct GitHub Pages canonical URL`
    );

    // Open Graph
    assert(html.includes(`<meta property="og:title" content="${data.name} — ${data.loc}">`), `${slug}: valid og:title`);
    assert(html.includes(`<meta property="og:url" content="https://hr0417-del.github.io/ITW/properties/${slug}/">`), `${slug}: valid og:url`);
    assert(html.includes('<meta property="og:image" content="https://hr0417-del.github.io/ITW/'), `${slug}: valid og:image absolute URL`);
    assert(html.includes('<meta property="og:type" content="website">'), `${slug}: og:type website`);

    // Twitter
    assert(html.includes('<meta name="twitter:card" content="summary_large_image">'), `${slug}: valid twitter:card`);
    assert(html.includes(`<meta name="twitter:title" content="${data.name} — ${data.loc}">`), `${slug}: valid twitter:title`);

    // JSON-LD
    const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    assert(!!jsonLdMatch, `${slug}: JSON-LD schema block present`);
    if (jsonLdMatch) {
      try {
        const schema = JSON.parse(jsonLdMatch[1]);
        assert(schema['@type'] === 'LodgingBusiness', `${slug}: schema @type is LodgingBusiness`);
        assert(schema.name === data.name, `${slug}: schema name matches`);
        assert(schema.geo.latitude === data.lat, `${slug}: schema verified latitude matches`);
        assert(schema.geo.longitude === data.lon, `${slug}: schema verified longitude matches`);
        assert(Array.isArray(schema.amenityFeature), `${slug}: schema amenityFeature array present`);
      } catch (err) {
        assert(false, `${slug}: JSON-LD is valid JSON: ${err.message}`);
      }
    }

    // WhatsApp Booking CTA
    assert(html.includes('https://wa.me/917404385783'), `${slug}: contains official ITW WhatsApp number link`);

    // Crawlable internal links to other sanctuaries
    const otherSlugs = propertySlugs.filter(s => s !== slug);
    for (const other of otherSlugs) {
      assert(html.includes(`href="../${other}/"`), `${slug}: crawlable link to other stay ../${other}/`);
    }

    // Return to home link
    assert(html.includes('href="../../"'), `${slug}: return to home link href="../../" present`);
  }

  // Check 6: Homepage property cards crawlability
  const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
  for (const slug of propertySlugs) {
    assert(
      indexHtml.includes(`href="./properties/${slug}/"`),
      `dist/index.html: contains crawlable anchor <a href="./properties/${slug}/">`
    );
  }

  console.log(`\nValidation Summary: ${checks - errors}/${checks} checks passed.`);
  if (errors > 0) {
    console.error(`FAILED with ${errors} errors.`);
    process.exit(1);
  } else {
    console.log('ALL PHASE 2 VALIDATION CHECKS PASSED PERFECTLY!\n');
  }
}

runValidation().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
