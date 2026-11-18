import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.warn('⚠️ [MongoDB Atlas] MONGO_URI is not defined in server/.env.');
    console.warn('   Please set your MongoDB Atlas connection string in server/.env.');
    return;
  }

  if (uri.includes('<db_password>') || uri.includes('<password>')) {
    console.warn('--------------------------------------------------------------------------------');
    console.warn('⚠️ [MongoDB Atlas Action Required]');
    console.warn('   Your MONGO_URI in server/.env contains the placeholder "<db_password>".');
    console.warn('   Please replace "<db_password>" with your actual MongoDB Atlas database user password.');
    console.warn('--------------------------------------------------------------------------------');
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
    console.warn(`⚠️ [MongoDB Connection Notice]: ${error.message}`);
    console.warn('   Tips for MongoDB Atlas:');
    console.warn('   1. Verify your IP is added to Atlas Network Access (0.0.0.0/0 or current IP).');
    console.warn('   2. Replace <db_password> with your actual database user password in server/.env.');
    console.warn('   3. Verify database user privileges in Atlas Database Access (readWriteAnyDatabase).');
  }
};

// Connection event listeners
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ [MongoDB Atlas] Database connection lost.');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 [MongoDB Atlas] Reconnected successfully.');
});

export default connectDB;
