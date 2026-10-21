import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Video from './models/Video.js';
import Comment from './models/Comment.js';
import Subscription from './models/Subscription.js';

dotenv.config();

const sampleCreators = [
  {
    name: 'Alex Rivera',
    handle: '@alexrivera',
    email: 'alex.rivera@vlogsphere.io',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    bio: 'Senior full-stack creator & filmmaker exploring modern software and cinematography.',
    role: 'Pro Creator',
    verified: true,
  },
  {
    name: 'Elena Rostova',
    handle: '@elenarostova',
    email: 'elena@vlogsphere.io',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
    bio: 'Alpine expeditions and solo high-altitude ridge treks filmed in 4K 60FPS.',
    role: 'Pro Creator',
    verified: true,
  },
  {
    name: 'Devon Vance',
    handle: '@devoncodes',
    email: 'devon@vlogsphere.io',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1600&q=80',
    bio: 'Full-stack developer building AI microservices and documenting desk setups.',
    role: 'Creator',
    verified: true,
  },
  {
    name: 'Maya Chen',
    handle: '@mayachen',
    email: 'maya@vlogsphere.io',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80',
    bio: 'Slow Sunday aesthetic vlogs, Japanese tea rituals, and Scandinavian cabin life.',
    role: 'Creator',
    verified: true,
  },
];

const sampleVlogs = [
  {
    title: 'Tokyo at 4 AM: Lost in the Rainy Neon Alleys of Shinjuku (Cinematic Walk)',
    description: 'Wandering through the glowing rain-drenched backstreets of Tokyo before the city awakens. Shot on Sony FX3 with the 35mm f/1.4 GM lens.',
    category: 'Travel',
    thumbnail: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: '18:42',
    is4K: true,
    views: 1420000,
    tags: ['Tokyo', 'Japan', 'Cinematic', 'NightWalk', '4K'],
  },
  {
    title: 'How I Built a Profitable Full-Stack AI SaaS in 7 Days (Architecture & Code)',
    description: 'Step-by-step breakdown of how I planned, designed, coded, and launched an AI productivity app in one week using React, Node.js, and MongoDB.',
    category: 'Tech & Coding',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: '24:15',
    is4K: true,
    views: 685000,
    tags: ['React', 'NodeJS', 'FullStack', 'WebDev', 'SaaS'],
  },
  {
    title: 'A Slow Sunday in Kyoto: Matcha Ceremonies, Bamboo Groves & Mindful Living',
    description: 'Escape the noise with me as we spend a quiet morning in Arashiyama, preparing ceremonial grade matcha, sketching stone gardens, and exploring Kyoto temple life.',
    category: 'Lifestyle',
    thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '14:38',
    is4K: true,
    views: 890000,
    tags: ['Kyoto', 'Mindfulness', 'SlowLiving', 'JapanVlog'],
  },
  {
    title: 'Solo Expedition Across the Swiss Alps: Surviving 50km on Ridge Trails',
    description: 'Hiking through the Bernese Oberland above 2,500m elevation. Incredible alpine views, unpredictable glacial storms, and mountain hut living.',
    category: 'Travel',
    thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration: '31:12',
    is4K: true,
    views: 2400000,
    tags: ['Switzerland', 'Hiking', 'Alps', 'Adventure', 'Nature'],
  },
];

const seedData = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vlogsphere';
    console.log(`Connecting to MongoDB Atlas at: ${uri.replace(/:([^@]+)@/, ':****@')}...`);
    await mongoose.connect(uri);

    console.log('Clearing existing collections...');
    await Promise.all([
      User.deleteMany(),
      Video.deleteMany(),
      Comment.deleteMany(),
      Subscription.deleteMany(),
    ]);

    console.log('Seeding creator profiles...');
    const createdUsers = await User.create(sampleCreators);

    console.log('Seeding subscriptions between creators...');
    await Subscription.create([
      { subscriber: createdUsers[0]._id, channel: createdUsers[1]._id },
      { subscriber: createdUsers[0]._id, channel: createdUsers[2]._id },
      { subscriber: createdUsers[0]._id, channel: createdUsers[3]._id },
      { subscriber: createdUsers[1]._id, channel: createdUsers[0]._id },
      { subscriber: createdUsers[2]._id, channel: createdUsers[0]._id },
    ]);

    console.log('Seeding vlogs...');
    const vlogsWithCreators = sampleVlogs.map((vlog, idx) => ({
      ...vlog,
      creator: createdUsers[idx % createdUsers.length]._id,
    }));
    const createdVideos = await Video.create(vlogsWithCreators);

    console.log('Seeding comments...');
    await Comment.create([
      {
        text: 'The binaural sound design in the rain sequence at 06:15 is world-class.',
        user: createdUsers[0]._id,
        video: createdVideos[0]._id,
        likes: 42,
      },
      {
        text: 'Clean architecture breakdown. Implementing MongoDB compound indexes right now!',
        user: createdUsers[1]._id,
        video: createdVideos[1]._id,
        likes: 19,
      },
    ]);

    console.log('🎉 MongoDB Atlas successfully seeded with users, subscriptions, videos, and comments!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database seed error:', error.message);
    process.exit(1);
  }
};

seedData();
