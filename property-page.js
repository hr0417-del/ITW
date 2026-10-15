import { propertiesDb } from './properties-data.js';
import { audioEngine } from './audio.js';

// ==========================================================================
// ITW DEDICATED PROPERTY PAGE CLIENT LOGIC
// ==========================================================================

const currentSlug = document.body.getAttribute('data-slug') || '';
const propData = propertiesDb[currentSlug] || null;

// 1. Audio Engine Toggle
const audioToggleBtn = document.getElementById('audio-toggle-btn');
const iconMute = audioToggleBtn?.querySelector('.icon-mute');
const iconSound = audioToggleBtn?.querySelector('.icon-sound');

if (audioToggleBtn) {
  audioToggleBtn.addEventListener('click', () => {
    audioEngine.init();
    const isMuted = audioEngine.toggleMute();
    if (isMuted) {
      iconMute?.classList.remove('hidden');
      iconSound?.classList.add('hidden');
    } else {
      iconMute?.classList.add('hidden');
      iconSound?.classList.remove('hidden');
    }
  });
}

// 2. Lightbox Gallery Logic
const lightbox = document.getElementById('gallery-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightboxBtn = document.getElementById('close-lightbox');

function openLightbox(src) {
  if (lightbox && lightboxImg) {
    lightboxImg.src = src;
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  if (lightbox) {
    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

if (closeLightboxBtn) {
  closeLightboxBtn.addEventListener('click', closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeBookingPortal();
  }
});

// Bind all gallery & room images to lightbox
document.querySelectorAll('.prop-gallery-img, .room-img').forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => {
    openLightbox(img.src);
  });
});

// 3. Live Weather Fetch & Particle Canvas
const weatherFallbacks = {
  "luxury-farm-stay": { temp: 22, code: 1 },
  "camp-cottages": { temp: 14, code: 0 },
  "mountain-homestay": { temp: 15, code: 2 },
  "forest-cottages": { temp: 18, code: 2 },
  "luxury-tree-house": { temp: 18, code: 2 },
  "frontier-camp": { temp: 16, code: 0 },
  "mountain-huts": { temp: 17, code: 2 },
  "camp-huts": { temp: 17, code: 2 }
};

function getWeatherDetails(code) {
  switch (code) {
    case 0:
      return { desc: "Clear Sky", category: "clear" };
    case 1:
    case 2:
    case 3:
      return { desc: "Partly Cloudy", category: "cloudy" };
    case 45:
    case 48:
      return { desc: "Foggy", category: "cloudy" };
    case 51:
    case 53:
    case 55:
    case 61:
    case 63:
    case 65:
    case 80:
    case 81:
    case 82:
    case 95:
      return { desc: "Rain Showers", category: "rain" };
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return { desc: "Snowfall", category: "snow" };
    default:
      return { desc: "Mild", category: "cloudy" };
  }
}

async function initWeather() {
  if (!propData || !propData.lat || !propData.lon) return;
  const weatherValEl = document.getElementById('details-weather-val');
  
  let temp = 18;
  let category = 'clear';
  let desc = 'Clear Sky';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${propData.lat}&longitude=${propData.lon}&current_weather=true`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data.current_weather) {
        temp = Math.round(data.current_weather.temperature);
        const details = getWeatherDetails(data.current_weather.weathercode);
        category = details.category;
        desc = details.desc;
      }
    }
  } catch {
    const fb = weatherFallbacks[currentSlug] || { temp: 18, code: 1 };
    const details = getWeatherDetails(fb.code);
    temp = fb.temp;
    category = details.category;
    desc = details.desc;
  }

  if (weatherValEl) {
    weatherValEl.innerHTML = ` &bull; <span class="weather-status-dot ${category}"></span><span style="color: var(--color-stone);">${temp}&deg;C</span> <span style="opacity: 0.6; font-size: 0.9rem; font-family: var(--font-sans); letter-spacing: 0.05em; text-transform: uppercase; margin-left: 0.25rem;">${desc}</span>`;
  }

  // Start background canvas
  const canvas = document.getElementById('prop-weather-canvas');
  if (canvas) {
    initWeatherCanvas(canvas, category);
  }
}

function initWeatherCanvas(canvas, type) {
  const ctx = canvas.getContext('2d');
  let animationId = null;
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const count = type === 'snow' ? 60 : (type === 'rain' ? 80 : 35);

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: type === 'snow' ? Math.random() * 2 + 1 : Math.random() * 1.5 + 0.5,
      speedY: type === 'snow' ? Math.random() * 0.8 + 0.3 : (type === 'rain' ? Math.random() * 4 + 3 : Math.random() * 0.3 + 0.1),
      speedX: Math.random() * 0.4 - 0.2,
      opacity: Math.random() * 0.4 + 0.1
    });
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = type === 'clear' ? 'rgba(184, 121, 59, 0.15)' : 'rgba(247, 243, 236, 0.25)';

    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      if (p.y > height) {
        p.y = -5;
        p.x = Math.random() * width;
      }
      if (p.x > width) p.x = 0;
      if (p.x < 0) p.x = width;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    animationId = requestAnimationFrame(loop);
  }

  loop();
}

// 4. WhatsApp & Direct Enquiry Handlers
const whatsappTrigger = document.getElementById('prop-whatsapp-trigger');
if (whatsappTrigger && propData) {
  whatsappTrigger.addEventListener('click', () => {
    const msg = `Hi ITW Team, I am interested in booking a stay at ${propData.name}. Please connect me with a curator.`;
    window.open(`https://wa.me/917404385783?text=${encodeURIComponent(msg)}`, '_blank');
  });
}

const customizeTrigger = document.getElementById('prop-customize-trigger');
if (customizeTrigger && propData && propData.services) {
  customizeTrigger.addEventListener('click', () => {
    const msg = `Hi ITW Team, I am interested in customizing my stay at ${propData.name}. I would like to enquire about: ${propData.services.join(', ')}.`;
    window.open(`https://wa.me/917404385783?text=${encodeURIComponent(msg)}`, '_blank');
  });
}

// 5. Interactive Booking Portal Wizard
const bookingPortal = document.getElementById('booking-portal-overlay');
const closeBookingBtn = document.getElementById('close-booking-overlay');
const bookingWizard = document.getElementById('booking-portal-wizard');
const bookNowTrigger = document.getElementById('prop-book-now-trigger');
const floatingPillTrigger = document.getElementById('booking-pill-trigger');
const headerInquireBtn = document.getElementById('inquire-btn');

const bookingState = {
  propertySlug: currentSlug,
  checkIn: '',
  checkOut: '',
  guests: '2 Guests',
  roomType: propData?.rooms?.[0]?.name || 'Standard Accommodation',
  currentStep: 3 // Start directly at Date Selection for property pages
};

function openBookingPortal() {
  if (!bookingPortal || !bookingWizard || !propData) return;
  bookingState.propertySlug = currentSlug;
  bookingState.currentStep = 3;
  renderBookingStep();
  bookingPortal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeBookingPortal() {
  if (bookingPortal) {
    bookingPortal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

if (closeBookingBtn) closeBookingBtn.addEventListener('click', closeBookingPortal);
if (bookNowTrigger) bookNowTrigger.addEventListener('click', openBookingPortal);
if (floatingPillTrigger) floatingPillTrigger.addEventListener('click', openBookingPortal);
if (headerInquireBtn) headerInquireBtn.addEventListener('click', openBookingPortal);

if (bookingPortal) {
  bookingPortal.addEventListener('click', (e) => {
    if (e.target === bookingPortal) closeBookingPortal();
  });
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

function renderBookingStep() {
  if (!bookingWizard || !propData) return;
  bookingWizard.innerHTML = '';
  const step = bookingState.currentStep;

  const container = document.createElement('div');
  container.className = `booking-wizard-step active ${step === 7 ? 'results-step' : ''}`;

  let stepContent = '';
  const navFooter = `
    <div class="wizard-nav-footer">
      ${step > 3 ? `<button class="wizard-back-btn" id="wizard-prev-btn">Back</button>` : ''}
      ${step < 7 ? `<button class="wizard-next-btn" id="wizard-next-btn">Next Step</button>` : ''}
    </div>
  `;

  if (step === 3) {
    // Dates
    const today = new Date().toISOString().split('T')[0];
    stepContent = `
      <div class="wizard-header">
        <span class="wizard-step-indicator">Step 1 of 4 • Journey Dates</span>
        <h3 class="wizard-title">${propData.name}</h3>
        <p class="wizard-subtitle">Select your intended dates of sanctuary.</p>
      </div>
      <div class="wizard-form-group">
        <label class="wizard-label">Check-in Date</label>
        <input type="date" id="wizard-checkin" class="wizard-input-date" min="${today}" value="${bookingState.checkIn}">
      </div>
      <div class="wizard-form-group" style="margin-top: 1.5rem;">
        <label class="wizard-label">Check-out Date</label>
        <input type="date" id="wizard-checkout" class="wizard-input-date" min="${today}" value="${bookingState.checkOut}">
      </div>
    `;
  } else if (step === 4) {
    // Guests
    stepContent = `
      <div class="wizard-header">
        <span class="wizard-step-indicator">Step 2 of 4 • Party Size</span>
        <h3 class="wizard-title">Who is journeying?</h3>
        <p class="wizard-subtitle">Intimate spaces designed for solitude or shared reflection.</p>
      </div>
      <div class="wizard-choices-grid">
        ${['1 Guest (Solitude)', '2 Guests (Couples / Duo)', '3-4 Guests (Small Group)', '5+ Guests (Full Retreat)'].map(g => `
          <div class="wizard-choice-card ${bookingState.guests.startsWith(g.split(' ')[0]) ? 'selected' : ''}" data-guests="${g.split(' ')[0]} Guests">
            <span class="choice-label">${g}</span>
          </div>
        `).join('')}
      </div>
    `;
  } else if (step === 5) {
    // Room selection
    stepContent = `
      <div class="wizard-header">
        <span class="wizard-step-indicator">Step 3 of 4 • Accommodation</span>
        <h3 class="wizard-title">Select Suite or Cottage</h3>
        <p class="wizard-subtitle">Choose your dwelling at ${propData.name}.</p>
      </div>
      <div class="wizard-choices-grid">
        ${(propData.rooms || []).map(r => `
          <div class="wizard-choice-card ${bookingState.roomType === r.name ? 'selected' : ''}" data-room="${r.name}">
            <span class="choice-label">${r.name}</span>
            <span class="choice-meta">${r.occupancy} • ${r.inclusions}</span>
          </div>
        `).join('')}
      </div>
    `;
  } else if (step === 6 || step === 7) {
    // Summary & WhatsApp Submission
    const checkinF = formatDate(bookingState.checkIn) || 'Flexible';
    const checkoutF = formatDate(bookingState.checkOut) || 'Flexible';
    const inquiryText = `Hi Into The Wild team, I'd like to make a booking enquiry for:
- Property: ${propData.name} (${propData.loc})
- Dwelling: ${bookingState.roomType}
- Dates: ${checkinF} to ${checkoutF}
- Guests: ${bookingState.guests}

Please confirm availability and share itinerary details.`;

    stepContent = `
      <div class="wizard-header">
        <span class="wizard-step-indicator">Step 4 of 4 • Final Confirmation</span>
        <h3 class="wizard-title">Reservation Summary</h3>
        <p class="wizard-subtitle">Connect directly with our experience curator on WhatsApp to confirm availability.</p>
      </div>
      <div class="wizard-summary-card glass-card" style="padding: 1.5rem; background: rgba(30, 36, 32, 0.4); border: 1px solid rgba(184, 121, 59, 0.2); border-radius: 4px; margin-bottom: 2rem;">
        <div style="margin-bottom: 0.75rem;"><strong style="color: var(--color-copper);">Sanctuary:</strong> <span style="color: var(--color-ivory);">${propData.name}</span></div>
        <div style="margin-bottom: 0.75rem;"><strong style="color: var(--color-copper);">Dwelling:</strong> <span style="color: var(--color-ivory);">${bookingState.roomType}</span></div>
        <div style="margin-bottom: 0.75rem;"><strong style="color: var(--color-copper);">Dates:</strong> <span style="color: var(--color-ivory);">${checkinF} &rarr; ${checkoutF}</span></div>
        <div><strong style="color: var(--color-copper);">Guests:</strong> <span style="color: var(--color-ivory);">${bookingState.guests}</span></div>
      </div>
      <div style="text-align: center;">
        <button class="prop-whatsapp-btn" id="confirm-whatsapp-submit" style="width: 100%; justify-content: center; padding: 1rem 2rem; font-size: 1rem;">
          <svg class="whatsapp-icon" viewBox="0 0 24 24" width="22" height="22">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.503-5.729-1.46L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.59 2.01 14.12 1.01 11.5 1.012c-5.443 0-9.87 4.373-9.874 9.803-.001 1.737.478 3.427 1.39 4.938L2.08 21.82l6.236-1.637z"/>
            <path d="M16.945 14.73c-.27-.135-1.597-.788-1.845-.878-.248-.09-.43-.135-.61.135-.18.27-.698.878-.855 1.058-.158.18-.315.202-.585.067-.27-.135-1.14-.42-2.17-1.34-.8-.713-1.34-1.597-1.498-1.867-.158-.27-.017-.417.118-.552.12-.122.27-.315.405-.473.135-.157.18-.27.27-.45.09-.18.045-.337-.022-.472-.068-.135-.61-1.467-.835-2.012-.22-.527-.44-.455-.61-.464-.158-.007-.338-.007-.518-.007-.18 0-.472.067-.72.337-.248.27-.945.923-.945 2.25 0 1.328.967 2.61 1.102 2.79.135.18 1.902 2.905 4.608 4.075.643.278 1.144.444 1.534.569.646.205 1.234.176 1.7.106.52-.078 1.597-.652 1.822-1.25.225-.597.225-1.103.158-1.21-.068-.108-.248-.154-.518-.29z"/>
          </svg>
          Transmit Reservation via WhatsApp
        </button>
      </div>
    `;
  }

  container.innerHTML = stepContent + (step < 6 ? navFooter : '');
  bookingWizard.appendChild(container);

  // Bind step interactions
  const prevBtn = document.getElementById('wizard-prev-btn');
  const nextBtn = document.getElementById('wizard-next-btn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      bookingState.currentStep--;
      renderBookingStep();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (step === 3) {
        const cin = document.getElementById('wizard-checkin')?.value;
        const cout = document.getElementById('wizard-checkout')?.value;
        bookingState.checkIn = cin;
        bookingState.checkOut = cout;
      }
      bookingState.currentStep++;
      renderBookingStep();
    });
  }

  // Guest cards
  container.querySelectorAll('[data-guests]').forEach(card => {
    card.addEventListener('click', () => {
      bookingState.guests = card.getAttribute('data-guests');
      bookingState.currentStep = 5;
      renderBookingStep();
    });
  });

  // Room cards
  container.querySelectorAll('[data-room]').forEach(card => {
    card.addEventListener('click', () => {
      bookingState.roomType = card.getAttribute('data-room');
      bookingState.currentStep = 6;
      renderBookingStep();
    });
  });

  // Final WhatsApp submit
  const finalBtn = document.getElementById('confirm-whatsapp-submit');
  if (finalBtn) {
    finalBtn.addEventListener('click', () => {
      const checkinF = formatDate(bookingState.checkIn) || 'Flexible';
      const checkoutF = formatDate(bookingState.checkOut) || 'Flexible';
      const text = `Hi Into The Wild team, I'd like to make a booking enquiry for:
- Property: ${propData.name} (${propData.loc})
- Dwelling: ${bookingState.roomType}
- Dates: ${checkinF} to ${checkoutF}
- Guests: ${bookingState.guests}

Please confirm availability and share itinerary details.`;
      window.open(`https://wa.me/917404385783?text=${encodeURIComponent(text)}`, '_blank');
      closeBookingPortal();
    });
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWeather);
} else {
  initWeather();
}
