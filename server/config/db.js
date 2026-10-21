import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.warn('⚠️ [MongoDB Atlas] MONGO_URI is not defined in server/.env.');
    console.warn('   Please set your MongoDB Atlas connection string in server/.env.');
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    const isAtlas = conn.connection.host.includes('mongodb.net');
    console.log(`✅ [MongoDB ${isAtlas ? 'Atlas' : 'Local'}] Connected to Database: "${conn.connection.name}"`);
    console.log(`   Host: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ [MongoDB Connection Warning]: ${error.message}`);
    console.warn('   Tips for MongoDB Atlas:');
    console.warn('   1. Verify your IP is added to Atlas Network Access (0.0.0.0/0 or current IP).');
    console.warn('   2. Verify username and password in MONGO_URI in server/.env.');
    console.warn('   (The Express server will still run and serve dual-mode endpoints)');
  }
};

// Connection event listeners
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ [MongoDB Atlas] Lost database connection.');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 [MongoDB Atlas] Reconnected successfully.');
});

export default connectDB;
