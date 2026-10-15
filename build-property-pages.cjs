const fs = require('fs');
const path = require('path');

// ==========================================================================
// ITW STATIC SITE & PROPERTY PAGES GENERATOR
// Single Source of Truth: properties-data.js
// ==========================================================================

async function generate() {
  const { propertiesDb, propertySlugs } = await import('./properties-data.js');

  const BASE_URL = 'https://hr0417-del.github.io/ITW';

  // 1. Generate Individual Property Pages
  for (const slug of propertySlugs) {
    const data = propertiesDb[slug];
    const targetDir = path.join(__dirname, 'properties', slug);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const cleanHero = data.img.replace('./', '');
    const cleanDesc = (data.about || data.quote || '').replace(/"/g, '&quot;');

    // Build Other Stays Cards
    const otherStaysHtml = propertySlugs
      .filter(s => s !== slug)
      .map(otherSlug => {
        const otherData = propertiesDb[otherSlug];
        const otherImg = otherData.img.replace('./', '');
        return `
          <a href="../${otherSlug}/" class="property-card" data-slug="${otherSlug}">
            <div class="property-image-box">
              <img class="property-img" src="../../${otherImg}" alt="${otherData.name}" loading="lazy">
              <div class="property-badge">${otherData.cat}</div>
            </div>
            <div class="property-content">
              <span class="property-location">${otherData.loc}, ${otherData.dest}</span>
              <h3 class="property-name">${otherData.name}</h3>
              <p class="property-desc">${otherData.quote}</p>
            </div>
          </a>
        `;
      })
      .join('\n');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} | ${data.loc} | Into The Wild</title>
  <meta name="description" content="${cleanDesc}">
  <link rel="canonical" href="${BASE_URL}/properties/${slug}/">
  
  <!-- Open Graph / WhatsApp / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="ITW | Into The Wild">
  <meta property="og:title" content="${data.name} — ${data.loc}">
  <meta property="og:description" content="${cleanDesc}">
  <meta property="og:url" content="${BASE_URL}/properties/${slug}/">
  <meta property="og:image" content="${BASE_URL}/${cleanHero}">
  <meta property="og:image:alt" content="${data.name} property exterior">

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${data.name} — ${data.loc}">
  <meta name="twitter:description" content="${cleanDesc}">
  <meta name="twitter:image" content="${BASE_URL}/${cleanHero}">

  <!-- Schema.org JSON-LD (Verified Information Only) -->
  <script type="application/ld+json">
  ${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": data.name,
    "description": data.about || data.quote,
    "url": `${BASE_URL}/properties/${slug}/`,
    "image": `${BASE_URL}/${cleanHero}`,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": data.lat,
      "longitude": data.lon
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": data.loc,
      "addressRegion": data.dest,
      "addressCountry": "IN"
    },
    "amenityFeature": (data.amenities || []).map(a => ({
      "@type": "LocationFeatureSpecification",
      "name": a,
      "value": true
    }))
  }, null, 2)}
  </script>

  <!-- Typography & Styles -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../style.css">
</head>
<body class="property-page-body" data-slug="${slug}">
  <!-- Ambient Particle Canvas -->
  <canvas class="prop-weather-canvas active" id="prop-weather-canvas"></canvas>

  <!-- Fixed Navigation Header -->
  <header class="main-header">
    <a href="../../" class="header-logo-container" id="header-logo-btn" aria-label="Return to ITW Homepage">
      <svg viewBox="0 0 60 70" class="header-logo-svg" aria-hidden="true">
        <path d="M 0,70 L 0,0 L 60,0 L 60,70 L 50,60 L 50,10 L 10,10 L 10,60 Z" fill="#B8793B" />
      </svg>
      <div class="header-logo-text">
        <span class="logo-title">ITW</span>
        <span class="logo-subtitle">Into The Wild</span>
      </div>
    </a>
    <nav class="header-nav">
      <a href="../../" class="nav-item">Home</a>
      <a href="../../#scene-featured" class="nav-item">Stays</a>
      <a href="../../#scene-destinations" class="nav-item">Destinations</a>
      <a href="../../#scene-partner" class="nav-item">Partner</a>
      <a href="../../#scene-final" class="nav-item">Contact</a>
    </nav>
    <div class="header-actions">
      <!-- Audio Controller -->
      <button class="audio-toggle" id="audio-toggle-btn" aria-label="Toggle Sound" title="Toggle Sound">
        <svg class="icon-mute" viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M3.63 3.63L2.05 5.2l4.5 4.5H3v5h4l5 5V4.41L7.8 8.61l-4.17-4.17zM16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM12 4L9.91 6.09 12 8.18V4z"/>
        </svg>
        <svg class="icon-sound hidden" viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
      </button>
      <button class="inquire-btn" id="inquire-btn">Enquire Now</button>
    </div>
  </header>

  <!-- Breadcrumb Bar -->
  <div class="prop-page-breadcrumb-bar">
    <div class="breadcrumb-inner">
      <a href="../../" class="back-link">
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        Return to Into The Wild
      </a>
      <span class="crumb-separator">/</span>
      <span class="crumb-dest">${data.dest}</span>
      <span class="crumb-separator">/</span>
      <span class="crumb-current">${data.name}</span>
    </div>
  </div>

  <main class="property-page-main">
    <!-- Hero Section -->
    <div class="prop-hero" style="background-image: url('../../${cleanHero}');">
      <div class="prop-hero-tint"></div>
      <div class="prop-hero-header">
        <span class="prop-badge-cat">${data.cat}</span>
        <h1 class="prop-hero-title">${data.name}</h1>
        <p class="prop-hero-loc">${data.dest} • ${data.loc}<span class="details-weather-val" id="details-weather-val"></span></p>
      </div>
    </div>

    <!-- Intro Body -->
    <section class="prop-intro-section">
      <p class="prop-tagline-quote">"${data.quote}"</p>
      <p class="prop-description-body">${data.about}</p>
    </section>

    <!-- Sanctuary Gallery -->
    <section class="prop-gallery-section">
      <h2 class="prop-gallery-title">Sanctuary Gallery</h2>
      <div class="prop-gallery-grid">
        ${(data.gallery || []).map((img, i) => `
          <div class="prop-gallery-item">
            <img class="prop-gallery-img" src="../../${img.replace('./', '')}" alt="${data.name} - sanctuary photography ${i + 1}" loading="lazy">
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Suites & Rooms -->
    ${(data.rooms && data.rooms.length > 0) ? `
    <section class="prop-rooms-section">
      <h2 class="prop-rooms-title">Suites & Rooms</h2>
      <div class="prop-rooms-grid">
        ${data.rooms.map(room => `
          <div class="prop-room-card">
            <div class="room-img-box">
              <img class="room-img" src="../../${room.img.replace('./', '')}" alt="${room.name}" loading="lazy">
            </div>
            <div class="room-details-box">
              <h3 class="room-name">${room.name}</h3>
              <span class="room-occupancy">Max Occupancy: ${room.occupancy}</span>
              <ul class="room-inclusions-list">
                ${room.inclusions.split(',').map(inc => `<li class="room-inc-item">${inc.trim()}</li>`).join('')}
              </ul>
              <div class="room-price-box">
                <span class="room-price-label">Pricing</span>
                <span class="room-price-val" style="font-size: 0.95rem; letter-spacing: 0.05em; text-transform: uppercase; color: var(--color-copper);">By Enquiry</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>` : ''}

    <!-- Amenities Grid -->
    <section class="prop-amenities-section">
      <h2 class="prop-amenities-title">Amenities</h2>
      <div class="prop-amenities-grid">
        ${(data.amenities || []).map(ame => `
          <div class="amenity-item">
            <span class="amenity-dot"></span>
            <span>${ame}</span>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Curated Experiences -->
    <section class="prop-experiences-section">
      <h2 class="prop-experiences-title">Curated Experiences</h2>
      <div class="prop-experiences-grid">
        ${(data.experiences || []).map(exp => `
          <div class="experience-detail-item">
            <span class="exp-bullet"></span>
            <span>${exp}</span>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Customize Stay -->
    ${(data.services && data.services.length > 0) ? `
    <section class="prop-customize-section">
      <h2 class="prop-customize-title">Customize Your Stay</h2>
      <p class="prop-customize-desc">Select from our bespoke on-site services to tailor your experience.</p>
      <div class="prop-services-grid">
        ${data.services.map(ser => `
          <div class="service-item">
            <svg class="service-check" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style="color: var(--color-copper); margin-right: 0.75rem; flex-shrink: 0;">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
            <span>${ser}</span>
          </div>
        `).join('')}
      </div>
      <div style="margin-top: 2rem;">
        <a href="https://wa.me/917404385783?text=${encodeURIComponent(`Hi ITW Team, I am interested in customizing my stay at ${data.name}. I would like to enquire about: ${(data.services || []).join(', ')}.`)}" class="prop-direct-book-btn" id="prop-customize-trigger" target="_blank" rel="noopener">Enquire on WhatsApp</a>
      </div>
    </section>` : ''}

    <!-- Sanctuary Location -->
    <section class="prop-map-section">
      <h2 class="prop-map-title">Sanctuary Location</h2>
      <div class="prop-map-container glass-card">
        <div class="map-coordinates-box">
          <span class="coord-label">Coordinates & Setting</span>
          <span class="coord-val">${data.locationDesc}</span>
          <span class="coord-meta" style="display:block; margin-top:0.35rem; font-size:0.85rem; color: var(--color-copper); opacity:0.85;">${data.lat}&deg;N, ${data.lon}&deg;E</span>
        </div>
        <div class="map-visual-placeholder">
          <svg viewBox="0 0 800 200" class="map-outline-svg">
            <path d="M50 100 C 200 40, 300 160, 450 60 C 600 140, 700 80, 750 100" fill="none" stroke="#B8793B" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.35"/>
            <circle cx="450" cy="60" r="6" fill="#B8793B"/>
            <circle cx="450" cy="60" r="14" fill="none" stroke="#B8793B" stroke-width="1" opacity="0.5"/>
            <text x="470" y="65" fill="#D8D2C4" font-family="var(--font-sans)" font-size="11" letter-spacing="1.5" font-weight="300">${data.loc.toUpperCase()}</text>
          </svg>
        </div>
      </div>
    </section>

    <!-- Guest Testimonials -->
    ${(data.reviews && data.reviews.length > 0) ? `
    <section class="prop-reviews-section">
      <h2 class="prop-reviews-title">Guest Testimonials</h2>
      <div class="prop-reviews-grid">
        ${data.reviews.map(rev => `
          <div class="review-card glass-card" style="padding: 2rem; border-radius: 4px; background: rgba(30, 36, 32, 0.25); border: 1px solid rgba(247, 243, 236, 0.04);">
            <div class="review-rating-row" style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 1rem; color: var(--color-copper); font-size: 0.9rem;">
              <span class="review-rating" style="font-weight: 500;">${rev.rating}</span>
              <span class="review-stars">★★★★★</span>
            </div>
            <p class="review-text" style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--color-stone); font-style: italic; opacity: 0.95; line-height: 1.5; margin-bottom: 1rem;">"${rev.text}"</p>
            <span class="review-guest" style="font-family: var(--font-sans); font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-stone); opacity: 0.6;">— ${rev.guest}</span>
          </div>
        `).join('')}
      </div>
    </section>` : ''}

    <!-- Booking CTA Bar -->
    <div class="prop-booking-cta-bar">
      <h2 class="prop-cta-heading">Ready to step in?</h2>
      <p class="prop-cta-sub">Submit an inquiry or connect with our experience coordinators directly.</p>
      <div class="prop-cta-btns-row">
        <button class="prop-direct-book-btn" id="prop-book-now-trigger" data-slug="${slug}">Book Your Stay</button>
        <a href="https://wa.me/917404385783?text=${encodeURIComponent(`Hi ITW Team, I am interested in booking a stay at ${data.name}. Please connect me with a curator.`)}" class="prop-whatsapp-btn" id="prop-whatsapp-trigger" data-slug="${slug}" target="_blank" rel="noopener">
          <svg class="whatsapp-icon" viewBox="0 0 24 24" width="20" height="20">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.503-5.729-1.46L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.59 2.01 14.12 1.01 11.5 1.012c-5.443 0-9.87 4.373-9.874 9.803-.001 1.737.478 3.427 1.39 4.938L2.08 21.82l6.236-1.637z"/>
            <path d="M16.945 14.73c-.27-.135-1.597-.788-1.845-.878-.248-.09-.43-.135-.61.135-.18.27-.698.878-.855 1.058-.158.18-.315.202-.585.067-.27-.135-1.14-.42-2.17-1.34-.8-.713-1.34-1.597-1.498-1.867-.158-.27-.017-.417.118-.552.12-.122.27-.315.405-.473.135-.157.18-.27.27-.45.09-.18.045-.337-.022-.472-.068-.135-.61-1.467-.835-2.012-.22-.527-.44-.455-.61-.464-.158-.007-.338-.007-.518-.007-.18 0-.472.067-.72.337-.248.27-.945.923-.945 2.25 0 1.328.967 2.61 1.102 2.79.135.18 1.902 2.905 4.608 4.075.643.278 1.144.444 1.534.569.646.205 1.234.176 1.7.106.52-.078 1.597-.652 1.822-1.25.225-.597.225-1.103.158-1.21-.068-.108-.248-.154-.518-.29z"/>
          </svg>
          Chat on WhatsApp
        </a>
      </div>
    </div>

    <!-- Explore Other Sanctuaries -->
    <section class="prop-other-stays-section">
      <div class="scene-header" style="text-align: center; margin-bottom: 2.5rem;">
        <h2 class="scene-title">EXPLORE OTHER SANCTUARIES</h2>
        <p class="scene-subtitle" style="font-family: var(--font-sans); color: var(--color-stone); opacity: 0.7; font-size: 0.95rem; letter-spacing: 0.05em; text-transform: uppercase; margin-top: 0.5rem;">Handpicked places under high mountain skies</p>
      </div>
      <div class="featured-properties-grid">
        ${otherStaysHtml}
      </div>
    </section>
  </main>

  <!-- ITW Footer -->
  <footer class="main-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <svg viewBox="0 0 60 70" class="footer-logo-svg" aria-hidden="true">
          <path d="M 0,70 L 0,0 L 60,0 L 60,70 L 50,60 L 50,10 L 10,10 L 10,60 Z" fill="#B8793B" />
        </svg>
        <span class="footer-logo-title">ITW</span>
        <span class="footer-logo-sub">INTO THE WILD</span>
      </div>
      <div class="footer-copy-wrap">
        <p class="footer-copyright">&copy; 2026 Into The Wild. All rights reserved.</p>
        <p class="footer-designation">Designed for stillness.</p>
      </div>
    </div>
  </footer>

  <!-- Lightbox Overlay -->
  <div id="gallery-lightbox" class="lightbox-overlay hidden">
    <button id="close-lightbox" class="close-lightbox-btn" aria-label="Close Lightbox">
      <svg viewBox="0 0 24 24" width="36" height="36">
        <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
      </svg>
    </button>
    <img id="lightbox-img" class="lightbox-img" src="" alt="Enlarged view">
  </div>

  <!-- Interactive Booking Portal Overlay -->
  <div class="booking-portal-overlay" id="booking-portal-overlay">
    <button class="close-overlay-btn" id="close-booking-overlay" aria-label="Close Booking Portal">
      <svg viewBox="0 0 24 24" width="28" height="28">
        <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
      </svg>
    </button>
    <div class="booking-portal-content" id="booking-portal-wizard"></div>
  </div>

  <!-- Floating Booking Pill -->
  <div class="booking-pill-container" id="booking-pill-trigger">
    <div class="pill-glow"></div>
    <div class="pill-text-wrap">
      <span class="pill-text">BOOK YOUR STAY</span>
    </div>
  </div>

  <script type="module" src="../../property-page.js"></script>
</body>
</html>
`;

    fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
    console.log(`Generated: properties/${slug}/index.html`);
  }

  // 2. Generate Branded 404.html
  const notFoundHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sanctuary Not Found | Into The Wild</title>
  <meta name="description" content="The sanctuary path you are seeking is uncharted or has been moved.">
  <link rel="canonical" href="${BASE_URL}/404.html">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./style.css">
</head>
<body class="not-found-body">
  <div class="not-found-wrap">
    <header class="not-found-header">
      <a href="./" class="header-logo-container" aria-label="ITW Homepage">
        <svg viewBox="0 0 60 70" class="header-logo-svg" aria-hidden="true">
          <path d="M 0,70 L 0,0 L 60,0 L 60,70 L 50,60 L 50,10 L 10,10 L 10,60 Z" fill="#B8793B" />
        </svg>
        <div class="header-logo-text">
          <span class="logo-title">ITW</span>
          <span class="logo-subtitle">Into The Wild</span>
        </div>
      </a>
    </header>

    <div class="not-found-content">
      <span class="not-found-code">404 &bull; UNCHARTED TRAIL</span>
      <h1 class="not-found-title">Lost in the Mountain Mist</h1>
      <p class="not-found-desc">The sanctuary path you are following does not exist or has been shifted with the season. Let us guide you back to the hearth.</p>
      <div class="not-found-cta">
        <a href="./" class="begin-journey-btn">
          <span class="btn-shine"></span>
          <span class="btn-text">Return to Into The Wild</span>
        </a>
      </div>
    </div>
  </div>
</body>
</html>
`;
  fs.writeFileSync(path.join(__dirname, '404.html'), notFoundHtml, 'utf8');
  console.log('Generated: 404.html');

  // 3. Generate public/sitemap.xml
  const today = new Date().toISOString().split('T')[0];
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${propertySlugs.map(slug => `  <url>
    <loc>${BASE_URL}/properties/${slug}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>
`;
  if (!fs.existsSync(path.join(__dirname, 'public'))) {
    fs.mkdirSync(path.join(__dirname, 'public'), { recursive: true });
  }
  fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapXml, 'utf8');
  console.log('Generated: public/sitemap.xml & sitemap.xml');

  // 4. Generate public/robots.txt and robots.txt
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(__dirname, 'public', 'robots.txt'), robotsTxt, 'utf8');
  fs.writeFileSync(path.join(__dirname, 'robots.txt'), robotsTxt, 'utf8');
  console.log('Generated: public/robots.txt & robots.txt');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
