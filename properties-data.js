// ITW Single Source of Truth: Properties Database
export const propertiesDb = {
  "luxury-farm-stay": {
    name: "ITW Luxury Farm Stay",
    dest: "Uttarakhand",
    loc: "Horrawala, Dehradun",
    cat: "Farm Stay",
    lat: 30.3165,
    lon: 78.0322,
    img: "./ITW/itw_luxury_farm_stay.png",
    gallery: [
      "./properties/luxury-farm-stay/pool-villa-loungers.webp",
      "./properties/luxury-farm-stay/stone-cottage-porch.webp",
      "./properties/luxury-farm-stay/veranda-coffee-terrace.webp",
      "./properties/luxury-farm-stay/estate-twilight-villa.webp",
      "./properties/luxury-farm-stay/teak-bedroom-suite.webp",
      "./properties/luxury-farm-stay/duplex-loft-suite.webp",
      "./properties/luxury-farm-stay/attic-mezzanine-room.webp",
      "./properties/luxury-farm-stay/bedroom-garden-view.webp",
      "./properties/luxury-farm-stay/evening-bbq-bonfire.webp"
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
        img: "./properties/luxury-farm-stay/pool-villa-loungers.webp"
      },
      {
        name: "Heritage Orchard Suite",
        occupancy: "2 Guests",
        inclusions: "Organic Breakfast, Chef-led Fruit Baking Session, Orchard Walk",
        img: "./properties/luxury-farm-stay/teak-bedroom-suite.webp"
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
      "./properties/camp-cottages/snow-peaks-mountain-chalets.webp",
      "./properties/camp-cottages/red-chalets-prayer-flags.webp",
      "./properties/camp-cottages/chalets-lawn-guests.webp",
      "./properties/camp-cottages/deluxe-timber-suite.webp",
      "./properties/camp-cottages/cottage-stone-bedroom.webp",
      "./properties/camp-cottages/blue-chalets-alpine-lawn.webp",
      "./properties/camp-cottages/pine-cottage-bedroom.webp",
      "./properties/camp-cottages/baralacha-pass-travelers.webp",
      "./properties/camp-cottages/illuminated-chalets-night.webp"
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
        img: "./properties/camp-cottages/cottage-stone-bedroom.webp"
      },
      {
        name: "Luxury Riverside Dome",
        occupancy: "2 Guests",
        inclusions: "Gourmet Dinner & Breakfast, High-Altitude Stargazing Experience",
        img: "./properties/camp-cottages/deluxe-timber-suite.webp"
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
      "./properties/mountain-homestay/garden-cafe-canopy.webp",
      "./properties/mountain-homestay/rooftop-terrace-panoramic.webp",
      "./properties/mountain-homestay/valley-view-balcony.webp",
      "./properties/mountain-homestay/lahauli-attic-bedroom.webp",
      "./properties/mountain-homestay/homestay-pine-lounge.webp",
      "./properties/mountain-homestay/deluxe-bedroom-suite.webp"
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
        img: "./properties/mountain-homestay/lahauli-attic-bedroom.webp"
      },
      {
        name: "High-Altitude Attic Suite",
        occupancy: "2 Guests",
        inclusions: "Traditional Bukhari Setup, Local Herbal Teas, Home Cooked Dinners",
        img: "./properties/mountain-homestay/deluxe-bedroom-suite.webp"
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
      "./properties/forest-cottages/duplex-loft-stairs.webp",
      "./properties/forest-cottages/attic-loft-bedroom.webp",
      "./properties/forest-cottages/cedar-suite-bedroom.webp",
      "./properties/forest-cottages/forest-veranda-lounge.webp",
      "./properties/forest-cottages/pine-forest-veranda-view.webp",
      "./properties/forest-cottages/forest-sunburst-canopy.webp",
      "./properties/forest-cottages/forest-canopy-corridor.webp",
      "./properties/forest-cottages/loft-overlook-suite.webp"
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
        img: "./properties/forest-cottages/duplex-loft-stairs.webp"
      },
      {
        name: "Forest Ridge Suite",
        occupancy: "2 Guests",
        inclusions: "Organic Breakfast, Riverside Walk Guided Tour",
        img: "./properties/forest-cottages/attic-loft-bedroom.webp"
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
      "./properties/luxury-tree-house/tree-trunk-canopy-bedroom.webp",
      "./properties/luxury-tree-house/valley-view-balcony-deck.webp",
      "./properties/luxury-tree-house/cedar-loft-bedroom.webp",
      "./properties/luxury-tree-house/upper-balcony-canopy-lounge.webp",
      "./properties/luxury-tree-house/treehouse-duplex-staircase.webp",
      "./properties/luxury-tree-house/panoramic-mountain-window.webp",
      "./properties/luxury-tree-house/alpine-balcony-seating.webp",
      "./properties/luxury-tree-house/canopy-tree-craft-ornament.webp"
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
        img: "./properties/luxury-tree-house/tree-trunk-canopy-bedroom.webp"
      },
      {
        name: "Pine Forest Loft",
        occupancy: "2 Guests",
        inclusions: "Continental Breakfast, Stargazing Telescope Use",
        img: "./properties/luxury-tree-house/cedar-loft-bedroom.webp"
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
      "./properties/frontier-camp/luxury-glamping-tent-interior.webp",
      "./properties/frontier-camp/balti-majlis-communal-lounge.webp",
      "./properties/frontier-camp/camp-marigold-pathway.webp",
      "./properties/frontier-camp/illuminated-camp-night-pathway.webp",
      "./properties/frontier-camp/turtuk-camp-hospitality.webp"
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
        img: "./properties/frontier-camp/luxury-glamping-tent-interior.webp"
      },
      {
        name: "Shyok Riverfront Dome",
        occupancy: "2 Guests",
        inclusions: "Traditional Buffet Breakfast & Dinner, Balti Culinary Curation Experience",
        img: "./properties/frontier-camp/camp-marigold-pathway.webp"
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
          "./properties/mountain-huts/dining-pavilion.webp",
          "./properties/mountain-huts/img_2.jpeg",
          "./properties/mountain-huts/img_3.jpeg",
          "./properties/mountain-huts/img_4.jpeg",
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
          "./properties/camp-huts/stone-cottages-terrace.webp",
          "./properties/camp-huts/stone-pathway-gardens.webp",
          "./properties/camp-huts/img_4.jpeg",
          "./properties/camp-huts/img_5.jpeg"
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
        img: "./properties/camp-huts/stone-cottages-terrace.webp"
      },
      {
        name: "High Forest Safari Tent",
        occupancy: "2 Guests",
        inclusions: "All meals included, Stargazing Circle Curation",
        img: "./properties/camp-huts/img_3.jpeg"
      }
    ]
  }
};;

export const propertySlugs = Object.keys(propertiesDb);

export function getProperty(slug) {
  return propertiesDb[slug] || null;
}
