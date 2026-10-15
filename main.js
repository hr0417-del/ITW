import { audioEngine } from './audio.js';
import {
  propertiesDb,
  propertySlugs,
  getProperty,
  calculateNights,
  formatDisplayDate,
  getNextDayDateString,
  buildEnquiryWhatsAppMessage,
  buildEnquiryWhatsAppUrl
} from './properties-data.js';

// ==========================================================================
// DATA: DESTINATION DICTIONARY FOR THE MAP FLY-ZOOMS
// ==========================================================================
const destinationData = {
  jibhi: {
    title: "Jibhi",
    tagline: "Where forests whisper.",
    wind: 0.15, river: 0.4, rain: 0.25,
    items: [
      { cat: "dwell", title: "Tree House Canopy", desc: "Suspended above the valley, listen to the river beneath and pine needles rustling in the wind.", img: "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=800&q=80" },
      { cat: "sanctuary", title: "Stone & Wood Cottage", desc: "Handcrafted stone cottage tucked into a cedar glade. Warm hearths and local slate roofs.", img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80" },
      { cat: "wander", title: "Waterfall Trail", desc: "Follow the hidden mossy path down to the crystal cascade. Let the cold glacial spray awaken you.", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80" },
      { cat: "belong", title: "Village Walk", desc: "Meander through old wooden hamlets, sharing conversations and freshly brewed herbal tea.", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80" },
      { cat: "gather", title: "Local Cedar Café", desc: "Earthy scents of woodfire coffee, local red rice sourdough, and fireside mountain tunes.", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80" }
    ]
  },
  jispa: {
    title: "Jispa",
    tagline: "Wake up where the Himalayas begin.",
    wind: 0.35, river: 0.5, rain: 0.0,
    items: [
      { cat: "dwell", title: "Glacial River Cabin", desc: "Overlooking the sweeping gravel bed of the Bhaga River, crafted in minimal steel and glass.", img: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80" },
      { cat: "sanctuary", title: "Mountain Base camp", desc: "Stone huts aligned with high pass paths, offering steam baths and fireside stargazing decks.", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" },
      { cat: "wander", title: "Glacier Moraine Walk", desc: "Trek over raw, wind-swept slate trails and alpine lakes, guided by native high-altitude mountaineers.", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80" },
      { cat: "belong", title: "Sea Buckthorn Forage", desc: "Gather deep-orange mountain berries with local farmers under an intense cobalt sky.", img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80" },
      { cat: "gather", title: "Nomad Hearth", desc: "Fireside stories of shepherd routes while enjoying local salted butter tea and roasted barley.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" }
    ]
  },
  keylong: {
    title: "Keylong",
    tagline: "Monastery ridge stillness.",
    wind: 0.3, river: 0.1, rain: 0.0,
    items: [
      { cat: "dwell", title: "Monastery Chalet", desc: "Draped on the cliffside facing the Kardang monastery. Awaken to Buddhist wind-chimes and deep trumpets.", img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80" },
      { cat: "sanctuary", title: "Slate Peak Outpost", desc: "A cozy stone outpost with sweeping mountain views and local wool blankets.", img: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80" },
      { cat: "wander", title: "Kardang Ridge Trail", desc: "Climb through juniper fields up to the ancient monastery, overlooking the white-tipped peak.", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" },
      { cat: "belong", title: "Clay Crafting", desc: "Learn to knead and form clay pots with village elders in their mud-plastered workshops.", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80" },
      { cat: "gather", title: "Prayer Circle Cafe", desc: "Enjoy organic millet cakes and green mountain tea alongside village storytellers.", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80" }
    ]
  },
  turtuk: {
    title: "Turtuk",
    tagline: "The threshold of Karakoram.",
    wind: 0.4, river: 0.2, rain: 0.0,
    items: [
      { cat: "dwell", title: "Balti Stone Cabin", desc: "Built with dry-stacked grey granite, looking out on apricot orchards and the Shyok River gorge.", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" },
      { cat: "sanctuary", title: "Valley Oasis Suite", desc: "Surrounded by vertical mountain cliffs. Feel the quietness of the last village before the border.", img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80" },
      { cat: "wander", title: "Apricot Orchard Walk", desc: "Stroll beneath blooming fruit trees, gathering fresh walnuts alongside the river canals.", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80" },
      { cat: "belong", title: "Balti Kitchen Art", desc: "Grind walnut-chutney on flat stones and bake sourdough balti breads in clay pit ovens.", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80" },
      { cat: "gather", title: "Karakoram Hearth", desc: "Listen to histories of old Silk Road travels, shared around warm charcoal burners.", img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80" }
    ]
  },
  chakrata: {
    title: "Chakrata",
    tagline: "Reclaim your relationship with stillness.",
    wind: 0.2, river: 0.1, rain: 0.3,
    items: [
      { cat: "dwell", title: "Pine Sanctuary Villa", desc: "Tucked inside deep, ancient oak groves. Rest to the smell of cedar woodsmoke and mountain mist.", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80" },
      { cat: "sanctuary", title: "High Forest Cabin", desc: "A cozy red-sandstone chalet with massive stone fireplaces, and copper bathtubs.", img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80" },
      { cat: "wander", title: "Budher Cave Trek", desc: "Descend into limestone caves and meadows carpeted in yellow alpine wildflowers.", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80" },
      { cat: "belong", title: "Forest Foraging", desc: "Discover wild mushrooms and ferns with forest rangers under towering deodar tree canopies.", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80" },
      { cat: "gather", title: "Tiger Hill Campfire", desc: "Acoustic mountain songs and warm local honey-lemon elixirs beneath high oak boughs.", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80" }
    ]
  },
  dehradun: {
    title: "Dehradun",
    tagline: "Comfort in the shade of Sal forests.",
    wind: 0.1, river: 0.2, rain: 0.2,
    items: [
      { cat: "dwell", title: "Sal Forest Retreat", desc: "Spread across organic tea gardens and green hills. Open brick patios catching warm foothill breezes.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" },
      { cat: "sanctuary", title: "Orchard Cottage", desc: "Surrounded by mango and litchi orchards, featuring dynamic water fountains and a pool.", img: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80" },
      { cat: "wander", title: "Tea Orchard Trail", desc: "Walk through green garden ridges, learning traditional tea leaf hand-rolling techniques.", img: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80" },
      { cat: "belong", title: "Clay Tile Baking", desc: "Press and bake clay roof-tiles with local kiln workers in traditional wood-ovens.", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80" },
      { cat: "gather", title: "Foothills Lantern Diner", desc: "A quiet, candlelit table under giant mango trees, sampling organic dishes made from farm produce.", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80" }
    ]
  }
};

// ==========================================================================
// SCENE 1: LOADER INITIATION & AUDIO INITIALIZATION
// ==========================================================================
const loader = document.getElementById('scene-loader');
const loaderLogoBox = document.getElementById('loader-logo-box');
const enterBtn = document.getElementById('enter-btn');
const audioToggleBtn = document.getElementById('audio-toggle-btn');
const iconMute = audioToggleBtn.querySelector('.icon-mute');
const iconSound = audioToggleBtn.querySelector('.icon-sound');

function runLoaderSequence() {
  if (loaderLogoBox) {
    loaderLogoBox.classList.remove('hidden');
    setTimeout(() => {
      loaderLogoBox.classList.add('visible');
    }, 50);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runLoaderSequence);
} else {
  runLoaderSequence();
}

enterBtn.addEventListener('click', () => {
  // Init audio context
  audioEngine.init();
  // Start with quiet room ambiance
  audioEngine.setWind(0.15, 3.0);
  audioEngine.setRiver(0.05, 3.0);
  
  // Show header mute state correctly
  iconMute.classList.add('hidden');
  iconSound.classList.remove('hidden');

  // iOS/Safari unlocking for scroll scrubbing
  const walkVideo = document.getElementById('walk-video-element');
  if (walkVideo) {
    walkVideo.play().then(() => {
      walkVideo.pause();
    }).catch(err => {
      console.log("iOS Video unlocking bypassed:", err);
    });
  }

  // Fade out loader
  loader.style.opacity = '0';
  setTimeout(() => {
    loader.classList.add('hidden');
    // Set initial scroll states
    handleHeroScroll();
    handleSectionPortals();
    handleWalkRevealParallax();

    // Reveal hero elements
    document.querySelectorAll('#scene-hero-track .animate-on-scroll').forEach(el => {
      el.classList.add('appear');
    });

    // Native IntersectionObserver to guarantee Walk Reveal text fades in reliably
    const walkRevealSec = document.getElementById('scene-walk-reveal');
    if (walkRevealSec) {
      const walkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            walkRevealSec.classList.add('active');
          } else {
            walkRevealSec.classList.remove('active');
          }
        });
      }, { threshold: 0.1 });
      walkObserver.observe(walkRevealSec);
    }
  }, 1200);
});


// ==========================================================================
// SCENE 2 SCROLL INTERACTIVITY: CAMERA ZOOM THROUGH PORTAL & NATURE ENTRY
// ==========================================================================
const sceneHeroTrack = document.getElementById('scene-hero-track');
const introVideoWrap = document.getElementById('intro-video-wrap');
const walkVideoWrap = document.getElementById('walk-video-wrap');
const introVideo = document.getElementById('intro-video-element');
const walkVideo = document.getElementById('walk-video-element');
const heroTextOverlay = document.getElementById('hero-text-overlay');
const heroScrollIndicator = document.getElementById('hero-scroll-indicator');

function handleHeroScroll() {
  if (!sceneHeroTrack) return;
  const scrollY = window.scrollY;
  const trackHeight = sceneHeroTrack.offsetHeight;
  const scrollMax = trackHeight - window.innerHeight;
  
  if (scrollMax <= 0) return;
  
  const progress = Math.max(0, Math.min(1, scrollY / scrollMax));
  
  requestAnimationFrame(() => {
    // Swap the looping room video and the scrubbing portal-walk video instantly to avoid double-exposure overlap
    if (progress > 0.01) {
      introVideoWrap.style.opacity = 0;
      introVideoWrap.style.visibility = 'hidden';
      walkVideoWrap.style.opacity = 1;
      walkVideoWrap.style.visibility = 'visible';
      
      // Scrub the walk video based on scroll progress
      if (walkVideo && walkVideo.duration) {
        walkVideo.currentTime = progress * walkVideo.duration;
      }
    } else {
      introVideoWrap.style.opacity = 1;
      introVideoWrap.style.visibility = 'visible';
      walkVideoWrap.style.opacity = 0;
      walkVideoWrap.style.visibility = 'hidden';
      if (walkVideo) {
        walkVideo.currentTime = 0;
      }
    }
    
    // Fade and translate text overlay out
    const textOpacity = Math.max(0, 1 - progress * 3.5);
    heroTextOverlay.style.opacity = textOpacity;
    heroTextOverlay.style.transform = `translateY(-${progress * 40}px)`;
    
    if (textOpacity <= 0.05) {
      heroTextOverlay.style.pointerEvents = 'none';
    } else {
      heroTextOverlay.style.pointerEvents = 'auto';
    }
    
    // Fade scroll indicator immediately
    const indicatorOpacity = Math.max(0, 1 - progress * 8.0);
    heroScrollIndicator.style.opacity = indicatorOpacity;

    // Cross-fade ambiance
    if (audioEngine.ctx && !audioEngine.isMuted && scrollY < trackHeight) {
      const currentWind = 0.15 + progress * 0.2; // swells from 0.15 to 0.35
      const currentRiver = 0.05 + progress * 0.1; // swells from 0.05 to 0.15
      audioEngine.setWind(currentWind, 0.1);
      audioEngine.setRiver(currentRiver, 0.1);
    }
  });
}

// ==========================================================================
// SUBSEQUENT SCENES: SCROLL-TRIGGERED PORTAL DOORWAY TRANSITIONS
// ==========================================================================
const transitionSections = document.querySelectorAll('.scene, .scene-scroll-container');

function handleSectionPortals() {
  const viewHeight = window.innerHeight;
  
  transitionSections.forEach(section => {
    // Skip the hero track which is handled separately
    if (section.id === 'scene-hero-track' || section.classList.contains('scene-hero-track')) return;
    
    const rect = section.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > viewHeight) {
      section.classList.remove('active');
      return;
    }
    
    section.classList.add('active');
    
    const portalFrame = section.querySelector('.section-portal-svg');
    if (!portalFrame) return;
    
    const sectionHeight = rect.height || viewHeight;
    const totalRange = viewHeight + sectionHeight;
    const currentPos = viewHeight - rect.top;
    const progress = Math.max(0, Math.min(1, currentPos / totalRange));
    
    // Portal zooms past viewport (scale 0.85 -> 7.0)
    const scale = 0.85 + Math.pow(progress, 3) * 6.15;
    
    // Fade curve: Peaks around progress = 0.3 to 0.6
    let opacity = 0;
    if (progress < 0.35) {
      opacity = (progress / 0.35) * 0.65;
    } else if (progress < 0.7) {
      opacity = 0.65 - ((progress - 0.35) / 0.35) * 0.65;
    }
    
    requestAnimationFrame(() => {
      portalFrame.style.transform = `scale(${scale})`;
      portalFrame.style.opacity = opacity;
    });
  });
}

function handleWalkRevealParallax() {
  const walkRevealSection = document.getElementById('scene-walk-reveal');
  if (!walkRevealSection) return;
  
  const rect = walkRevealSection.getBoundingClientRect();
  const viewHeight = window.innerHeight;
  
  if (rect.top < viewHeight && rect.bottom > 0) {
    const videoContainer = walkRevealSection.querySelector('.walk-bg-video-container');
    if (videoContainer) {
      const scrolled = viewHeight - rect.top;
      const total = viewHeight + rect.height;
      const progress = Math.max(0, Math.min(1, scrolled / total));
      
      // Slow parallax offset from -60px to 60px
      const offset = (progress - 0.5) * 120;
      videoContainer.style.transform = `translateY(${offset}px)`;
    }
  }
}

window.addEventListener('scroll', () => {
  handleHeroScroll();
  handleSectionPortals();
  handleWalkRevealParallax();
});

window.addEventListener('resize', () => {
  handleHeroScroll();
  handleSectionPortals();
  handleWalkRevealParallax();
});

// Audio Toggle Button
audioToggleBtn.addEventListener('click', () => {
  if (audioEngine.isMuted) {
    audioEngine.unmute();
    iconMute.classList.add('hidden');
    iconSound.classList.remove('hidden');
  } else {
    audioEngine.mute();
    iconMute.classList.remove('hidden');
    iconSound.classList.add('hidden');
  }
});

// DATA: PROPERTY DATABASE (Imported from ./properties-data.js as single source of truth)

// SCENE 4: BIND EXPLORE DESTINATION BUTTONS TO WIZARD FLOW
// ==========================================================================
document.querySelectorAll('.explore-dest-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const dest = btn.getAttribute('data-dest');
    openBookingPortal();
    bookingState.dest = dest;
    bookingState.currentStep = 2; // Jump directly to Property Selection (Step 2)
    renderBookingStep();
  });
});

// ==========================================================================
// MOBILE NAVIGATION DRAWER CONTROLLER
// ==========================================================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
const closeMobileNavBtn = document.getElementById('close-mobile-nav-btn');
const mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
const mobileNavInquireBtn = document.getElementById('mobile-nav-inquire-btn');

function openMobileNav() {
  if (!mobileNavDrawer) return;
  mobileNavDrawer.classList.add('active');
  mobileNavDrawer.setAttribute('aria-hidden', 'false');
  if (mobileMenuBtn) {
    mobileMenuBtn.classList.add('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
  }
  document.body.style.overflow = "hidden";
}

function closeMobileNav() {
  if (!mobileNavDrawer) return;
  mobileNavDrawer.classList.remove('active');
  mobileNavDrawer.setAttribute('aria-hidden', 'true');
  if (mobileMenuBtn) {
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  }
  // Restore body overflow only if other modals aren't active
  const isAnyModalActive = document.querySelector('.property-detail-overlay.active, .booking-portal-overlay.active, .lightbox-overlay.active, .inquiry-drawer-overlay.active');
  if (!isAnyModalActive) {
    document.body.style.overflow = "";
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

if (closeMobileNavBtn) {
  closeMobileNavBtn.addEventListener('click', closeMobileNav);
}

if (mobileNavBackdrop) {
  mobileNavBackdrop.addEventListener('click', closeMobileNav);
}

// Section navigation from mobile drawer with smooth scrolling
mobileNavItems.forEach(item => {
  item.addEventListener('click', (e) => {
    const targetId = item.getAttribute('data-target');
    if (targetId) {
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        closeMobileNav();
        setTimeout(() => {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }, 320);
      }
    } else {
      closeMobileNav();
    }
  });
});

if (mobileNavInquireBtn) {
  mobileNavInquireBtn.addEventListener('click', () => {
    closeMobileNav();
    openBookingPortal();
  });
}

// Automatically close mobile menu if viewport expands beyond 768px
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && mobileNavDrawer && mobileNavDrawer.classList.contains('active')) {
    closeMobileNav();
  }
});

// Escape key listener for all modals and overlays
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (mobileNavDrawer && mobileNavDrawer.classList.contains('active')) {
      closeMobileNav();
      return;
    }
    if (galleryLightbox && galleryLightbox.classList.contains('active')) {
      closeLightbox();
      return;
    }
    if (bookingPortal && bookingPortal.classList.contains('active')) {
      closeBookingPortal();
      return;
    }
    if (propertyOverlay && propertyOverlay.classList.contains('active')) {
      closePropertyOverlay();
      return;
    }
  }
});

// ==========================================================================
// SPA PROPERTY DETAILS OVERLAY CONTROL (DYNAMICS & DETAILS DRAWER)
// ==========================================================================

// Gallery Lightbox Controller
const galleryLightbox = document.getElementById('gallery-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightboxBtn = document.getElementById('close-lightbox');

function openLightbox(src) {
  if (!galleryLightbox || !lightboxImg) return;
  lightboxImg.src = src;
  galleryLightbox.classList.remove('hidden');
  // force reflow
  galleryLightbox.offsetWidth;
  galleryLightbox.classList.add('active');
}

function closeLightbox() {
  if (!galleryLightbox) return;
  galleryLightbox.classList.remove('active');
  setTimeout(() => {
    if (!galleryLightbox.classList.contains('active')) {
      galleryLightbox.classList.add('hidden');
    }
  }, 500);
}

if (closeLightboxBtn) {
  closeLightboxBtn.addEventListener('click', closeLightbox);
}
if (galleryLightbox) {
  galleryLightbox.addEventListener('click', (e) => {
    if (e.target === galleryLightbox) {
      closeLightbox();
    }
  });
}

const propertyOverlay = document.getElementById('property-detail-overlay');
const closePropertyBtn = document.getElementById('close-property-overlay');
const propertyScrollContent = document.getElementById('property-detail-scroll-content');

function openPropertyOverlay(slug) {
  const data = propertiesDb[slug];
  if (!data || data.price === "Coming Soon") return;
  
  // Update URL hash
  window.history.pushState(null, null, `#property-${slug}`);
  
  // Build dynamic content
  let galleryHtml = "";
  if (data.gallery && data.gallery.length > 0) {
    galleryHtml = `
      <section class="prop-gallery-section">
        <h4 class="prop-gallery-title">Sanctuary Gallery</h4>
        <div class="prop-gallery-grid">
          ${data.gallery.map(img => `
            <div class="prop-gallery-item">
              <img class="prop-gallery-img" src="${img}" alt="ITW gallery frame" loading="lazy">
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }
  
  let roomsHtml = "";
  if (data.rooms && data.rooms.length > 0) {
    roomsHtml = `
      <section class="prop-rooms-section">
        <h4 class="prop-rooms-title">Suites & Rooms</h4>
        <div class="prop-rooms-grid">
          ${data.rooms.map(room => `
            <div class="prop-room-card">
              <div class="room-img-box">
                <img class="room-img" src="${room.img}" alt="${room.name}" loading="lazy">
              </div>
              <div class="room-details-box">
                <h5 class="room-name">${room.name}</h5>
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
      </section>
    `;
  }
  
  const amenitiesHtml = `
    <section class="prop-amenities-section">
      <h4 class="prop-amenities-title">Amenities</h4>
      <div class="prop-amenities-grid">
        ${data.amenities.map(ame => `
          <div class="amenity-item">
            <span class="amenity-dot"></span>
            <span>${ame}</span>
          </div>
        `).join('')}
      </div>
    </section>
  `;

  const experiencesHtml = `
    <section class="prop-experiences-section">
      <h4 class="prop-experiences-title">Curated Experiences</h4>
      <div class="prop-experiences-grid">
        ${data.experiences.map(exp => `
          <div class="experience-detail-item">
            <span class="exp-bullet"></span>
            <span>${exp}</span>
          </div>
        `).join('')}
      </div>
    </section>
  `;

  let customizeHtml = "";
  if (data.services && data.services.length > 0) {
    customizeHtml = `
      <section class="prop-customize-section">
        <h4 class="prop-customize-title">Customize Your Stay</h4>
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
          <button class="prop-direct-book-btn" id="prop-customize-trigger">Enquire Now</button>
        </div>
      </section>
    `;
  }

  let reviewsHtml = "";
  if (data.reviews && data.reviews.length > 0) {
    reviewsHtml = `
      <section class="prop-reviews-section">
        <h4 class="prop-reviews-title">Guest Testimonials</h4>
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
      </section>
    `;
  }

  const nearbyHtml = `
    <section class="prop-nearby-section">
      <h4 class="prop-nearby-title">Nearby Attractions</h4>
      <div class="prop-nearby-grid">
        ${data.nearby.map(place => `
          <div class="nearby-item">
            <svg class="nearby-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>${place}</span>
          </div>
        `).join('')}
      </div>
    </section>
  `;

  const mapHtml = `
    <section class="prop-map-section">
      <h4 class="prop-map-title">Sanctuary Location</h4>
      <div class="prop-map-container glass-card">
        <div class="map-coordinates-box">
          <span class="coord-label">Coordinates & Location</span>
          <span class="coord-val">${data.locationDesc}</span>
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
  `;

  const detailsMarkup = `
    <div class="prop-hero" style="background-image: url('${data.img}');">
      <div class="prop-hero-tint"></div>
      <div class="prop-hero-header">
        <span class="prop-badge-cat">${data.cat}</span>
        <h1 class="prop-hero-title">${data.name}</h1>
        <p class="prop-hero-loc">${data.dest} • ${data.loc}<span class="details-weather-val" id="details-weather-val"></span></p>
      </div>
    </div>
    
    <div class="prop-intro-section">
      <p class="prop-tagline-quote">"${data.quote}"</p>
      <p class="prop-description-body">${data.about}</p>
    </div>
    
    ${galleryHtml}
    ${roomsHtml}
    ${amenitiesHtml}
    ${experiencesHtml}
    ${customizeHtml}
    ${nearbyHtml}
    ${mapHtml}
    ${reviewsHtml}
    
    <div class="prop-booking-cta-bar">
      <h4 class="prop-cta-heading">Ready to step in?</h4>
      <p class="prop-cta-sub">Submit an inquiry or contact our experience coordinators directly.</p>
      <div class="prop-cta-btns-row">
        <button class="prop-direct-book-btn" id="prop-book-now-trigger" data-slug="${slug}">Book Your Stay</button>
        <button class="prop-whatsapp-btn" id="prop-whatsapp-trigger" data-slug="${slug}">
          <svg class="whatsapp-icon" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.503-5.729-1.46L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.59 2.01 14.12 1.01 11.5 1.012c-5.443 0-9.87 4.373-9.874 9.803-.001 1.737.478 3.427 1.39 4.938L2.08 21.82l6.236-1.637z" />
            <path d="M16.945 14.73c-.27-.135-1.597-.788-1.845-.878-.248-.09-.43-.135-.61.135-.18.27-.698.878-.855 1.058-.158.18-.315.202-.585.067-.27-.135-1.14-.42-2.17-1.34-.8-.713-1.34-1.597-1.498-1.867-.158-.27-.017-.417.118-.552.12-.122.27-.315.405-.473.135-.157.18-.27.27-.45.09-.18.045-.337-.022-.472-.068-.135-.61-1.467-.835-2.012-.22-.527-.44-.455-.61-.464-.158-.007-.338-.007-.518-.007-.18 0-.472.067-.72.337-.248.27-.945.923-.945 2.25 0 1.328.967 2.61 1.102 2.79.135.18 1.902 2.905 4.608 4.075.643.278 1.144.444 1.534.569.646.205 1.234.176 1.7.106.52-.078 1.597-.652 1.822-1.25.225-.597.225-1.103.158-1.21-.068-.108-.248-.154-.518-.29z"/>
          </svg>
          Chat on WhatsApp
        </button>
        <a href="./properties/${slug}/" class="prop-direct-page-btn" title="Open dedicated sanctuary page">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
          </svg>
          Dedicated Page
        </a>
      </div>
    </div>
  `;
  
  propertyScrollContent.innerHTML = detailsMarkup;
  
  // Bind gallery image lightbox clicks
  propertyScrollContent.querySelectorAll('.prop-gallery-img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      openLightbox(img.src);
    });
  });

  propertyOverlay.classList.add('active');
  document.body.style.overflow = "hidden"; // Lock background scroll
  
  // Bind drawer triggers
  document.getElementById('prop-book-now-trigger').addEventListener('click', () => {
    closePropertyOverlay();
    openBookingPortal(slug);
  });
  
  document.getElementById('prop-whatsapp-trigger').addEventListener('click', () => {
    const msg = `Hi ITW Team, I am interested in booking a stay at ${data.name}. Please connect me with a curator.`;
    window.open(`https://wa.me/917404385783?text=${encodeURIComponent(msg)}`, '_blank');
  });

  const customizeTrigger = document.getElementById('prop-customize-trigger');
  if (customizeTrigger) {
    customizeTrigger.addEventListener('click', () => {
      const msg = `Hi ITW Team, I am interested in customizing my stay at ${data.name}. I would like to enquire about: ${data.services.join(', ')}.`;
      window.open(`https://wa.me/917404385783?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }

  if (data.lat && data.lon) {
    getWeatherForProperty(slug, data.lat, data.lon).then(weather => {
      const weatherValEl = document.getElementById('details-weather-val');
      if (weatherValEl) {
        weatherValEl.innerHTML = ` &bull; <span class="weather-status-dot ${weather.category}"></span><span style="color: var(--color-stone);">${weather.temp}&deg;C</span> <span style="opacity: 0.6; font-size: 0.9rem; font-family: var(--font-sans); letter-spacing: 0.05em; text-transform: uppercase; margin-left: 0.25rem;">${weather.desc}</span>`;
      }
      // Start full-page weather canvas
      const canvas = document.getElementById('prop-weather-canvas');
      if (canvas) {
        if (activeWeatherEngine) { activeWeatherEngine.stop(); }
        activeWeatherEngine = new WeatherThemeEngine(canvas);
        activeWeatherEngine.start(weather.category || 'clear');
        canvas.classList.add('active');
      }
    });
  }
}

function closePropertyOverlay() {
  propertyOverlay.classList.remove('active');
  document.body.style.overflow = ""; // Restore scroll
  
  // Stop weather engine
  const canvas = document.getElementById('prop-weather-canvas');
  if (canvas) { canvas.classList.remove('active'); }
  if (activeWeatherEngine) {
    activeWeatherEngine.stop();
    activeWeatherEngine = null;
  }
  
  // Clear hash cleanly
  if (window.location.hash) {
    window.history.pushState(null, null, window.location.pathname + window.location.search);
  }
}

closePropertyBtn.addEventListener('click', closePropertyOverlay);

// Close on clicking backdrop
propertyOverlay.addEventListener('click', (e) => {
  if (e.target === propertyOverlay) {
    closePropertyOverlay();
  }
});

// Bind Featured Property Cards (Left-click opens instant drawer; Cmd/Ctrl/Shift/Middle click allows standard new-tab navigation)
document.querySelectorAll('.property-card').forEach(card => {
  card.addEventListener('click', (e) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
      e.preventDefault();
      const slug = card.getAttribute('data-slug');
      openPropertyOverlay(slug);
    }
  });
});

// Handle hash routing on page load & hashchange
window.addEventListener('hashchange', checkHashRouting);
window.addEventListener('load', checkHashRouting);

function checkHashRouting() {
  const hash = window.location.hash;
  if (hash.startsWith('#property-')) {
    const slug = hash.replace('#property-', '');
    openPropertyOverlay(slug);
  }
}


// ==========================================================================
// INTERACTIVE MULTI-STEP BOOKING PORTAL STATE MACHINE (Phase BF-1)
// ==========================================================================
const bookingPortal = document.getElementById('booking-portal-overlay');
const closeBookingBtn = document.getElementById('close-booking-overlay');
const bookingWizard = document.getElementById('booking-portal-wizard');

let lastFocusedElement = null;

const bookingState = {
  dest: "",
  propertySlug: "",
  checkIn: "",
  checkOut: "",
  nights: 0,
  adults: 2,
  children: 0,
  rooms: 1,
  roomType: "any",
  currentStep: 1,
  presetSlug: ""
};

function openBookingPortal(presetPropertySlug = "") {
  lastFocusedElement = document.activeElement;
  bookingState.dest = "";
  bookingState.propertySlug = presetPropertySlug;
  bookingState.presetSlug = presetPropertySlug;
  bookingState.checkIn = "";
  bookingState.checkOut = "";
  bookingState.nights = 0;
  bookingState.adults = 2;
  bookingState.children = 0;
  bookingState.rooms = 1;
  bookingState.roomType = "any";
  bookingState.currentStep = 1;

  if (presetPropertySlug && propertiesDb[presetPropertySlug]) {
    bookingState.dest = propertiesDb[presetPropertySlug].dest;
    bookingState.roomType = propertiesDb[presetPropertySlug].rooms?.[0]?.name || "any";
    bookingState.currentStep = 3; // Start directly at Dates when property is preset
  }

  renderBookingStep();
  bookingPortal.classList.add('active');
  bookingPortal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    const firstInput = bookingWizard.querySelector('input, button, .choice-item');
    if (firstInput) firstInput.focus();
  }, 50);
}

function closeBookingPortal() {
  if (bookingPortal) {
    bookingPortal.classList.remove('active');
    bookingPortal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = "";
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }
}

if (closeBookingBtn) closeBookingBtn.addEventListener('click', closeBookingPortal);

if (bookingPortal) {
  bookingPortal.addEventListener('click', (e) => {
    if (e.target === bookingPortal) closeBookingPortal();
  });
}

// Floating button trigger
const bookingPill = document.getElementById('booking-pill-trigger');
if (bookingPill) {
  bookingPill.addEventListener('click', () => {
    openBookingPortal();
  });
}

function renderBookingStep() {
  if (!bookingWizard) return;
  bookingWizard.innerHTML = "";
  const step = bookingState.currentStep;

  const stepContainer = document.createElement('div');
  stepContainer.className = 'booking-wizard-step active';
  stepContainer.setAttribute('role', 'region');
  stepContainer.setAttribute('aria-label', `Booking Step ${step} of 5`);

  let stepContent = "";
  let navButtonsHtml = `
    <div class="wizard-nav-footer">
      ${step > 1 ? '<button type="button" class="wizard-back-btn" id="wizard-prev-btn">Back</button>' : ''}
      ${step < 5 ? '<button type="button" class="wizard-next-btn" id="wizard-next-btn">Next Step</button>' : ''}
    </div>
  `;

  if (step === 1) {
    // Choose Destination
    stepContent = `
      <span class="wizard-step-indicator">Step 1 of 5 • Destination</span>
      <h3 class="step-question" style="margin-bottom: 2rem;">Where does your journey lead?</h3>
      <div class="booking-choice-list" role="radiogroup" aria-label="Himalayan Regions">
        <div class="choice-item ${bookingState.dest === 'Himachal Pradesh' ? 'selected' : ''}" data-val="Himachal Pradesh" role="radio" aria-checked="${bookingState.dest === 'Himachal Pradesh'}" tabindex="0">
          <span class="choice-label">Himachal Pradesh</span>
          <span class="choice-meta">4 sanctuaries</span>
        </div>
        <div class="choice-item ${bookingState.dest === 'Uttarakhand' ? 'selected' : ''}" data-val="Uttarakhand" role="radio" aria-checked="${bookingState.dest === 'Uttarakhand'}" tabindex="0">
          <span class="choice-label">Uttarakhand</span>
          <span class="choice-meta">3 sanctuaries</span>
        </div>
        <div class="choice-item ${bookingState.dest === 'Ladakh' ? 'selected' : ''}" data-val="Ladakh" role="radio" aria-checked="${bookingState.dest === 'Ladakh'}" tabindex="0">
          <span class="choice-label">Ladakh</span>
          <span class="choice-meta">1 sanctuary</span>
        </div>
      </div>
    `;
    navButtonsHtml = ""; // Auto-advances on selection
  } else if (step === 2) {
    // Choose Property
    const destinationProperties = Object.keys(propertiesDb).filter(slug => {
      return propertiesDb[slug].dest === bookingState.dest;
    });

    stepContent = `
      <span class="wizard-step-indicator">Step 2 of 5 • Sanctuary</span>
      <h3 class="step-question" style="margin-bottom: 2rem;">Select your mountain dwell</h3>
      <div class="booking-choice-list" role="radiogroup" aria-label="Sanctuaries in ${bookingState.dest}">
        ${destinationProperties.map(slug => `
          <div class="choice-item ${bookingState.propertySlug === slug ? 'selected' : ''}" data-val="${slug}" role="radio" aria-checked="${bookingState.propertySlug === slug}" tabindex="0">
            <span class="choice-label">${propertiesDb[slug].name}</span>
            <span class="choice-meta">${propertiesDb[slug].loc}</span>
          </div>
        `).join('')}
      </div>
    `;
    navButtonsHtml = `
      <div class="wizard-nav-footer">
        <button type="button" class="wizard-back-btn" id="wizard-prev-btn">Back</button>
      </div>
    `;
  } else if (step === 3) {
    // Dates (Combined Check-in & Check-out)
    const propData = propertiesDb[bookingState.propertySlug] || null;
    const propTitle = propData ? propData.name : "Sanctuary";
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
        <span class="wizard-step-indicator">Step 3 of 5 • Journey Dates</span>
        <h3 class="wizard-title">${propTitle}</h3>
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
  } else if (step === 4) {
    // Travelers & Accommodation
    const propData = propertiesDb[bookingState.propertySlug];
    const roomsList = propData ? propData.rooms || [] : [];

    stepContent = `
      <div class="wizard-header">
        <span class="wizard-step-indicator">Step 4 of 5 • Party & Dwelling</span>
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
  } else if (step === 5) {
    // Review Enquiry & WhatsApp Handoff
    const propData = propertiesDb[bookingState.propertySlug];
    const checkinF = formatDisplayDate(bookingState.checkIn) || 'Flexible / To Be Decided';
    const checkoutF = formatDisplayDate(bookingState.checkOut) || 'Flexible / To Be Decided';
    const nights = calculateNights(bookingState.checkIn, bookingState.checkOut);
    const nightsText = nights > 0 ? `${nights} night${nights > 1 ? 's' : ''}` : 'Flexible';

    let partyText = `${bookingState.adults} Adult${bookingState.adults > 1 ? 's' : ''}`;
    if (bookingState.children > 0) {
      partyText += `, ${bookingState.children} Child${bookingState.children > 1 ? 'ren' : ''}`;
    }
    partyText += ` • ${bookingState.rooms} Room${bookingState.rooms > 1 ? 's' : ''}`;

    const selectedRoomObj = propData ? (propData.rooms || []).find(r => r.name === bookingState.roomType) : null;
    const roomDisplayName = bookingState.roomType === 'any' ? 'Any Available Space' : bookingState.roomType;

    stepContent = `
      <div class="wizard-header">
        <span class="wizard-step-indicator">Step 5 of 5 • Review & Transmit Enquiry</span>
        <h3 class="wizard-title">Review Your Enquiry</h3>
        <p class="wizard-subtitle">Connect directly with our experience curator on WhatsApp to confirm availability and receive a custom quotation.</p>
      </div>

      <div class="wizard-summary-card glass-card">
        <div class="summary-row">
          <span class="summary-label">Sanctuary</span>
          <span class="summary-value">${propData ? propData.name : 'ITW Sanctuary'} <small>(${propData ? propData.loc : ''})</small></span>
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

  stepContainer.innerHTML = stepContent + navButtonsHtml;
  bookingWizard.appendChild(stepContainer);

  bindWizardControls(stepContainer);
}

function bindWizardControls(container) {
  const step = bookingState.currentStep;

  // Destination & Property Choices (Step 1, 2)
  const choices = container.querySelectorAll('.choice-item');
  choices.forEach(choice => {
    const handleSelect = () => {
      const val = choice.getAttribute('data-val');
      if (step === 1) {
        if (bookingState.dest !== val) {
          bookingState.dest = val;
          bookingState.propertySlug = "";
          bookingState.roomType = "any";
        }
        bookingState.currentStep = 2;
        renderBookingStep();
      } else if (step === 2) {
        if (bookingState.propertySlug !== val) {
          bookingState.propertySlug = val;
          bookingState.roomType = "any";
        }
        bookingState.currentStep = 3;
        renderBookingStep();
      }
    };

    choice.addEventListener('click', handleSelect);
    choice.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSelect();
      }
    });
  });

  // Back & Next buttons
  const prevBtn = container.querySelector('#wizard-prev-btn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (bookingState.currentStep > 1) {
        bookingState.currentStep--;
        renderBookingStep();
      }
    });
  }

  const editBtn = container.querySelector('#wizard-edit-btn');
  if (editBtn) {
    editBtn.addEventListener('click', () => {
      bookingState.currentStep = 4;
      renderBookingStep();
    });
  }

  const nextBtn = container.querySelector('#wizard-next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (step === 3) {
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
        bookingState.currentStep = 4;
        renderBookingStep();
      } else if (step === 4) {
        bookingState.currentStep = 5;
        renderBookingStep();
      }
    });
  }

  // Live Date changes (Step 3)
  if (step === 3) {
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

  // Counters & Room cards (Step 4)
  if (step === 4) {
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

  // Final WhatsApp submission (Step 5)
  const finalBtn = container.querySelector('#confirm-whatsapp-submit');
  if (finalBtn) {
    finalBtn.addEventListener('click', () => {
      const propData = propertiesDb[bookingState.propertySlug];
      const whatsappUrl = buildEnquiryWhatsAppUrl({
        propertyName: propData ? propData.name : 'ITW Sanctuary',
        propertyLoc: propData ? propData.loc : '',
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

// Preserve formatDate for any external consumers
function formatDate(dateStr) {
  return formatDisplayDate(dateStr);
}

// ==========================================================================
// SCENE 7: PARTNER WITH ITW FORM SUBMISSION
// ==========================================================================
const partnerForm = document.getElementById('partner-collab-form');
const partnerSuccess = document.getElementById('partner-success');

if (partnerForm) {
  partnerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = partnerForm.querySelector('.partner-submit-btn');
    submitBtn.innerText = "Transmitting Proposal...";
    submitBtn.disabled = true;
    
    setTimeout(() => {
      partnerForm.classList.add('hidden');
      partnerSuccess.classList.remove('hidden');
    }, 1500);
  });
}


// ==========================================================================
// FOOTER / FINAL CANVAS SNOWFALL
// ==========================================================================
const snowCanvas = document.getElementById('snow-canvas');
const snowCtx = snowCanvas.getContext('2d');
let snowArray = [];
let snowAnimationId;

function initSnow() {
  snowArray = [];
  snowCanvas.width = window.innerWidth;
  snowCanvas.height = window.innerHeight;

  const count = window.innerWidth < 768 ? 50 : 120;
  for (let i = 0; i < count; i++) {
    snowArray.push({
      x: Math.random() * snowCanvas.width,
      y: Math.random() * snowCanvas.height,
      radius: 1 + Math.random() * 2.5,
      speedY: 0.5 + Math.random() * 1.0,
      speedX: -0.3 + Math.random() * 0.6,
      opacity: 0.2 + Math.random() * 0.5
    });
  }
}

function animateSnow() {
  snowCtx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
  snowArray.forEach(flake => {
    flake.y += flake.speedY;
    flake.x += flake.speedX;

    if (flake.y > snowCanvas.height) {
      flake.y = -10;
      flake.x = Math.random() * snowCanvas.width;
    }
    if (flake.x > snowCanvas.width || flake.x < 0) {
      flake.x = Math.random() * snowCanvas.width;
    }

    snowCtx.fillStyle = `rgba(247, 243, 236, ${flake.opacity})`;
    snowCtx.beginPath();
    snowCtx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    snowCtx.fill();
  });
  snowAnimationId = requestAnimationFrame(animateSnow);
}

window.addEventListener('resize', () => {
  if (snowCanvas) {
    snowCanvas.width = window.innerWidth;
    snowCanvas.height = window.innerHeight;
  }
});


// ==========================================================================
// INTERSECTION OBSERVER FOR AMBIENT SOUND FADES & SCENE REVEALS
// ==========================================================================
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const sceneObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('appear');
      
      const animates = entry.target.querySelectorAll('.animate-on-scroll');
      animates.forEach(el => el.classList.add('appear'));

      const sceneId = entry.target.id;
      
      // Simple dynamic wind volume shifts
      if (sceneId === 'scene-hero-track') {
        audioEngine.setWind(0.18, 2.0);
      } else if (sceneId === 'scene-featured') {
        audioEngine.setWind(0.28, 2.0);
      } else if (sceneId === 'scene-all-properties') {
        audioEngine.setWind(0.32, 2.0);
      } else if (sceneId === 'scene-final') {
        audioEngine.setWind(0.2, 3.0);
      }
    }
  });
}, observerOptions);

// Observe all active sections
document.querySelectorAll('.scene, .scene-scroll-container').forEach(section => {
  sceneObserver.observe(section);
});

// Initialize dynamic lists & snow
initSnow();
animateSnow();

// Header logo returns home
document.getElementById('header-logo-btn').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll to Featured Properties from Hero
document.getElementById('scroll-to-map-btn').addEventListener('click', () => {
  const featuredSec = document.getElementById('scene-featured');
  if (featuredSec) {
    featuredSec.scrollIntoView({ behavior: 'smooth' });
  }
});

// Scroll to Featured Properties from Walk Reveal
const walkExploreBtn = document.getElementById('walk-explore-btn');
if (walkExploreBtn) {
  walkExploreBtn.addEventListener('click', () => {
    const featuredSec = document.getElementById('scene-featured');
    if (featuredSec) {
      featuredSec.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Inquire button in header triggers the general booking wizard
const headerInquireBtn = document.getElementById('inquire-btn');
if (headerInquireBtn) {
  headerInquireBtn.addEventListener('click', () => {
    openBookingPortal();
  });
}


// ==========================================================================
// WEATHER SERVICE INTEGRATION (OPEN-METEO)
// ==========================================================================
const weatherCache = {};

// Fallbacks for offline / API failures
const weatherFallbacks = {
  "luxury-farm-stay": { temp: 28, code: 0 },
  "camp-cottages": { temp: 14, code: 2 },
  "mountain-homestay": { temp: 15, code: 2 },
  "forest-cottages": { temp: 18, code: 2 },
  "luxury-tree-house": { temp: 18, code: 2 },
  "frontier-camp": { temp: 16, code: 0 },
  "mountain-huts": { temp: 17, code: 2 },
  "camp-huts": { temp: 17, code: 2 }
};

function getWeatherIconAndDesc(code) {
  switch (code) {
    case 0: 
      return { icon: `<span class="weather-status-dot clear"></span>`, desc: "Clear Sky", category: "clear" };
    case 1:
    case 2:
    case 3: 
      return { icon: `<span class="weather-status-dot cloudy"></span>`, desc: "Partly Cloudy", category: "cloudy" };
    case 45:
    case 48: 
      return { icon: `<span class="weather-status-dot cloudy"></span>`, desc: "Foggy", category: "cloudy" };
    case 51:
    case 53:
    case 55: 
      return { icon: `<span class="weather-status-dot rain"></span>`, desc: "Drizzle", category: "rain" };
    case 61:
    case 63:
    case 65: 
      return { icon: `<span class="weather-status-dot rain"></span>`, desc: "Rain", category: "rain" };
    case 71:
    case 73:
    case 75: 
      return { icon: `<span class="weather-status-dot snow"></span>`, desc: "Snowfall", category: "snow" };
    case 77: 
      return { icon: `<span class="weather-status-dot snow"></span>`, desc: "Snow grains", category: "snow" };
    case 80:
    case 81:
    case 82: 
      return { icon: `<span class="weather-status-dot rain"></span>`, desc: "Rain Showers", category: "rain" };
    case 85:
    case 86: 
      return { icon: `<span class="weather-status-dot snow"></span>`, desc: "Snow Showers", category: "snow" };
    case 95:
    case 96:
    case 99: 
      return { icon: `<span class="weather-status-dot rain"></span>`, desc: "Thunderstorm", category: "rain" };
    default: 
      return { icon: `<span class="weather-status-dot cloudy"></span>`, desc: "Mild", category: "cloudy" };
  }
}

async function getWeatherForProperty(slug, lat, lon) {
  if (weatherCache[slug]) {
    return weatherCache[slug];
  }
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4 seconds timeout
    
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) throw new Error("API error status");
    const json = await response.json();
    if (!json.current_weather) throw new Error("No current weather data");
    
    const temp = Math.round(json.current_weather.temperature);
    const code = json.current_weather.weathercode;
    const cond = getWeatherIconAndDesc(code);
    
    const result = { temp, icon: cond.icon, desc: cond.desc, category: cond.category };
    weatherCache[slug] = result;
    return result;
  } catch (err) {
    console.warn(`Weather API failed for ${slug}, using fallback:`, err.message);
    const fb = weatherFallbacks[slug] || { temp: 18, code: 2 };
    const cond = getWeatherIconAndDesc(fb.code);
    const result = { temp: fb.temp, icon: cond.icon, desc: cond.desc, category: cond.category };
    weatherCache[slug] = result;
    return result;
  }
}

// Inject weather details to homepage property cards dynamically
function injectWeatherToCards() {
  document.querySelectorAll('.property-card').forEach(card => {
    const slug = card.getAttribute('data-slug');
    const data = propertiesDb[slug];
    if (data && data.lat && data.lon) {
      getWeatherForProperty(slug, data.lat, data.lon).then(weather => {
        const content = card.querySelector('.property-content');
        if (content) {
          let weatherBadge = card.querySelector('.property-weather-badge');
          if (!weatherBadge) {
            weatherBadge = document.createElement('span');
            weatherBadge.className = 'property-weather-badge';
            const locEl = card.querySelector('.property-location');
            if (locEl) {
              locEl.after(weatherBadge);
            }
          }
          weatherBadge.innerHTML = `${weather.icon} <span class="weather-temp">${weather.temp}&deg;C</span> <span style="opacity:0.55;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.06em;margin-left:0.15rem;">${weather.desc}</span>`;
        }
      });
    }
  });
}

// ==========================================================================
// WEATHER THEME ENGINE — REALISTIC FULL-VIEWPORT PARTICLE SYSTEM
// ==========================================================================
class WeatherThemeEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.fogLayers = [];
    this.animationFrameId = null;
    this.type = 'clear';
    this.active = false;
    this.time = 0;
    
    this._resize = this._resize.bind(this);
    this._animate = this._animate.bind(this);
    window.addEventListener('resize', this._resize);
  }
  
  start(type) {
    this.type = type;
    this.active = true;
    this.time = 0;
    this._resize();
    this.particles = [];
    this.fogLayers = [];
    this._initParticles();
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    this._animate();
  }
  
  stop() {
    this.active = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    window.removeEventListener('resize', this._resize);
  }
  
  _resize() {
    const parent = this.canvas.parentElement;
    if (parent) {
      this.canvas.width = parent.clientWidth;
      this.canvas.height = parent.clientHeight;
    } else {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }
  
  _initParticles() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    
    if (this.type === 'rain') {
      // 200 realistic rain streaks
      for (let i = 0; i < 200; i++) {
        this.particles.push(this._makeRain(w, h, true));
      }
    } else if (this.type === 'snow') {
      // 120 snowflakes of varying sizes
      for (let i = 0; i < 120; i++) {
        this.particles.push(this._makeSnow(w, h, true));
      }
    } else if (this.type === 'cloudy') {
      // 18 large volumetric fog/mist patches
      for (let i = 0; i < 18; i++) {
        this.fogLayers.push(this._makeFog(w, h));
      }
    } else {
      // clear — 10 soft golden lens flares + 6 light shafts
      for (let i = 0; i < 10; i++) {
        this.particles.push(this._makeSunGlow(w, h));
      }
      for (let i = 0; i < 6; i++) {
        this.fogLayers.push(this._makeLightShaft(w, h));
      }
    }
  }
  
  // --- RAIN ---
  _makeRain(w, h, randomY) {
    const windAngle = 0.12; // slight angle
    return {
      x: Math.random() * (w + 100) - 50,
      y: randomY ? Math.random() * h : -Math.random() * 60,
      speed: 14 + Math.random() * 10,
      length: 18 + Math.random() * 28,
      thickness: 0.8 + Math.random() * 1.0,
      opacity: 0.15 + Math.random() * 0.35,
      wind: windAngle
    };
  }
  
  // --- SNOW ---
  _makeSnow(w, h, randomY) {
    return {
      x: Math.random() * w,
      y: randomY ? Math.random() * h : -(Math.random() * 40),
      r: 1 + Math.random() * 3.5,
      vy: 0.3 + Math.random() * 1.0,
      vx: (Math.random() - 0.5) * 0.4,
      wobbleAmp: 0.3 + Math.random() * 0.8,
      wobbleFreq: 0.01 + Math.random() * 0.02,
      wobblePhase: Math.random() * Math.PI * 2,
      opacity: 0.3 + Math.random() * 0.5,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02
    };
  }
  
  // --- CLOUDY / FOG ---
  _makeFog(w, h) {
    return {
      x: Math.random() * w * 1.4 - w * 0.2,
      y: Math.random() * h,
      r: 100 + Math.random() * 200,
      vx: 0.08 + Math.random() * 0.18,
      opacity: 0.06 + Math.random() * 0.09,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.003 + Math.random() * 0.006
    };
  }
  
  // --- CLEAR / SUNNY ---
  _makeSunGlow(w, h) {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: 80 + Math.random() * 200,
      vx: (Math.random() - 0.5) * 0.06,
      vy: (Math.random() - 0.5) * 0.04,
      opacity: 0.06 + Math.random() * 0.08,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.003 + Math.random() * 0.007
    };
  }
  
  _makeLightShaft(w, h) {
    return {
      x: Math.random() * w,
      width: 40 + Math.random() * 100,
      opacity: 0.04 + Math.random() * 0.05,
      angle: -0.15 + Math.random() * 0.3,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.002 + Math.random() * 0.004,
      drift: (Math.random() - 0.5) * 0.05
    };
  }
  
  // --- MAIN ANIMATION LOOP ---
  _animate() {
    if (!this.active) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    this.time++;
    
    ctx.clearRect(0, 0, w, h);
    
    if (this.type === 'rain') {
      this._drawRain(ctx, w, h);
    } else if (this.type === 'snow') {
      this._drawSnow(ctx, w, h);
    } else if (this.type === 'cloudy') {
      this._drawFog(ctx, w, h);
    } else {
      this._drawSunny(ctx, w, h);
    }
    
    this.animationFrameId = requestAnimationFrame(this._animate);
  }
  
  _drawRain(ctx, w, h) {
    ctx.lineCap = 'round';
    this.particles.forEach((p, i) => {
      p.y += p.speed;
      p.x += p.speed * p.wind;
      
      if (p.y > h + 20) {
        this.particles[i] = this._makeRain(w, h, false);
        return;
      }
      
      const endX = p.x + p.length * p.wind;
      const endY = p.y + p.length;
      
      ctx.strokeStyle = `rgba(180, 195, 210, ${p.opacity})`;
      ctx.lineWidth = p.thickness;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    });
    
    // Subtle ambient mist at bottom
    const mistGrad = ctx.createLinearGradient(0, h * 0.85, 0, h);
    mistGrad.addColorStop(0, 'rgba(180, 195, 210, 0)');
    mistGrad.addColorStop(1, `rgba(180, 195, 210, ${0.03 + Math.sin(this.time * 0.01) * 0.015})`);
    ctx.fillStyle = mistGrad;
    ctx.fillRect(0, h * 0.85, w, h * 0.15);
  }
  
  _drawSnow(ctx, w, h) {
    this.particles.forEach((p, i) => {
      p.y += p.vy;
      p.wobblePhase += p.wobbleFreq;
      p.x += p.vx + Math.sin(p.wobblePhase) * p.wobbleAmp;
      p.rotation += p.rotSpeed;
      
      if (p.y > h + 10 || p.x < -20 || p.x > w + 20) {
        this.particles[i] = this._makeSnow(w, h, false);
        return;
      }
      
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      
      // Soft glowing snowflake
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.r * 2.5);
      grad.addColorStop(0, `rgba(240, 238, 232, ${p.opacity})`);
      grad.addColorStop(0.4, `rgba(240, 238, 232, ${p.opacity * 0.5})`);
      grad.addColorStop(1, 'rgba(240, 238, 232, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, p.r * 2.5, 0, Math.PI * 2);
      ctx.fill();
      
      // Solid core
      ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.9})`;
      ctx.beginPath();
      ctx.arc(0, 0, p.r, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    });
  }
  
  _drawFog(ctx, w, h) {
    this.fogLayers.forEach(f => {
      f.x += f.vx;
      f.pulsePhase += f.pulseSpeed;
      const currentOpacity = f.opacity * (0.7 + Math.sin(f.pulsePhase) * 0.3);
      
      if (f.x - f.r > w + 50) {
        f.x = -f.r - 50;
      }
      
      const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r);
      grad.addColorStop(0, `rgba(200, 200, 195, ${currentOpacity})`);
      grad.addColorStop(0.5, `rgba(200, 200, 195, ${currentOpacity * 0.4})`);
      grad.addColorStop(1, 'rgba(200, 200, 195, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Horizontal mist bands
    const bandY = h * (0.3 + Math.sin(this.time * 0.004) * 0.1);
    const bandGrad = ctx.createLinearGradient(0, bandY - 60, 0, bandY + 60);
    bandGrad.addColorStop(0, 'rgba(200, 200, 195, 0)');
    bandGrad.addColorStop(0.5, `rgba(200, 200, 195, ${0.025 + Math.sin(this.time * 0.006) * 0.01})`);
    bandGrad.addColorStop(1, 'rgba(200, 200, 195, 0)');
    ctx.fillStyle = bandGrad;
    ctx.fillRect(0, bandY - 60, w, 120);
  }
  
  _drawSunny(ctx, w, h) {
    // Light shafts
    this.fogLayers.forEach(shaft => {
      shaft.x += shaft.drift;
      shaft.pulsePhase += shaft.pulseSpeed;
      const currentOpacity = shaft.opacity * (0.6 + Math.sin(shaft.pulsePhase) * 0.4);
      
      if (shaft.x > w + 100) shaft.x = -100;
      if (shaft.x < -100) shaft.x = w + 100;
      
      ctx.save();
      ctx.translate(shaft.x, 0);
      ctx.rotate(shaft.angle);
      
      const shaftGrad = ctx.createLinearGradient(-shaft.width / 2, 0, shaft.width / 2, 0);
      shaftGrad.addColorStop(0, 'rgba(224, 185, 126, 0)');
      shaftGrad.addColorStop(0.5, `rgba(224, 185, 126, ${currentOpacity})`);
      shaftGrad.addColorStop(1, 'rgba(224, 185, 126, 0)');
      ctx.fillStyle = shaftGrad;
      ctx.fillRect(-shaft.width / 2, -20, shaft.width, h + 40);
      
      ctx.restore();
    });
    
    // Golden lens flares
    this.particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.pulsePhase += p.pulseSpeed;
      const currentOpacity = p.opacity * (0.5 + Math.sin(p.pulsePhase) * 0.5);
      
      if (p.x < -p.r || p.x > w + p.r || p.y < -p.r || p.y > h + p.r) {
        this.particles[i] = this._makeSunGlow(w, h);
        return;
      }
      
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      grad.addColorStop(0, `rgba(224, 185, 126, ${currentOpacity})`);
      grad.addColorStop(0.3, `rgba(224, 185, 126, ${currentOpacity * 0.4})`);
      grad.addColorStop(1, 'rgba(224, 185, 126, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}

// Global engine reference
let activeWeatherEngine = null;

// Call on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectWeatherToCards);
} else {
  injectWeatherToCards();
}
