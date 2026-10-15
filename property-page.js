import {
  propertiesDb,
  getProperty,
  calculateNights,
  formatDisplayDate,
  getNextDayDateString,
  buildEnquiryWhatsAppMessage,
  buildEnquiryWhatsAppUrl
} from './properties-data.js';
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
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightbox.classList.remove('hidden');
  lightbox.offsetWidth; // Force reflow
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('active');
  setTimeout(() => {
    if (!lightbox.classList.contains('active')) {
      lightbox.classList.add('hidden');
    }
  }, 400);
  if (!bookingPortal || !bookingPortal.classList.contains('active')) {
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

// 2b. Mobile Navigation Drawer Controller
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
const closeMobileNavBtn = document.getElementById('close-mobile-nav-btn');
const mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');
const mobileNavInquireBtn = document.getElementById('mobile-nav-inquire-btn');

function openMobileNav() {
  if (!mobileNavDrawer) return;
  mobileNavDrawer.classList.add('active');
  mobileNavDrawer.setAttribute('aria-hidden', 'false');
  if (mobileMenuBtn) {
    mobileMenuBtn.classList.add('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
  }
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  if (!mobileNavDrawer) return;
  mobileNavDrawer.classList.remove('active');
  mobileNavDrawer.setAttribute('aria-hidden', 'true');
  if (mobileMenuBtn) {
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  }
  const isAnyModalActive = document.querySelector('.booking-portal-overlay.active, .lightbox-overlay.active');
  if (!isAnyModalActive) {
    document.body.style.overflow = '';
  }
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    if (mobileNavDrawer && mobileNavDrawer.classList.contains('active')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });
}

if (closeMobileNavBtn) closeMobileNavBtn.addEventListener('click', closeMobileNav);
if (mobileNavBackdrop) mobileNavBackdrop.addEventListener('click', closeMobileNav);

if (mobileNavInquireBtn) {
  mobileNavInquireBtn.addEventListener('click', () => {
    closeMobileNav();
    openBookingPortal();
  });
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && mobileNavDrawer && mobileNavDrawer.classList.contains('active')) {
    closeMobileNav();
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (mobileNavDrawer && mobileNavDrawer.classList.contains('active')) {
      closeMobileNav();
      return;
    }
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
  whatsappTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    const msg = `Hi ITW Team, I am interested in booking a stay at ${propData.name}. Please connect me with a curator.`;
    window.open(`https://wa.me/917404385783?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  });
}

const customizeTrigger = document.getElementById('prop-customize-trigger');
if (customizeTrigger && propData && propData.services) {
  customizeTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    const servicesList = (propData.services && propData.services.length > 0) ? propData.services.join(', ') : 'Bespoke Curations';
    const msg = `Hi ITW Team, I am interested in customizing my stay at ${propData.name}. I would like to enquire about: ${servicesList}.`;
    window.open(`https://wa.me/917404385783?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  });
}

// 5. Interactive Booking Portal Wizard (Phase BF-1)
const bookingPortal = document.getElementById('booking-portal-overlay');
const closeBookingBtn = document.getElementById('close-booking-overlay');
const bookingWizard = document.getElementById('booking-portal-wizard');
const bookNowTrigger = document.getElementById('prop-book-now-trigger');
const floatingPillTrigger = document.getElementById('booking-pill-trigger');
const headerInquireBtn = document.getElementById('inquire-btn');

let lastFocusedElement = null;

const bookingState = {
  propertySlug: currentSlug,
  checkIn: '',
  checkOut: '',
  nights: 0,
  adults: 2,
  children: 0,
  rooms: 1,
  roomType: propData?.rooms?.[0]?.name || 'any',
  currentStep: 1
};

function openBookingPortal() {
  if (!bookingPortal || !bookingWizard || !propData) return;
  lastFocusedElement = document.activeElement;
  bookingState.propertySlug = currentSlug;
  bookingState.currentStep = 1;
  renderBookingStep();
  bookingPortal.classList.add('active');
  bookingPortal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    const firstInput = bookingWizard.querySelector('input, button');
    if (firstInput) firstInput.focus();
  }, 50);
}

function closeBookingPortal() {
  if (bookingPortal) {
    bookingPortal.classList.remove('active');
    bookingPortal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
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

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && bookingPortal && bookingPortal.classList.contains('active')) {
    closeBookingPortal();
  }
});

function renderBookingStep() {
  if (!bookingWizard || !propData) return;
  bookingWizard.innerHTML = '';
  const step = bookingState.currentStep;

  const container = document.createElement('div');
  container.className = 'booking-wizard-step active';
  container.setAttribute('role', 'region');
  container.setAttribute('aria-label', `Booking Step ${step} of 3`);

  let stepContent = '';
  const navFooter = `
    <div class="wizard-nav-footer">
      ${step > 1 ? '<button type="button" class="wizard-back-btn" id="wizard-prev-btn">Back</button>' : ''}
      ${step < 3 ? '<button type="button" class="wizard-next-btn" id="wizard-next-btn">Next Step</button>' : ''}
    </div>
  `;

  if (step === 1) {
    // Dates
    const today = new Date().toISOString().split('T')[0];
    const minCheckout = bookingState.checkIn ? getNextDayDateString(bookingState.checkIn) : today;
    const nights = calculateNights(bookingState.checkIn, bookingState.checkOut);
    bookingState.nights = nights;

    let durationHtml = '';
    if (nights > 0 && bookingState.checkIn && bookingState.checkOut) {
      durationHtml = `Stay duration: <span class="duration-highlight">${nights} night${nights > 1 ? 's' : ''}</span> (${formatDisplayDate(bookingState.checkIn)} &rarr; ${formatDisplayDate(bookingState.checkOut)})`;
    } else {
      durationHtml = 'Select check-in and check-out to calculate duration. Availability confirmed upon enquiry.';
    }

    stepContent = `
      <div class="wizard-header">
        <span class="wizard-step-indicator">Step 1 of 3 • Journey Dates</span>
        <h3 class="wizard-title">${propData.name}</h3>
        <p class="wizard-subtitle">Select your intended dates of sanctuary. Availability will be confirmed by ITW.</p>
      </div>
      <div class="wizard-dates-row">
        <div class="wizard-form-group">
          <label for="wizard-checkin" class="wizard-label">Check-in Date</label>
          <input type="date" id="wizard-checkin" class="wizard-input-date" min="${today}" value="${bookingState.checkIn}">
        </div>
        <div class="wizard-form-group">
          <label for="wizard-checkout" class="wizard-label">Check-out Date</label>
          <input type="date" id="wizard-checkout" class="wizard-input-date" min="${minCheckout}" value="${bookingState.checkOut}">
        </div>
      </div>
      <div class="wizard-duration-badge ${nights > 0 ? '' : 'empty-state'}" id="wizard-duration-badge" aria-live="polite">
        ${durationHtml}
      </div>
      <div class="wizard-inline-error" id="wizard-date-error" role="alert" aria-live="assertive"></div>
    `;
  } else if (step === 2) {
    // Travelers & Accommodation
    const roomsList = propData.rooms || [];
    stepContent = `
      <div class="wizard-header">
        <span class="wizard-step-indicator">Step 2 of 3 • Party & Dwelling</span>
        <h3 class="wizard-title">Who is journeying?</h3>
        <p class="wizard-subtitle">Intimate spaces designed for solitude, companionship, or shared reflection.</p>
      </div>

      <div class="booking-counters-grid">
        <div class="counter-control-group">
          <div class="counter-label-wrap">
            <span class="counter-label" id="label-adults">Adults</span>
            <span class="counter-sublabel">Ages 12+</span>
          </div>
          <div class="counter-buttons-wrap">
            <button type="button" class="counter-btn" data-action="dec" data-type="adults" aria-label="Decrease Adults" ${bookingState.adults <= 1 ? 'disabled' : ''}>-</button>
            <span class="counter-value" id="val-adults" aria-labelledby="label-adults">${bookingState.adults}</span>
            <button type="button" class="counter-btn" data-action="inc" data-type="adults" aria-label="Increase Adults" ${bookingState.adults >= 10 ? 'disabled' : ''}>+</button>
          </div>
        </div>

        <div class="counter-control-group">
          <div class="counter-label-wrap">
            <span class="counter-label" id="label-children">Children</span>
            <span class="counter-sublabel">Ages 0–11</span>
          </div>
          <div class="counter-buttons-wrap">
            <button type="button" class="counter-btn" data-action="dec" data-type="children" aria-label="Decrease Children" ${bookingState.children <= 0 ? 'disabled' : ''}>-</button>
            <span class="counter-value" id="val-children" aria-labelledby="label-children">${bookingState.children}</span>
            <button type="button" class="counter-btn" data-action="inc" data-type="children" aria-label="Increase Children" ${bookingState.children >= 6 ? 'disabled' : ''}>+</button>
          </div>
        </div>

        <div class="counter-control-group">
          <div class="counter-label-wrap">
            <span class="counter-label" id="label-rooms">Rooms</span>
            <span class="counter-sublabel">Dwellings</span>
          </div>
          <div class="counter-buttons-wrap">
            <button type="button" class="counter-btn" data-action="dec" data-type="rooms" aria-label="Decrease Rooms" ${bookingState.rooms <= 1 ? 'disabled' : ''}>-</button>
            <span class="counter-value" id="val-rooms" aria-labelledby="label-rooms">${bookingState.rooms}</span>
            <button type="button" class="counter-btn" data-action="inc" data-type="rooms" aria-label="Increase Rooms" ${bookingState.rooms >= 5 ? 'disabled' : ''}>+</button>
          </div>
        </div>
      </div>

      <div class="wizard-header" style="margin-top: 1rem; margin-bottom: 1rem;">
        <span class="wizard-label" style="text-align: center; display: block;">Select Preferred Dwelling</span>
      </div>

      <div class="wizard-choices-grid" role="radiogroup" aria-label="Dwelling Choices">
        <div class="wizard-choice-card ${bookingState.roomType === 'any' ? 'selected' : ''}" data-room="any" role="radio" aria-checked="${bookingState.roomType === 'any'}" tabindex="0">
          <span class="choice-label">Any Available Space</span>
          <span class="choice-meta">Best availability & flexible options</span>
        </div>
        ${roomsList.map(r => `
          <div class="wizard-choice-card ${bookingState.roomType === r.name ? 'selected' : ''}" data-room="${r.name}" role="radio" aria-checked="${bookingState.roomType === r.name}" tabindex="0">
            <span class="choice-label">${r.name}</span>
            <span class="choice-meta">${r.occupancy} • ${r.inclusions}</span>
          </div>
        `).join('')}
      </div>
    `;
  } else if (step === 3) {
    // Review Enquiry & WhatsApp Handoff
    const checkinF = formatDisplayDate(bookingState.checkIn) || 'Flexible / To Be Decided';
    const checkoutF = formatDisplayDate(bookingState.checkOut) || 'Flexible / To Be Decided';
    const nights = calculateNights(bookingState.checkIn, bookingState.checkOut);
    const nightsText = nights > 0 ? `${nights} night${nights > 1 ? 's' : ''}` : 'Flexible';

    let partyText = `${bookingState.adults} Adult${bookingState.adults > 1 ? 's' : ''}`;
    if (bookingState.children > 0) {
      partyText += `, ${bookingState.children} Child${bookingState.children > 1 ? 'ren' : ''}`;
    }
    partyText += ` • ${bookingState.rooms} Room${bookingState.rooms > 1 ? 's' : ''}`;

    const selectedRoomObj = (propData.rooms || []).find(r => r.name === bookingState.roomType);
    const roomDisplayName = bookingState.roomType === 'any' ? 'Any Available Space' : bookingState.roomType;

    stepContent = `
      <div class="wizard-header">
        <span class="wizard-step-indicator">Step 3 of 3 • Review & Transmit Enquiry</span>
        <h3 class="wizard-title">Review Your Enquiry</h3>
        <p class="wizard-subtitle">Connect directly with our experience curator on WhatsApp to confirm availability and receive a custom quotation.</p>
      </div>

      <div class="wizard-summary-card glass-card">
        <div class="summary-row">
          <span class="summary-label">Sanctuary</span>
          <span class="summary-value">${propData.name} <small>(${propData.loc})</small></span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Dwelling</span>
          <span class="summary-value">${roomDisplayName}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Journey Dates</span>
          <span class="summary-value">${checkinF} &rarr; ${checkoutF} (${nightsText})</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Party</span>
          <span class="summary-value">${partyText}</span>
        </div>
        ${selectedRoomObj && selectedRoomObj.inclusions ? `
        <div class="summary-row">
          <span class="summary-label">Inclusions</span>
          <span class="summary-value">${selectedRoomObj.inclusions}</span>
        </div>` : ''}
        <div class="summary-row">
          <span class="summary-label">Pricing</span>
          <span class="summary-value copper-text">By Enquiry (Personalized Curation)</span>
        </div>
      </div>

      <div class="wizard-disclaimer-box">
        <div class="disclaimer-title">Booking Enquiry Notice</div>
        <ul class="disclaimer-list">
          <li>This is an enquiry for availability and quotation, not a confirmed reservation.</li>
          <li>Live availability, seasonal rates, and meal plans will be confirmed by ITW.</li>
          <li>Clicking below opens WhatsApp with your prefilled enquiry. Please tap <strong>Send</strong> in WhatsApp to transmit.</li>
        </ul>
      </div>

      <div class="wizard-action-wrap">
        <button type="button" class="wizard-submit-whatsapp-btn" id="confirm-whatsapp-submit">
          <svg class="whatsapp-icon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path fill="currentColor" d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.503-5.729-1.46L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.59 2.01 14.12 1.01 11.5 1.012c-5.443 0-9.87 4.373-9.874 9.803-.001 1.737.478 3.427 1.39 4.938L2.08 21.82l6.236-1.637z"/>
            <path fill="currentColor" d="M16.945 14.73c-.27-.135-1.597-.788-1.845-.878-.248-.09-.43-.135-.61.135-.18.27-.698.878-.855 1.058-.158.18-.315.202-.585.067-.27-.135-1.14-.42-2.17-1.34-.8-.713-1.34-1.597-1.498-1.867-.158-.27-.017-.417.118-.552.12-.122.27-.315.405-.473.135-.157.18-.27.27-.45.09-.18.045-.337-.022-.472-.068-.135-.61-1.467-.835-2.012-.22-.527-.44-.455-.61-.464-.158-.007-.338-.007-.518-.007-.18 0-.472.067-.72.337-.248.27-.945.923-.945 2.25 0 1.328.967 2.61 1.102 2.79.135.18 1.902 2.905 4.608 4.075.643.278 1.144.444 1.534.569.646.205 1.234.176 1.7.106.52-.078 1.597-.652 1.822-1.25.225-.597.225-1.103.158-1.21-.068-.108-.248-.154-.518-.29z"/>
          </svg>
          Send Enquiry via WhatsApp
        </button>
        <button type="button" class="wizard-back-btn" id="wizard-edit-btn" style="width: 100%; text-align: center;">Edit Selections</button>
      </div>
    `;
  }

  container.innerHTML = stepContent + (step < 3 ? navFooter : '');
  bookingWizard.appendChild(container);

  bindStepControls(container);
}

function bindStepControls(container) {
  const step = bookingState.currentStep;

  const prevBtn = container.querySelector('#wizard-prev-btn');
  const nextBtn = container.querySelector('#wizard-next-btn');
  const editBtn = container.querySelector('#wizard-edit-btn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (bookingState.currentStep > 1) {
        bookingState.currentStep--;
        renderBookingStep();
      }
    });
  }

  if (editBtn) {
    editBtn.addEventListener('click', () => {
      bookingState.currentStep = 2;
      renderBookingStep();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (step === 1) {
        const cinInput = container.querySelector('#wizard-checkin');
        const coutInput = container.querySelector('#wizard-checkout');
        const errEl = container.querySelector('#wizard-date-error');

        const cin = cinInput ? cinInput.value : '';
        const cout = coutInput ? coutInput.value : '';

        function showErr(msg, focusEl) {
          if (errEl) {
            errEl.innerHTML = `<span aria-hidden="true">⚠</span> ${msg}`;
            errEl.classList.add('visible');
          }
          if (focusEl) focusEl.focus();
        }

        if (!cin) {
          showErr('Please select your check-in date.', cinInput);
          return;
        }
        if (!cout) {
          showErr('Please select your check-out date.', coutInput);
          return;
        }
        if (cout <= cin) {
          showErr('Check-out date must be after check-in date.', coutInput);
          return;
        }

        bookingState.checkIn = cin;
        bookingState.checkOut = cout;
        bookingState.nights = calculateNights(cin, cout);
        bookingState.currentStep = 2;
        renderBookingStep();
      } else if (step === 2) {
        bookingState.currentStep = 3;
        renderBookingStep();
      }
    });
  }

  if (step === 1) {
    const cinInput = container.querySelector('#wizard-checkin');
    const coutInput = container.querySelector('#wizard-checkout');
    const badgeEl = container.querySelector('#wizard-duration-badge');
    const errEl = container.querySelector('#wizard-date-error');

    function updateDateCalculation() {
      const cin = cinInput.value;
      const cout = coutInput.value;
      bookingState.checkIn = cin;
      bookingState.checkOut = cout;

      if (errEl) {
        errEl.classList.remove('visible');
        errEl.innerHTML = '';
      }

      if (cin) {
        const nextDay = getNextDayDateString(cin);
        coutInput.min = nextDay;
        if (cout && cout <= cin) {
          coutInput.value = '';
          bookingState.checkOut = '';
          if (errEl) {
            errEl.innerHTML = `<span aria-hidden="true">ℹ</span> Please select a check-out date after check-in.`;
            errEl.classList.add('visible');
          }
        }
      }

      const nights = calculateNights(cinInput.value, coutInput.value);
      bookingState.nights = nights;
      if (badgeEl) {
        if (nights > 0 && cinInput.value && coutInput.value) {
          badgeEl.classList.remove('empty-state');
          badgeEl.innerHTML = `Stay duration: <span class="duration-highlight">${nights} night${nights > 1 ? 's' : ''}</span> (${formatDisplayDate(cinInput.value)} &rarr; ${formatDisplayDate(coutInput.value)})`;
        } else {
          badgeEl.classList.add('empty-state');
          badgeEl.innerHTML = 'Select check-in and check-out to calculate duration. Availability confirmed upon enquiry.';
        }
      }
    }

    if (cinInput) cinInput.addEventListener('change', updateDateCalculation);
    if (coutInput) coutInput.addEventListener('change', updateDateCalculation);
  }

  if (step === 2) {
    container.querySelectorAll('.counter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        const type = btn.getAttribute('data-type');

        if (type === 'adults') {
          if (action === 'inc' && bookingState.adults < 10) bookingState.adults++;
          if (action === 'dec' && bookingState.adults > 1) bookingState.adults--;
        } else if (type === 'children') {
          if (action === 'inc' && bookingState.children < 6) bookingState.children++;
          if (action === 'dec' && bookingState.children > 0) bookingState.children--;
        } else if (type === 'rooms') {
          if (action === 'inc' && bookingState.rooms < 5) bookingState.rooms++;
          if (action === 'dec' && bookingState.rooms > 1) bookingState.rooms--;
        }
        renderBookingStep();
      });
    });

    const cards = container.querySelectorAll('.wizard-choice-card');
    cards.forEach(card => {
      const selectRoom = () => {
        const room = card.getAttribute('data-room');
        bookingState.roomType = room;
        cards.forEach(c => {
          c.classList.remove('selected');
          c.setAttribute('aria-checked', 'false');
        });
        card.classList.add('selected');
        card.setAttribute('aria-checked', 'true');
      };

      card.addEventListener('click', selectRoom);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectRoom();
        }
      });
    });
  }

  const finalBtn = container.querySelector('#confirm-whatsapp-submit');
  if (finalBtn) {
    finalBtn.addEventListener('click', () => {
      const whatsappUrl = buildEnquiryWhatsAppUrl({
        propertyName: propData.name,
        propertyLoc: propData.loc,
        roomType: bookingState.roomType,
        checkIn: bookingState.checkIn,
        checkOut: bookingState.checkOut,
        nights: bookingState.nights,
        adults: bookingState.adults,
        children: bookingState.children,
        rooms: bookingState.rooms
      });

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
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
