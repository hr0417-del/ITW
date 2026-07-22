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

// ==========================================================================
// DATA: PROPERTY DATABASE
// ==========================================================================
const propertiesDb = {
  "luxury-farm-stay": {
    name: "ITW Luxury Farm Stay",
    dest: "Uttarakhand",
    loc: "Horrawala, Dehradun",
    cat: "Farm Stay",
    lat: 30.3165,
    lon: 78.0322,
    img: "./ITW/itw_luxury_farm_stay.png",
    gallery: [
      "./properties/luxury-farm-stay/img_1.jpeg",
      "./properties/luxury-farm-stay/img_2.jpeg",
      "./properties/luxury-farm-stay/img_3.jpeg",
      "./properties/luxury-farm-stay/img_4.jpeg",
      "./properties/luxury-farm-stay/img_5.jpeg",
      "./properties/luxury-farm-stay/img_6.jpeg",
      "./properties/luxury-farm-stay/img_7.jpeg",
      "./properties/luxury-farm-stay/img_8.jpeg",
      "./properties/luxury-farm-stay/img_9.jpeg"
    ],
    quote: "A private agricultural oasis nestled in the foothills of Dehradun.",
    about: "A private luxury farm stay featuring an exclusive villa, outdoor pool, private fruit orchards, and lush landscaped gardens. Dwell in absolute seclusion surrounded by seasonal harvest fields, where still morning air meets luxury living.",
    amenities: ["Villa Access", "Private Pool", "Organic Farms", "Personal Chef", "Wi-Fi Access", "Lawn Lounge", "Bukhari Fireplace", "Heritage Orchard Access"],
    experiences: ["Farm-to-Table Dining", "Fruit Harvesting", "Foothills Cycling", "Private Yoga Sessions", "Traditional Cooking Class"],
    nearby: ["Robber's Cave", "Forest Research Institute", "Sahastradhara Springs", "Mindrolling Monastery"],
    locationDesc: "Horrawala, Dehradun, Uttarakhand. Situated on a private agricultural estate.",
    services: ["Airport Transfers", "Private Cabs", "Local Food Experiences", "Chef-led Baking Sessions", "Village Walks", "Celebration Planning", "Private Sommelier"],
    reviews: [
      { guest: "Rohan M.", text: "An absolute oasis of peace. The farm-to-table meals were extraordinary.", rating: "5/5" },
      { guest: "Kabir S.", text: "Perfect luxury stay. Having the private pool and orchards to ourselves was incredible.", rating: "5/5" }
    ],
    rooms: [
      {
        name: "Luxury Foothills Villa",
        occupancy: "4 Guests",
        inclusions: "Exclusive Villa Use, Organic Breakfast, Farm Tour, Airport Transfer",
        img: "./properties/luxury-farm-stay/img_1.jpeg"
      },
      {
        name: "Heritage Orchard Suite",
        occupancy: "2 Guests",
        inclusions: "Organic Breakfast, Chef-led Fruit Baking Session, Orchard Walk",
        img: "./properties/luxury-farm-stay/img_3.jpeg"
      }
    ]
  },
  "camp-cottages": {
    name: "ITW Camp & Cottages",
    dest: "Himachal Pradesh",
    loc: "Jispa",
    cat: "Camp & Cottages",
    lat: 32.6285,
    lon: 77.1896,
    img: "./ITW/itw_camp_cottages_jispa.png",
    gallery: [
      "./properties/camp-cottages/img_1.jpg",
      "./properties/camp-cottages/img_2.webp",
      "./properties/camp-cottages/img_3.jpg",
      "./properties/camp-cottages/img_4.webp",
      "./properties/camp-cottages/img_5.jpg",
      "./properties/camp-cottages/img_6.webp",
      "./properties/camp-cottages/img_7.webp",
      "./properties/camp-cottages/img_8.webp"
    ],
    quote: "Sleep beside the rushing Bhaga River on the Manali-Leh Highway.",
    about: "Luxury camps and mountain cottages surrounded by the majestic Himalayas. Wake up to raw granite peaks, roaring glacial streams, and high-altitude wilderness, with warm hospitality in the cold desert.",
    amenities: ["Riverside Deck", "Heated Tents", "Local Himachali Buffet", "Hot Running Water", "Star Gazing Telescopes", "Cozy Fire Pit", "Alpine Library"],
    experiences: ["Bhaga River Treks", "High-Altitude Stargazing", "Angling", "Local Village Curation", "Glacier Trail Hike"],
    nearby: ["Suraj Tal Lake", "Baralacha La Pass", "Keylong Monastery", "Deepak Tal Lake"],
    locationDesc: "Jispa, Lahaul Valley, Himachal Pradesh. Located on the banks of the Bhaga River.",
    services: ["Airport Transfers", "Private Cabs", "Guided Treks", "Hiking Trails", "Camping", "Bonfire", "Motorcycle Servicing Guide"],
    reviews: [
      { guest: "Ananya R.", text: "Stunning river views and incredible hospitality. The heated tents were extremely cozy.", rating: "5/5" },
      { guest: "Vikram P.", text: "A must-stay on the Manali-Leh highway. The mountain backdrop is surreal.", rating: "5/5" }
    ],
    rooms: [
      {
        name: "Glacial River Cottage",
        occupancy: "2 Guests",
        inclusions: "Gourmet Dinner & Breakfast, Riverside Walk Guided Tour",
        img: "./properties/camp-cottages/img_1.jpg"
      },
      {
        name: "Luxury Riverside Dome",
        occupancy: "2 Guests",
        inclusions: "Gourmet Dinner & Breakfast, High-Altitude Stargazing Experience",
        img: "./properties/camp-cottages/img_3.jpg"
      }
    ]
  },
  "mountain-homestay": {
    name: "ITW Mountain Homestay",
    dest: "Himachal Pradesh",
    loc: "Keylong",
    cat: "Homestay",
    lat: 32.5714,
    lon: 77.0301,
    img: "./ITW/itw_mountain_homestay_keylong.png",
    gallery: [
      "./properties/mountain-homestay/img_1.webp",
      "./properties/mountain-homestay/img_2.webp",
      "./properties/mountain-homestay/img_3.webp",
      "./properties/mountain-homestay/img_4.webp",
      "./properties/mountain-homestay/img_5.webp",
      "./properties/mountain-homestay/img_6.jpg",
      "./properties/mountain-homestay/img_7.jpg",
      "./properties/mountain-homestay/img_8.jpg",
      "./properties/mountain-homestay/img_9.jpg",
      "./properties/mountain-homestay/img_10.webp",
      "./properties/mountain-homestay/img_11.jpeg",
      "./properties/mountain-homestay/img_12.jpeg",
      "./properties/mountain-homestay/img_13.jpeg",
      "./properties/mountain-homestay/img_14.jpeg"
    ],
    quote: "Authentic Himalayan lifestyle facing the Kardang Monastery.",
    about: "Authentic Himalayan hospitality with panoramic mountain views. Experience Lahauli warmth, home-cooked local meals, and rooms looking directly out over the Kardang Monastery Ridge. A home deep in the mountains.",
    amenities: ["Monastery Views", "Traditional Bukhari Heater", "Lahauli Home Kitchen", "Library", "Warm Blankets", "Tea Room", "Rooftop Terrace"],
    experiences: ["Monastery Walk", "Weaving Workshops", "Traditional Tea Curation", "Glacier Hikes", "Lahauli Language Intro"],
    nearby: ["Kardang Monastery", "Shashur Monastery", "Tandi Confluence", "Tayul Monastery"],
    locationDesc: "Keylong, Lahaul Valley, Himachal Pradesh. Set overlooking the Kardang Monastery.",
    services: ["Airport Transfers", "Bus Assistance", "Local Food Experiences", "Photography Tours", "Village Walks", "Prayer Flags Workshop"],
    reviews: [
      { guest: "Siddharth J.", text: "The homestay felt like visiting family. The Lahauli food was pure soul food.", rating: "5/5" },
      { guest: "Nisha K.", text: "Views of the monastery in the morning are breath-taking. Deeply peaceful.", rating: "5/5" }
    ],
    rooms: [
      {
        name: "Monastery View Room",
        occupancy: "2 Guests",
        inclusions: "Traditional Home Breakfast, Guided Monastery Stroll",
        img: "./properties/mountain-homestay/img_1.webp"
      },
      {
        name: "High-Altitude Attic Suite",
        occupancy: "2 Guests",
        inclusions: "Traditional Bukhari Setup, Local Herbal Teas, Home Cooked Dinners",
        img: "./properties/mountain-homestay/img_3.webp"
      }
    ]
  },
  "forest-cottages": {
    name: "ITW Forest Cottages",
    dest: "Himachal Pradesh",
    loc: "Jibhi",
    cat: "Forest Cottages",
    lat: 31.6372,
    lon: 77.3323,
    img: "./properties/forest-cottages/hero.avif",
    gallery: [
      "./properties/forest-cottages/img_1.jpeg",
      "./properties/forest-cottages/img_2.jpeg",
      "./properties/forest-cottages/img_3.jpeg",
      "./properties/forest-cottages/img_4.jpeg",
      "./properties/forest-cottages/img_5.jpeg",
      "./properties/forest-cottages/img_6.jpeg",
      "./properties/forest-cottages/img_7.jpeg",
      "./properties/forest-cottages/img_8.jpeg",
      "./properties/forest-cottages/img_9.jpeg"
    ],
    quote: "Cozy duplex stone cabins built deep inside pine woods.",
    about: "Duplex forest cottages nestled among cedar trees in the Tirthan Valley. Built using local stone and cedar-wood, these properties offer ultimate comfort in the heart of nature.",
    amenities: ["Private Balcony", "Cedar Wood Interiors", "Local Himachali Kitchen", "Wi-Fi Access", "Hammock Area", "Fireplace"],
    experiences: ["Pine Forest Walks", "Waterfall Trekking", "Angling in Tirthan River", "Campfire Music"],
    nearby: ["Jibhi Waterfall", "Jalori Pass", "Serolsar Lake"],
    locationDesc: "Jibhi, Tirthan Valley, Himachal Pradesh. Nestled in a private cedar pine forest.",
    services: ["Airport Transfers", "Private Cabs", "Hiking Trails", "Bonfire", "Village Walks"],
    reviews: [
      { guest: "Pooja V.", text: "A fairytale cabin in the woods. Hearing the pine leaves rustling all day was pure meditation.", rating: "5/5" },
      { guest: "Dev A.", text: "Excellent cedar cabin. Clean, cozy, and beautifully isolated in the forest.", rating: "5/5" }
    ],
    rooms: [
      {
        name: "Duplex Cedar Cottage",
        occupancy: "3 Guests",
        inclusions: "Gourmet Breakfast, Forest Trail Guide",
        img: "./properties/forest-cottages/img_1.jpeg"
      },
      {
        name: "Forest Ridge Suite",
        occupancy: "2 Guests",
        inclusions: "Organic Breakfast, Riverside Walk Guided Tour",
        img: "./properties/forest-cottages/img_3.jpeg"
      }
    ]
  },
  "luxury-tree-house": {
    name: "ITW Luxury Tree House",
    dest: "Himachal Pradesh",
    loc: "Jibhi",
    cat: "Luxury Tree House",
    lat: 31.6372,
    lon: 77.3323,
    img: "./properties/luxury-tree-house/hero.avif",
    gallery: [
      "./properties/luxury-tree-house/img_1.jpeg",
      "./properties/luxury-tree-house/img_2.jpeg",
      "./properties/luxury-tree-house/img_3.jpeg",
      "./properties/luxury-tree-house/img_4.jpeg",
      "./properties/luxury-tree-house/img_5.jpeg",
      "./properties/luxury-tree-house/img_6.jpeg",
      "./properties/luxury-tree-house/img_7.jpeg",
      "./properties/luxury-tree-house/img_8.jpeg",
      "./properties/luxury-tree-house/img_9.jpeg"
    ],
    quote: "Live above the canopy in a high-elevation jacuzzi deck.",
    about: "Luxury tree house with jacuzzi and panoramic forest views. Hover above the pine canopy in a beautifully engineered wooden tree house featuring floor-to-ceiling glass panes and quiet luxury.",
    amenities: ["Private Jacuzzi", "Panoramic Deck", "Cedar Wood Bathtub", "Minibar", "Ambient Light System", "Wi-Fi Access"],
    experiences: ["Canopy Walks", "Stargazing from Jacuzzi", "Forest Birding Trails", "Private BBQ on Deck"],
    nearby: ["Jalori Pass", "Choi Waterfall", "Great Himalayan National Park"],
    locationDesc: "Jibhi, Tirthan Valley, Himachal Pradesh. Suspended in a pine forest canopy.",
    services: ["Airport Transfers", "Private Cabs", "Bonfire", "Photography Tours", "Celebration Planning"],
    reviews: [
      { guest: "Aashna S.", text: "Soaking in the private jacuzzi overlooking the snow peaks was the highlight of our year.", rating: "5/5" },
      { guest: "Neil F.", text: "Unrivalled luxury. The treehouse design is modern, warm, and extremely premium.", rating: "5/5" }
    ],
    rooms: [
      {
        name: "Canopy Jacuzzi Suite",
        occupancy: "2 Guests",
        inclusions: "Continental Breakfast, Private BBQ Setup on Deck",
        img: "./properties/luxury-tree-house/img_1.jpeg"
      },
      {
        name: "Pine Forest Loft",
        occupancy: "2 Guests",
        inclusions: "Continental Breakfast, Stargazing Telescope Use",
        img: "./properties/luxury-tree-house/img_3.jpeg"
      }
    ]
  },
  "frontier-camp": {
    name: "ITW Frontier Camp",
    dest: "Ladakh",
    loc: "Tyakshi, Turtuk",
    cat: "Luxury Camp",
    lat: 34.8451,
    lon: 76.8338,
    img: "./ITW/itw_frontier_camp.png",
    gallery: [
      "./properties/frontier-camp/img_1.jpeg",
      "./properties/frontier-camp/img_2.jpeg",
      "./properties/frontier-camp/img_3.jpeg",
      "./properties/frontier-camp/img_4.jpeg",
      "./properties/frontier-camp/img_5.jpeg"
    ],
    quote: "A luxury dome outpost nestled on the edge of the Shyok River.",
    about: "Premium Himalayan camping in Turtuk's unforgettable border landscape. Wake up to towering granite walls, organic apricot orchards, and the serene flow of the Shyok River.",
    amenities: ["Insulated Glamping Dome", "Riverfront Seating", "Organic Apricot Garden Access", "Himalayan Herbal Baths", "Star Gazing Deck", "Traditional Floor Seating", "Bukhari Heaters"],
    experiences: ["Balti Village Walk", "Border Outpost Cycling", "Shyok River Trails", "Balti Culinary Curation", "Turtuk Monastery Hike"],
    nearby: ["Turtuk Museum", "Line of Control Border Point", "Hunder Sand Dunes", "Yagshoor Historic Fort"],
    locationDesc: "Tyakshi, Turtuk, Ladakh. Situated in the northernmost border valley.",
    services: ["Airport Transfers", "Private Cabs", "Guided Treks", "Camping", "Bonfire", "Photography Tours", "Local Language Translation Guide"],
    reviews: [
      { guest: "Pritam D.", text: "Glamping in a dome facing the Shyok River was amazing. Balti dinners were fantastic.", rating: "5/5" },
      { guest: "Zoya H.", text: "Incredibly remote, but with all the comforts of a five-star stay. Unforgettable.", rating: "5/5" }
    ],
    rooms: [
      {
        name: "Frontier Glamping Dome",
        occupancy: "2 Guests",
        inclusions: "Traditional Buffet Breakfast & Dinner, Guided border trail stroll",
        img: "./properties/frontier-camp/img_1.jpeg"
      },
      {
        name: "Shyok Riverfront Dome",
        occupancy: "2 Guests",
        inclusions: "Traditional Buffet Breakfast & Dinner, Balti Culinary Curation Experience",
        img: "./properties/frontier-camp/img_3.jpeg"
      }
    ]
  },
  "mountain-huts": {
    name: "ITW Mountain Huts",
    dest: "Uttarakhand",
    loc: "Viratkhai",
    cat: "Mountain Huts",
    lat: 30.6139,
    lon: 77.9042,
    img: "./ITW/itw_mountain_huts_viratkhai.png",
    gallery: [
      "./properties/mountain-huts/img_1.jpg",
      "./properties/mountain-huts/img_2.jpeg",
      "./properties/mountain-huts/img_3.jpeg",
      "./properties/mountain-huts/img_4.jpeg",
      "./properties/mountain-huts/img_5.jpeg",
      "./properties/mountain-huts/img_6.jpeg",
      "./properties/mountain-huts/img_7.jpeg",
      "./properties/mountain-huts/img_8.jpeg",
      "./properties/mountain-huts/img_9.jpeg",
      "./properties/mountain-huts/img_10.jpeg"
    ],
    quote: "Wake up above the clouds inside an ancient oak woodland.",
    about: "Scenic mountain retreat surrounded by forests and Himalayan views. Built using local stone and wood, these huts offer panoramic Himalayan valley views and deep quietude.",
    amenities: ["Wood Fireplace", "Stargazing Deck", "Local Garhwali Buffet", "Hot Showers", "Wi-Fi Access", "Nature Trails", "Trekking Gear Provision"],
    experiences: ["Oak Forest Trails", "Valley Birding", "Charcoal Bukhari Evenings", "Millet Bread Baking", "Ancient Caves Visit"],
    nearby: ["Tiger Falls", "Chakrata Market", "Budher Caves", "Kanasar Forest Lodge"],
    locationDesc: "Viratkhai, Uttarakhand. Perched at 8,100 feet on the boundary ridge.",
    services: ["Airport Transfers", "Private Cabs", "Guided Treks", "Hiking Trails", "Bonfire", "Mountain Climbing Orientation"],
    reviews: [
      { guest: "Karan T.", text: "The views of the snow peaks are completely unobstructed. Bukhari heaters are wonderful.", rating: "5/5" },
      { guest: "Aditi G.", text: "Perfect wilderness getaway. The oak forest walks were peaceful and quiet.", rating: "5/5" }
    ],
    rooms: [
      {
        name: "Deodar Valley Hut",
        occupancy: "2 Guests",
        inclusions: "Gourmet Breakfast, Forest walk, Telescope Session",
        img: "./properties/mountain-huts/img_1.jpg"
      },
      {
        name: "Ridge View Stone Cabin",
        occupancy: "2 Guests",
        inclusions: "Gourmet Breakfast, Bukhari Heater Setup, Private Guide",
        img: "./properties/mountain-huts/img_3.jpeg"
      }
    ]
  },
  "camp-huts": {
    name: "ITW Camp & Huts",
    dest: "Uttarakhand",
    loc: "Viratkhai",
    cat: "Camp & Huts",
    lat: 30.6139,
    lon: 77.9042,
    img: "./ITW/itw_huts_camp_viratkhai.png",
    gallery: [
      "./properties/camp-huts/img_1.avif",
      "./properties/camp-huts/img_2.jpg",
      "./properties/camp-huts/img_3.jpg",
      "./properties/camp-huts/img_4.jpeg",
      "./properties/camp-huts/img_5.jpeg",
      "./properties/camp-huts/img_6.jpeg",
      "./properties/camp-huts/img_7.jpeg"
    ],
    quote: "Dwell under the stars, surrounded by high altitude ridges.",
    about: "Luxury camps and hillside huts in the heart of nature. Ideal for adventure seekers scaling the high ridges of Chakrata, surrounded by deodar and rhododendron woods.",
    amenities: ["Insulated Camps", "Woodfire Pit", "Hot Herbal Teas", "Warm Bedding", "Cozy Mud Room", "Outdoor Hammocks", "Shower Blocks"],
    experiences: ["Ridge Treks", "Milking Local Cows", "Stargazing Circles", "Local Harvest Picnic"],
    nearby: ["Tiger Falls", "Kanasar Forest Lodge", "Deoban Views", "Kailas Temple"],
    locationDesc: "Viratkhai, Uttarakhand. Set on a panoramic hillside ridge.",
    services: ["Airport Transfers", "Private Cabs", "Camping", "Bonfire", "Adventure Activities", "Outdoor Archery Curation"],
    reviews: [
      { guest: "Rahul S.", text: "Great camps, very warm sleeping bags, and amazing stargazing circles.", rating: "5/5" },
      { guest: "Tanya M.", text: "Incredibly peaceful hillside location. Perfect for digital detox.", rating: "5/5" }
    ],
    rooms: [
      {
        name: "Ridge Camp Hut",
        occupancy: "2 Guests",
        inclusions: "All meals included, Guided sunset ridge trek",
        img: "./properties/camp-huts/img_1.jpg"
      },
      {
        name: "High Forest Safari Tent",
        occupancy: "2 Guests",
        inclusions: "All meals included, Stargazing Circle Curation",
        img: "./properties/camp-huts/img_3.jpeg"
      }
    ]
  }
};

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
          Book Your Stay
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

  const customizeTrigger = document.getElementById('prop-customize-trigger');
  if (customizeTrigger) {
    customizeTrigger.addEventListener('click', () => {
      const msg = `Hi ITW Team, I am interested in customizing my stay at ${data.name}. I would like to enquire about: ${data.services.join(', ')}.`;
      window.open(`https://wa.me/919999999999?text=${encodeURIComponent(msg)}`, '_blank');
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
          <span class="choice-meta">4 stays</span>
        </div>
        <div class="choice-item ${bookingState.dest === 'Uttarakhand' ? 'selected' : ''}" data-val="Uttarakhand">
          <span class="choice-label">Uttarakhand</span>
          <span class="choice-meta">3 stays</span>
        </div>
        <div class="choice-item ${bookingState.dest === 'Ladakh' ? 'selected' : ''}" data-val="Ladakh">
          <span class="choice-label">Ladakh</span>
          <span class="choice-meta">1 stay</span>
        </div>
      </div>
    `;
    navButtonsHtml = ""; // Auto-advance on click!
  } 
  
  else if (step === 2) {
    // Choose Property
    const destinationProperties = Object.keys(propertiesDb).filter(slug => {
      return propertiesDb[slug].dest === bookingState.dest;
    });
    
    stepContent = `
      <span class="step-indicator">Step 2 of 6</span>
      <h3 class="step-question">Select your mountain dwell</h3>
      <div class="booking-choice-list">
        ${destinationProperties.map(slug => `
          <div class="choice-item ${bookingState.propertySlug === slug ? 'selected' : ''}" data-val="${slug}">
            <span class="choice-label">${propertiesDb[slug].name}</span>
            <span class="choice-meta">${propertiesDb[slug].loc}</span>
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
            <span class="choice-meta">Pricing: By Enquiry</span>
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
                    <span class="result-price-label">Pricing</span>
                    <span class="result-price-val" style="font-size: 0.95rem; letter-spacing: 0.05em; text-transform: uppercase; color: var(--color-copper);">By Enquiry</span>
                  </div>
                  <button class="result-cta-btn" data-room="${room.name}">Get Bespoke Quote</button>
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
