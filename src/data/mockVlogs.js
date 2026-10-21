export const CATEGORIES = [
  "All",
  "Travel",
  "Tech & Coding",
  "Lifestyle",
  "Cinematography",
  "Food & Culinary",
  "Gaming",
  "Fitness",
  "Music"
];

export const SUBSCRIBED_CREATORS = [
  {
    id: "c1",
    name: "Elena Rostova",
    handle: "@elenarostova",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    subscribers: "1.24M",
    verified: true,
    isLive: false,
    hasNewUpload: true
  },
  {
    id: "c2",
    name: "Devon Vance",
    handle: "@devoncodes",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    subscribers: "680K",
    verified: true,
    isLive: true,
    hasNewUpload: false
  },
  {
    id: "c3",
    name: "Maya Chen",
    handle: "@mayachen",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    subscribers: "920K",
    verified: true,
    isLive: false,
    hasNewUpload: true
  },
  {
    id: "c4",
    name: "Kai Tanaka",
    handle: "@kaitanaka",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    subscribers: "450K",
    verified: false,
    isLive: false,
    hasNewUpload: false
  },
  {
    id: "c5",
    name: "Marcus Sterling",
    handle: "@marcuscreates",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
    subscribers: "2.1M",
    verified: true,
    isLive: false,
    hasNewUpload: true
  }
];

export const INITIAL_VLOGS = [
  {
    id: "vlog-1",
    title: "Tokyo at 4 AM: Lost in the Rainy Neon Alleys of Shinjuku (Cinematic Walk)",
    description: "Wandering through the glowing rain-drenched backstreets of Tokyo before the city awakens. Shot on Sony FX3 with the 35mm f/1.4 GM lens. Headphones recommended for authentic binaural street sound design.\n\nTimestamps:\n0:00 - Introduction & Shibuya Crossing\n3:20 - Shinjuku Omoide Yokocho\n8:45 - 24hr Ramen Haven\n14:10 - Sunrise over Kabukicho",
    category: "Travel",
    thumbnail: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: "18:42",
    is4K: true,
    views: 1420000,
    formattedViews: "1.4M views",
    uploadedAt: "2 days ago",
    likes: 89400,
    tags: ["Tokyo", "Japan", "Cinematic", "NightWalk", "4K"],
    creator: {
      name: "Kai Tanaka",
      handle: "@kaitanaka",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      subscribers: "450K",
      verified: true
    },
    comments: [
      {
        id: "c-101",
        user: "Sarah Jenkins",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
        text: "The audio mastering at 06:15 is unreal. Felt like rain was tapping right against my own window!",
        likes: 1420,
        time: "1 day ago"
      },
      {
        id: "c-102",
        user: "Kenji Sato",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80",
        text: "Seeing Tokyo this quiet brings back so many childhood memories. Outstanding color grading.",
        likes: 856,
        time: "18 hours ago"
      }
    ]
  },
  {
    id: "vlog-2",
    title: "How I Built a Profitable Full-Stack AI SaaS in 7 Days (Architecture & Code)",
    description: "Step-by-step breakdown of how I planned, designed, coded, and launched an AI productivity app in one week. We dive into React 19, Node.js microservices, Tailwind CSS, vector embeddings, and MongoDB indexing strategies.\n\nAll source code is available in the GitHub repository linked below.",
    category: "Tech & Coding",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    duration: "24:15",
    is4K: true,
    views: 685000,
    formattedViews: "685K views",
    uploadedAt: "4 days ago",
    likes: 54100,
    tags: ["React", "NodeJS", "FullStack", "WebDev", "SaaS"],
    creator: {
      name: "Devon Vance",
      handle: "@devoncodes",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      subscribers: "680K",
      verified: true
    },
    comments: [
      {
        id: "c-201",
        user: "Liam O'Connor",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
        text: "Best explanation of vector embeddings and MongoDB pipeline indexing I've seen all year. Concise and directly applicable.",
        likes: 910,
        time: "3 days ago"
      }
    ]
  },
  {
    id: "vlog-3",
    title: "A Slow Sunday in Kyoto: Matcha Ceremonies, Bamboo Groves & Mindful Living",
    description: "Escape the noise with me as we spend a quiet morning in Arashiyama, preparing ceremonial grade matcha, sketching stone gardens, and exploring the timeless rhythm of Kyoto temple life.",
    category: "Lifestyle",
    thumbnail: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: "14:38",
    is4K: true,
    views: 890000,
    formattedViews: "890K views",
    uploadedAt: "1 week ago",
    likes: 62000,
    tags: ["Kyoto", "Mindfulness", "SlowLiving", "JapanVlog", "Aesthetics"],
    creator: {
      name: "Maya Chen",
      handle: "@mayachen",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      subscribers: "920K",
      verified: true
    },
    comments: [
      {
        id: "c-301",
        user: "Chloe Martin",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
        text: "Your videos are literally digital therapy. Thank you for this peaceful moment.",
        likes: 1240,
        time: "5 days ago"
      }
    ]
  },
  {
    id: "vlog-4",
    title: "Mastering the 72-Hour Neapolitan Pizza Dough from Scratch (Wood-Fired Masterclass)",
    description: "Deep dive into hydration ratios, cold fermentation chemistry, and oven heat management. From sourcing San Marzano tomatoes and fior di latte mozzarella to achieving blistered leopard crust perfection.",
    category: "Food & Culinary",
    thumbnail: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    duration: "21:05",
    is4K: true,
    views: 1100000,
    formattedViews: "1.1M views",
    uploadedAt: "5 days ago",
    likes: 98500,
    tags: ["Pizza", "Baking", "CookingMasterclass", "Foodie", "ItalianFood"],
    creator: {
      name: "Marcus Sterling",
      handle: "@marcuscreates",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
      subscribers: "2.1M",
      verified: true
    },
    comments: [
      {
        id: "c-401",
        user: "Marco Rossi",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
        text: "As an Italian, I approve this technique! The hydration level is spot-on.",
        likes: 3100,
        time: "4 days ago"
      }
    ]
  },
  {
    id: "vlog-5",
    title: "Solo Expedition Across the Swiss Alps: Surviving 50km on Ridge Trails",
    description: "Hiking through the Bernese Oberland above 2,500m elevation. Incredible alpine views, unpredictable glacial storms, and mountain hut living. Everything I packed in my 35L ultra-light pack.",
    category: "Travel",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    duration: "31:12",
    is4K: true,
    views: 2400000,
    formattedViews: "2.4M views",
    uploadedAt: "2 weeks ago",
    likes: 184000,
    tags: ["Switzerland", "Hiking", "Alps", "Adventure", "Nature"],
    creator: {
      name: "Elena Rostova",
      handle: "@elenarostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      subscribers: "1.24M",
      verified: true
    },
    comments: []
  },
  {
    id: "vlog-6",
    title: "My Ultimate Minimalist Desk Setup 2026: Productivity, Coding & Creator Workflow",
    description: "A tour of my refined workspace engineered for zero friction. Custom solid walnut standing desk, single cable Thunderbolt 5 docking, studio acoustic treatment, and mechanical keyboard sound tests.",
    category: "Tech & Coding",
    thumbnail: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
    duration: "16:20",
    is4K: false,
    views: 450000,
    formattedViews: "450K views",
    uploadedAt: "3 days ago",
    likes: 38000,
    tags: ["DeskSetup", "Productivity", "TechWorkspace", "WorkspaceInspo"],
    creator: {
      name: "Devon Vance",
      handle: "@devoncodes",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      subscribers: "680K",
      verified: true
    },
    comments: []
  },
  {
    id: "vlog-7",
    title: "Cinematic Lighting on a Budget: 3 Setups You Can Replicate for Under $100",
    description: "You don't need a $10,000 Arri kit to make your video look like an indie cinema feature. In this breakdown, we use practical bounce boards, negative fill, and household bulbs with diffusion gel.",
    category: "Cinematography",
    thumbnail: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    duration: "13:54",
    is4K: true,
    views: 310000,
    formattedViews: "310K views",
    uploadedAt: "6 days ago",
    likes: 29500,
    tags: ["Filmmaking", "Lighting", "Cinematography", "CameraGear", "ColorGrading"],
    creator: {
      name: "Marcus Sterling",
      handle: "@marcuscreates",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
      subscribers: "2.1M",
      verified: true
    },
    comments: []
  },
  {
    id: "vlog-8",
    title: "10-Minute Morning Mobility & Core Routine (Scientifically Proven for Posture)",
    description: "Follow along with this zero-equipment daily morning mobility protocol designed by physical therapists to counteract prolonged desk sitting, relieve lower back tightness, and energize your focus.",
    category: "Fitness",
    thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    duration: "10:15",
    is4K: true,
    views: 520000,
    formattedViews: "520K views",
    uploadedAt: "1 day ago",
    likes: 47000,
    tags: ["Mobility", "Fitness", "Workout", "HealthyHabits", "Posture"],
    creator: {
      name: "Elena Rostova",
      handle: "@elenarostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      subscribers: "1.24M",
      verified: true
    },
    comments: []
  },
  {
    id: "vlog-9",
    title: "Lo-Fi Beats Live Studio Session: Sampling Vintage Vinyl & Rhodes Piano",
    description: "Spend 20 minutes in the studio creating a warm nostalgic beat from scratch. We chop obscure 1970s Japanese jazz records, run drum machines through an analog reel-to-reel tape emulator, and add lush tape delay.",
    category: "Music",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4",
    duration: "22:40",
    is4K: false,
    views: 395000,
    formattedViews: "395K views",
    uploadedAt: "1 week ago",
    likes: 31200,
    tags: ["MusicProduction", "LoFi", "Beatmaking", "StudioVlog", "Vinyl"],
    creator: {
      name: "Kai Tanaka",
      handle: "@kaitanaka",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      subscribers: "450K",
      verified: false
    },
    comments: []
  },
  {
    id: "vlog-10",
    title: "The Reality of Living in an Off-Grid Scandinavian Forest Cabin in Winter",
    description: "Chopping firewood, monitoring 24V solar battery reserves under negative 15°C temperatures, baking sourdough bread in a cast iron wood stove, and finding peace in solitary Scandinavian silence.",
    category: "Lifestyle",
    thumbnail: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    duration: "27:18",
    is4K: true,
    views: 1850000,
    formattedViews: "1.8M views",
    uploadedAt: "3 weeks ago",
    likes: 142000,
    tags: ["CabinLife", "OffGrid", "Winter", "Nordic", "CozyVibes"],
    creator: {
      name: "Maya Chen",
      handle: "@mayachen",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      subscribers: "920K",
      verified: true
    },
    comments: []
  },
  {
    id: "vlog-11",
    title: "Building a Custom Retro Arcade Machine from Raw Oak & Raspberry Pi 5",
    description: "Complete woodworking, laser cutting acrylic marquees, wiring Sanwa arcade joysticks with zero-delay USB encoders, and configuring CRT shader emulation for true 90s nostalgia.",
    category: "Gaming",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    duration: "19:02",
    is4K: false,
    views: 410000,
    formattedViews: "410K views",
    uploadedAt: "4 days ago",
    likes: 36500,
    tags: ["Arcade", "DIY", "Gaming", "RaspberryPi", "Woodworking"],
    creator: {
      name: "Devon Vance",
      handle: "@devoncodes",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      subscribers: "680K",
      verified: true
    },
    comments: []
  },
  {
    id: "vlog-12",
    title: "Street Food Crawl Through Bangkok's Chinatown (Michelin Bib Gourmand Spots)",
    description: "Hunting down the crispiest pork belly, spicy crab omelets, charcoal-toasted buns, and aromatic pepper broth noodles in Yaowarat Road. Full English & Thai addresses included.",
    category: "Food & Culinary",
    thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
    duration: "15:45",
    is4K: true,
    views: 940000,
    formattedViews: "940K views",
    uploadedAt: "1 week ago",
    likes: 71000,
    tags: ["Bangkok", "StreetFood", "ThailandVlog", "FoodCrawl", "Culinary"],
    creator: {
      name: "Marcus Sterling",
      handle: "@marcuscreates",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
      subscribers: "2.1M",
      verified: true
    },
    comments: []
  }
];

export const CURRENT_USER = {
  name: "Alex Rivera",
  handle: "@alexrivera",
  email: "alex.rivera@vlogsphere.io",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  subscribers: "128K",
  role: "Pro Creator",
  notifications: [
    {
      id: "n1",
      title: "Elena Rostova uploaded a new vlog",
      description: "Solo Expedition Across the Swiss Alps is now live in 4K.",
      time: "2 hours ago",
      read: false,
      thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=120&q=80"
    },
    {
      id: "n2",
      title: "Your vlog reached 50,000 views!",
      description: "‘Mastering React Architecture’ is trending in Tech.",
      time: "5 hours ago",
      read: false,
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=120&q=80"
    },
    {
      id: "n3",
      title: "Devon Vance liked your comment",
      description: "'Spot on with the indexing pipeline strategy!'",
      time: "1 day ago",
      read: true,
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
    }
  ]
};
