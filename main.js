import { audioEngine } from './audio.js';

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
const loader1 = document.getElementById('loader-line-1');
const loader2 = document.getElementById('loader-line-2');
const loaderLogoBox = document.getElementById('loader-logo-box');
const enterBtn = document.getElementById('enter-btn');
const audioToggleBtn = document.getElementById('audio-toggle-btn');
const iconMute = audioToggleBtn.querySelector('.icon-mute');
const iconSound = audioToggleBtn.querySelector('.icon-sound');

function runLoaderSequence() {
  // Loader Text Sequence
  setTimeout(() => {
    if (loader1) loader1.classList.add('visible');
  }, 500);

  setTimeout(() => {
    if (loader1) loader1.classList.remove('visible');
  }, 2200);

  setTimeout(() => {
    if (loader2) loader2.classList.add('visible');
  }, 3200);

  setTimeout(() => {
    if (loader2) loader2.classList.remove('visible');
  }, 4900);

  setTimeout(() => {
    if (loaderLogoBox) {
      loaderLogoBox.classList.remove('hidden');
      setTimeout(() => {
        loaderLogoBox.classList.add('visible');
      }, 100);
    }
  }, 5900);
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

// ==========================================================================
// DATA: PROPERTY DATABASE
// ==========================================================================
const propertiesDb = {
  "mountain-huts": {
    name: "ITW Mountain Huts",
    dest: "Uttarakhand",
    loc: "Viratkhai, Chakrata",
    cat: "Mountain Huts",
    price: "₹6,500",
    img: "/ITW/itw_mountain_huts_viratkhai.png",
    gallery: [
      "/ITW/itw_mountain_huts_viratkhai.png"
    ],
    quote: "Wake up above the clouds, inside an ancient oak woodland.",
    about: "Simple luxury huts nested in the serene woods of Viratkhai near Chakrata. Built using local stone and wood, these huts offer panoramic Himalayan valley views and deep quietude.",
    amenities: ["Wood Fireplace", "Stargazing Deck", "Local Garhwali Buffet", "Hot Showers", "Wi-Fi Access", "Nature Trails"],
    experiences: ["Oak Forest Trails", "Valley Birding", "Charcoal Bukhari Evenings", "Millet Bread Baking"],
    nearby: ["Tiger Falls", "Chakrata Market", "Budher Caves"],
    locationDesc: "Viratkhai, Chakrata, Uttarakhand. Perched at 8,100 feet on the boundary ridge.",
    rooms: [
      {
        name: "Deodar Valley Hut",
        occupancy: "2 Guests",
        inclusions: "Gourmet Breakfast, Forest walk",
        price: "₹6,500",
        img: "/ITW/itw_mountain_huts_viratkhai.png"
      }
    ]
  },
  "camp-huts": {
    name: "ITW Camp & Huts",
    dest: "Uttarakhand",
    loc: "Viratkhai, Chakrata",
    cat: "Camp & Huts",
    price: "₹5,900",
    img: "/ITW/itw_huts_camp_viratkhai.png",
    gallery: [
      "/ITW/itw_huts_camp_viratkhai.png"
    ],
    quote: "Dwell under the stars, surrounded by high altitude ridges.",
    about: "Cozy alpine camps and wooden huts built to withstand the elements while providing pure comfort. Ideal for adventure seekers scaling the high ridges of Chakrata.",
    amenities: ["Insulated Camps", "Woodfire Pit", "Hot Herbal Teas", "Warm Bedding", "Cozy Mud Room"],
    experiences: ["Ridge Treks", "Milking Local Cows", "Stargazing Circles"],
    nearby: ["Tiger Falls", "Kanasar Forest Lodge", "Deoban Views"],
    locationDesc: "Viratkhai, Chakrata, Uttarakhand. Surrounded by deodar and rhododendron woods.",
    rooms: [
      {
        name: "Ridge Camp Hut",
        occupancy: "2 Guests",
        inclusions: "All meals included, Guided sunset trek",
        price: "₹5,900",
        img: "/ITW/itw_huts_camp_viratkhai.png"
      }
    ]
  },
  "luxury-farm-stay": {
    name: "ITW Luxury Farm Stay",
    dest: "Uttarakhand",
    loc: "Horrawala, Dehradun",
    cat: "Farm Stay",
    price: "₹7,500",
    img: "/ITW/itw_luxury_farm_stay.png",
    gallery: [
      "/ITW/itw_luxury_farm_stay.png"
    ],
    quote: "Dwell inside organic litchi groves and silent foothills.",
    about: "Private luxury farm stay featuring an exclusive villa, swimming pool, landscaped gardens, and peaceful countryside surroundings.",
    amenities: ["Private Villa", "Swimming Pool", "Landscaped Gardens", "Organic Kitchen", "Plunge Pool", "Yoga Deck"],
    experiences: ["Farm-to-Table Dining", "Herbal Tea Blending", "Sal Forest Birding", "Pottery Sessions"],
    nearby: ["Robber's Cave", "Forest Research Institute", "Mussoorie Hills"],
    locationDesc: "Horrawala, Dehradun, Uttarakhand. Perched in peaceful countryside surroundings.",
    rooms: [
      {
        name: "Meadow Suite",
        occupancy: "2 Guests",
        inclusions: "Gourmet Breakfast, Farm tour & harvest experience",
        price: "₹7,500",
        img: "/ITW/itw_luxury_farm_stay.png"
      },
      {
        name: "Exclusive Orchard Villa",
        occupancy: "4 Guests",
        inclusions: "All meals included, Private butler, Orchard harvest walk",
        price: "₹18,000",
        img: "/ITW/itw_luxury_farm_stay.png"
      }
    ]
  },
  "camp-cottages": {
    name: "ITW Camp & Cottages",
    dest: "Himachal Pradesh",
    loc: "Jispa",
    cat: "Camp & Cottages",
    price: "₹8,200",
    img: "/ITW/itw_camp_cottages_jispa.png",
    gallery: [
      "/ITW/itw_camp_cottages_jispa.png"
    ],
    quote: "Breathe in glacier air on the edge of the Bhaga River.",
    about: "Cozy mountain cottages and premium luxury camps surrounded by the majestic Himalayas on the Manali–Leh Highway.",
    amenities: ["Insulated Swiss Domes", "Riverbed Deck", "Heated Blankets", "Local Lahauli Buffet", "Mud Room", "Stargazing Deck"],
    experiences: ["River Bed Trekking", "Butter Tea Brewing", "Glacier Photography", "Monastery Trails"],
    nearby: ["Bhaga River Confluence", "Kardang Monastery", "Baralacha La Pass"],
    locationDesc: "Jispa, Himachal Pradesh. Perged on the scenic Manali-Leh highway.",
    rooms: [
      {
        name: "Mountain Vista Cottage",
        occupancy: "2 Adults",
        inclusions: "Gourmet Breakfast, Riverbed nature walk",
        price: "₹9,500",
        img: "/ITW/itw_camp_cottages_jispa.png"
      },
      {
        name: "Premium Swiss Camp",
        occupancy: "2 Adults",
        inclusions: "Breakfast & Dinner included, Stargazing deck access",
        price: "₹8,200",
        img: "/ITW/itw_camp_cottages_jispa.png"
      }
    ]
  },
  "mountain-homestay": {
    name: "ITW Mountain Homestay",
    dest: "Himachal Pradesh",
    loc: "Keylong",
    cat: "Homestay",
    price: "₹5,800",
    img: "/ITW/itw_mountain_homestay_keylong.png",
    gallery: [
      "/ITW/itw_mountain_homestay_keylong.png"
    ],
    quote: "Experience traditional Lahauli life and monastic calm.",
    about: "Authentic Himalayan homestay offering warm hospitality, traditional cuisine, and breathtaking mountain views.",
    amenities: ["Charcoal Bukhari", "Local Cuisine", "Terrace view", "Warm hospitality", "Woolen Blankets"],
    experiences: ["Local Buckwheat Cooking", "Monastery Chanting Walk", "Clay Crafting"],
    nearby: ["Kardang Monastery", "Keylong Market", "Shashur Monastery"],
    locationDesc: "Keylong, Himachal Pradesh. Perched on Keylong Ridge, overlooking the Lahaul Valley confluence.",
    rooms: [
      {
        name: "Traditional Lahauli Room",
        occupancy: "2 Adults",
        inclusions: "Traditional family-cooked breakfast & dinner included",
        price: "₹5,800",
        img: "/ITW/itw_mountain_homestay_keylong.png"
      }
    ]
  },
  "forest-cottages": {
    name: "ITW Forest Cottages",
    dest: "Himachal Pradesh",
    loc: "Jibhi",
    cat: "Forest Cottages",
    price: "₹8,000",
    img: "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80"
    ],
    quote: "A hand-dressed stone cottage in a cedar glade.",
    about: "Beautiful duplex cottages nestled among cedar forests, perfect for peaceful mountain escapes.",
    amenities: ["Woodsmoke Hearth", "Stream Side Patio", "Slate Roof Cabins", "Handmade Wool Linens", "Local Organic Food", "WiFi"],
    experiences: ["Waterfall Trail Hiking", "Cedar Forest Bathing", "Fireside Acoustic Tunes", "Local Apple Foraging"],
    nearby: ["Jibhi Waterfall", "Jalori Pass", "Chehni Kothi Tower"],
    locationDesc: "Jibhi, Himachal Pradesh. Perched next to a rushing stream in a deep pine forest.",
    rooms: [
      {
        name: "Duplex Cedar Cottage",
        occupancy: "2-3 Adults",
        inclusions: "Gourmet Breakfast, Waterfall trail excursion",
        price: "₹8,000",
        img: "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  "luxury-tree-house": {
    name: "ITW Luxury Tree House",
    dest: "Himachal Pradesh",
    loc: "Jibhi",
    cat: "Luxury Tree House",
    price: "₹11,500",
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80"
    ],
    quote: "Float in the forest canopy, with your private jacuzzi.",
    about: "Luxury tree house featuring a private jacuzzi, elegant interiors, and panoramic forest views.",
    amenities: ["Hot Jacuzzi", "Private Cedar Deck", "Glass Canopy Walls", "Espresso Station", "Heated Bedding", "Wi-Fi"],
    experiences: ["Canopy Stargazing", "Pine Needle Crafting", "High Forest Photography"],
    nearby: ["Jibhi Stream", "Jalori Pass", "Serolsar Lake"],
    locationDesc: "Jibhi, Himachal Pradesh. Suspended 35 feet high in the pine and cedar branches.",
    rooms: [
      {
        name: "Jacuzzi Canopy Treehouse",
        occupancy: "2 Adults",
        inclusions: "Gourmet Breakfast & Dinner, Jacuzzi access, Espresso bar",
        price: "₹11,500",
        img: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80"
      }
    ]
  },
  "frontier-camp": {
    name: "ITW Frontier Camp",
    dest: "Ladakh",
    loc: "Tyakshi, Turtuk",
    cat: "Luxury Camp",
    price: "₹7,800",
    img: "/ITW/itw_frontier_camp.png",
    gallery: [
      "/ITW/itw_frontier_camp.png"
    ],
    quote: "Sleep on the edge of Turtuk, under the Karakoram stars.",
    about: "Premium Himalayan luxury camping surrounded by dramatic mountain landscapes and the untouched beauty of Ladakh.",
    amenities: ["Skylight Dome", "Insulated Bedding", "Hot Copper Showers", "Organic Apricot Orchard", "Balti Dining Hall"],
    experiences: ["Apricot Foraging", "Balti Culture Circle", "Bactrian Camel Ride", "Gorge Stargazing"],
    nearby: ["Balti Heritage Museum", "Shyok River bed", "Border View Point"],
    locationDesc: "Tyakshi, Turtuk, Ladakh. Surrounded by apricot orchards and towering grey granite cliffs of the Karakoram range.",
    rooms: [
      {
        name: "Apricot Skylight Dome",
        occupancy: "2 Guests",
        inclusions: "Traditional Buffet Breakfast & Dinner, Guided border trail stroll",
        price: "₹7,800",
        img: "/ITW/itw_frontier_camp.png"
      }
    ]
  }
};

// SCENE 3 & 5: DYNAMICALLY RENDER ALL PROPERTIES GRID
// ==========================================================================
const allPropertiesContainer = document.getElementById('all-properties-grid-container');

function renderAllProperties(filter = "all") {
  if (!allPropertiesContainer) return;
  allPropertiesContainer.innerHTML = "";
  
  Object.keys(propertiesDb).forEach(slug => {
    const data = propertiesDb[slug];
    if (filter !== "all" && data.dest !== filter) return;
    
    const card = document.createElement('div');
    card.className = "all-property-card animate-on-scroll";
    card.setAttribute('data-slug', slug);
    
    const isComingSoon = data.price === "Coming Soon";
    const badgeText = data.cat;
    
    card.innerHTML = `
      <div class="all-property-image-box">
        <img class="all-property-img" src="${data.img}" alt="${data.name}" loading="lazy">
        <div class="all-property-badge">${badgeText}</div>
      </div>
      <div class="all-property-content">
        <span class="all-property-location">${data.dest} • ${data.loc}</span>
        <h4 class="all-property-name">${data.name}</h4>
        <p class="all-property-price">${isComingSoon ? "Opening in Spring 2027" : `Starting at ${data.price} / night`}</p>
        ${isComingSoon 
          ? `<button class="view-property-btn disabled" style="opacity: 0.5; pointer-events: none;">Coming Soon</button>` 
          : `<button class="view-property-btn" data-slug="${slug}">View Property</button>`
        }
      </div>
    `;
    
    allPropertiesContainer.appendChild(card);
  });
  
  // Re-observe newly rendered cards for animations
  allPropertiesContainer.querySelectorAll('.animate-on-scroll').forEach(el => {
    sceneObserver.observe(el);
  });
  
  // Bind click triggers
  allPropertiesContainer.querySelectorAll('.view-property-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const slug = btn.getAttribute('data-slug');
      openPropertyOverlay(slug);
    });
  });
}

// Bind Home Filter Tabs
const filterTabs = document.querySelectorAll('.filter-tab');
filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filterVal = tab.getAttribute('data-filter');
    renderAllProperties(filterVal);
  });
});

// Explore Destination buttons to slide down and filter All Properties
document.querySelectorAll('.explore-dest-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const dest = btn.getAttribute('data-dest');
    const targetTab = document.querySelector(`.filter-tab[data-filter="${dest}"]`);
    if (targetTab) {
      targetTab.click();
    }
    const allPropsSec = document.getElementById('scene-all-properties');
    if (allPropsSec) {
      allPropsSec.scrollIntoView({ behavior: 'smooth' });
    }
  });
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
                  <span class="room-price-label">Price per night</span>
                  <span class="room-price-val">${room.price}</span>
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
        <p class="prop-hero-loc">${data.dest} • ${data.loc}</p>
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
    ${nearbyHtml}
    ${mapHtml}
    
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
          Enquire on WhatsApp
        </button>
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
    window.open(`https://wa.me/919999999999?text=${encodeURIComponent(msg)}`, '_blank');
  });
}

function closePropertyOverlay() {
  propertyOverlay.classList.remove('active');
  document.body.style.overflow = ""; // Restore scroll
  
  // Clear hash
  window.history.pushState(null, null, " ");
}

closePropertyBtn.addEventListener('click', closePropertyOverlay);

// Close on clicking backdrop
propertyOverlay.addEventListener('click', (e) => {
  if (e.target === propertyOverlay) {
    closePropertyOverlay();
  }
});

// Bind Featured Property Cards
document.querySelectorAll('.property-card').forEach(card => {
  card.addEventListener('click', () => {
    const slug = card.getAttribute('data-slug');
    openPropertyOverlay(slug);
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
// INTERACTIVE MULTI-STEP BOOKING PORTAL STATE MACHINE
// ==========================================================================
const bookingPortal = document.getElementById('booking-portal-overlay');
const closeBookingBtn = document.getElementById('close-booking-overlay');
const bookingWizard = document.getElementById('booking-portal-wizard');

const bookingState = {
  dest: "",
  propertySlug: "",
  checkIn: "",
  checkOut: "",
  guests: "1 Guest",
  roomType: "",
  currentStep: 1
};

function openBookingPortal(presetPropertySlug = "") {
  // Reset booking state
  bookingState.dest = "";
  bookingState.propertySlug = presetPropertySlug;
  bookingState.checkIn = "";
  bookingState.checkOut = "";
  bookingState.guests = "1 Guest";
  bookingState.roomType = "";
  bookingState.currentStep = 1;
  
  if (presetPropertySlug && propertiesDb[presetPropertySlug]) {
    bookingState.dest = propertiesDb[presetPropertySlug].dest;
    bookingState.currentStep = 3; // Jump directly to Date Selection (Step 3) if property is preset!
  }
  
  renderBookingStep();
  bookingPortal.classList.add('active');
  document.body.style.overflow = "hidden";
}

function closeBookingPortal() {
  bookingPortal.classList.remove('active');
  document.body.style.overflow = "";
}

closeBookingBtn.addEventListener('click', closeBookingPortal);

// Close on backdrop
bookingPortal.addEventListener('click', (e) => {
  if (e.target === bookingPortal) {
    closeBookingPortal();
  }
});

// floating button trigger
const bookingPill = document.getElementById('booking-pill-trigger');
if (bookingPill) {
  bookingPill.addEventListener('click', () => {
    openBookingPortal();
  });
}

function renderBookingStep() {
  bookingWizard.innerHTML = "";
  const step = bookingState.currentStep;
  
  const stepContainer = document.createElement('div');
  stepContainer.className = `booking-wizard-step active ${step === 7 ? 'results-step' : ''}`;
  
  let stepContent = "";
  let navButtonsHtml = `
    <div class="wizard-nav-footer">
      ${step > 1 ? `<button class="wizard-back-btn" id="wizard-prev-btn">Back</button>` : ''}
      ${step < 7 ? `<button class="wizard-next-btn" id="wizard-next-btn">Next Step</button>` : ''}
    </div>
  `;
  
  if (step === 1) {
    // Choose Destination
    stepContent = `
      <span class="step-indicator">Step 1 of 6</span>
      <h3 class="step-question">Where does your journey lead?</h3>
      <div class="booking-choice-list">
        <div class="choice-item ${bookingState.dest === 'Himachal Pradesh' ? 'selected' : ''}" data-val="Himachal Pradesh">
          <span class="choice-label">Himachal Pradesh</span>
          <span class="choice-meta">4 sanctuaries</span>
        </div>
        <div class="choice-item ${bookingState.dest === 'Uttarakhand' ? 'selected' : ''}" data-val="Uttarakhand">
          <span class="choice-label">Uttarakhand</span>
          <span class="choice-meta">2 sanctuaries</span>
        </div>
        <div class="choice-item ${bookingState.dest === 'Ladakh' ? 'selected' : ''}" data-val="Ladakh">
          <span class="choice-label">Ladakh</span>
          <span class="choice-meta">2 sanctuaries</span>
        </div>
      </div>
    `;
    navButtonsHtml = ""; // Auto-advance on click!
  } 
  
  else if (step === 2) {
    // Choose Property
    const destinationProperties = Object.keys(propertiesDb).filter(slug => {
      return propertiesDb[slug].dest === bookingState.dest && propertiesDb[slug].price !== "Coming Soon";
    });
    
    stepContent = `
      <span class="step-indicator">Step 2 of 6</span>
      <h3 class="step-question">Select your mountain dwell</h3>
      <div class="booking-choice-list">
        ${destinationProperties.map(slug => `
          <div class="choice-item ${bookingState.propertySlug === slug ? 'selected' : ''}" data-val="${slug}">
            <span class="choice-label">${propertiesDb[slug].name}</span>
            <span class="choice-meta">${propertiesDb[slug].loc} • ${propertiesDb[slug].price}</span>
          </div>
        `).join('')}
      </div>
    `;
    navButtonsHtml = `
      <div class="wizard-nav-footer">
        <button class="wizard-back-btn" id="wizard-prev-btn">Back</button>
      </div>
    `; // Auto-advance on click, but keep back button
  } 
  
  else if (step === 3) {
    // Check-in Date
    const today = new Date().toISOString().split('T')[0];
    stepContent = `
      <span class="step-indicator">Step 3 of 6</span>
      <h3 class="step-question">Select your check-in date</h3>
      <div class="booking-input-wrapper">
        <input type="date" min="${today}" value="${bookingState.checkIn}" id="checkin-date-picker" class="booking-date-input">
      </div>
    `;
  } 
  
  else if (step === 4) {
    // Check-out Date
    const minCheckout = bookingState.checkIn ? bookingState.checkIn : new Date().toISOString().split('T')[0];
    stepContent = `
      <span class="step-indicator">Step 4 of 6</span>
      <h3 class="step-question">Select your check-out date</h3>
      <div class="booking-input-wrapper">
        <input type="date" min="${minCheckout}" value="${bookingState.checkOut}" id="checkout-date-picker" class="booking-date-input">
      </div>
    `;
  } 
  
  else if (step === 5) {
    // Guest Count
    stepContent = `
      <span class="step-indicator">Step 5 of 6</span>
      <h3 class="step-question">How many travelers?</h3>
      <div class="booking-choice-list">
        ${["1 Guest", "2 Guests", "3 Guests", "4+ Guests"].map(g => `
          <div class="choice-item ${bookingState.guests === g ? 'selected' : ''}" data-val="${g}">
            <span class="choice-label">${g}</span>
          </div>
        `).join('')}
      </div>
    `;
    navButtonsHtml = ""; // Auto-advance
  } 
  
  else if (step === 6) {
    // Choose Room Type
    const propData = propertiesDb[bookingState.propertySlug];
    stepContent = `
      <span class="step-indicator">Step 6 of 6</span>
      <h3 class="step-question">Select your preferred space</h3>
      <div class="booking-choice-list">
        <div class="choice-item ${bookingState.roomType === 'any' ? 'selected' : ''}" data-val="any">
          <span class="choice-label">Any Available Space</span>
          <span class="choice-meta">Best availability</span>
        </div>
        ${propData.rooms.map(room => `
          <div class="choice-item ${bookingState.roomType === room.name ? 'selected' : ''}" data-val="${room.name}">
            <span class="choice-label">${room.name}</span>
            <span class="choice-meta">${room.price}</span>
          </div>
        `).join('')}
      </div>
    `;
    navButtonsHtml = ""; // Auto-advance
  } 
  
  else if (step === 7) {
    // Results
    const propData = propertiesDb[bookingState.propertySlug];
    const checkinFormatted = formatDate(bookingState.checkIn);
    const checkoutFormatted = formatDate(bookingState.checkOut);
    
    // Filter rooms if a specific one was selected
    const displayRooms = bookingState.roomType === "any" 
      ? propData.rooms 
      : propData.rooms.filter(r => r.name === bookingState.roomType);
      
    stepContent = `
      <span class="step-indicator">Availability Results</span>
      <h3 class="step-question" style="font-size:2rem; margin-bottom:1.5rem;">Available Spaces at ${propData.name}</h3>
      <p style="font-family:var(--font-sans); color:var(--color-stone); opacity:0.6; margin-bottom:2.5rem;">
        Dates: ${checkinFormatted} to ${checkoutFormatted} • ${bookingState.guests}
      </p>
      
      <div class="booking-results-container">
        <div class="booking-room-results-grid">
          ${displayRooms.map(room => `
            <div class="room-result-card">
              <div class="result-img-box">
                <img class="result-img" src="${room.img}" alt="${room.name}">
              </div>
              <div class="result-details-box">
                <h5 class="result-room-name">${room.name}</h5>
                <span class="result-occupancy">Max Occupancy: ${room.occupancy}</span>
                <span class="result-inclusions">Includes: ${room.inclusions}</span>
                <div class="result-price-cta-row">
                  <div class="result-price-wrap">
                    <span class="result-price-label">Per Night</span>
                    <span class="result-price-val">${room.price}</span>
                  </div>
                  <button class="result-cta-btn" data-room="${room.name}" data-price="${room.price}">Book via WhatsApp</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    navButtonsHtml = `
      <div class="wizard-nav-footer">
        <button class="wizard-back-btn" id="wizard-prev-btn" style="width:100%;">Change Search Parameters</button>
      </div>
    `;
  }
  
  stepContainer.innerHTML = stepContent + navButtonsHtml;
  bookingWizard.appendChild(stepContainer);
  
  // Attach event bindings
  bindWizardControls(stepContainer);
}

function bindWizardControls(container) {
  // Choice selections (Step 1, 2, 5, 6)
  const choices = container.querySelectorAll('.choice-item');
  choices.forEach(choice => {
    choice.addEventListener('click', () => {
      const val = choice.getAttribute('data-val');
      const step = bookingState.currentStep;
      
      if (step === 1) {
        bookingState.dest = val;
        bookingState.currentStep = 2;
        renderBookingStep();
      } else if (step === 2) {
        bookingState.propertySlug = val;
        bookingState.currentStep = 3;
        renderBookingStep();
      } else if (step === 5) {
        bookingState.guests = val;
        bookingState.currentStep = 6;
        renderBookingStep();
      } else if (step === 6) {
        bookingState.roomType = val;
        bookingState.currentStep = 7;
        renderBookingStep();
      }
    });
  });
  
  // Back & Next triggers
  const prevBtn = container.querySelector('#wizard-prev-btn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      // If we jumped to step 3 because property was preset, go back to step 1
      if (bookingState.currentStep === 3 && window.location.hash.startsWith('#property-')) {
        closeBookingPortal();
      } else {
        bookingState.currentStep--;
        renderBookingStep();
      }
    });
  }
  
  const nextBtn = container.querySelector('#wizard-next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const step = bookingState.currentStep;
      
      if (step === 3) {
        const checkinVal = container.querySelector('#checkin-date-picker').value;
        if (!checkinVal) {
          alert("Please select a check-in date.");
          return;
        }
        bookingState.checkIn = checkinVal;
        bookingState.currentStep = 4;
        renderBookingStep();
      } else if (step === 4) {
        const checkoutVal = container.querySelector('#checkout-date-picker').value;
        if (!checkoutVal) {
          alert("Please select a check-out date.");
          return;
        }
        if (new Date(checkoutVal) <= new Date(bookingState.checkIn)) {
          alert("Check-out date must be after check-in date.");
          return;
        }
        bookingState.checkOut = checkoutVal;
        bookingState.currentStep = 5;
        renderBookingStep();
      }
    });
  }
  
  // WhatsApp submission click (Step 7)
  const resultsCta = container.querySelectorAll('.result-cta-btn');
  resultsCta.forEach(btn => {
    btn.addEventListener('click', () => {
      const roomName = btn.getAttribute('data-room');
      const propData = propertiesDb[bookingState.propertySlug];
      const checkinF = formatDate(bookingState.checkIn);
      const checkoutF = formatDate(bookingState.checkOut);
      
      const text = `Hi Into The Wild team, I'd like to make a booking enquiry for:
- Property: ${propData.name}
- Room: ${roomName}
- Dates: ${checkinF} to ${checkoutF}
- Guests: ${bookingState.guests}

Please confirm availability and sharing details.`;
      
      const whatsappUrl = `https://wa.me/919999999999?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
      closeBookingPortal();
    });
  });
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return d.toLocaleDateString('en-US', options);
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
renderAllProperties();
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

