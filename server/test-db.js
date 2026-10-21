import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const testConnection = async () => {
  const uri = process.env.MONGO_URI;
  console.log('----------------------------------------------------');
  console.log('📡 Testing MongoDB Atlas Connection...');
  console.log('----------------------------------------------------');

  if (!uri || uri.includes('<password>') || uri.includes('cluster0.abcde')) {
    console.warn('⚠️  Your MONGO_URI in server/.env needs your actual Atlas credentials.');
    console.log('   Expected format:');
    console.log('   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/vlogsphere?retryWrites=true&w=majority\n');
    console.log('   Steps to get your connection string from MongoDB Atlas:');
    console.log('   1. In Atlas, click "Database" -> "Connect".');
    console.log('   2. Select "Drivers" (Node.js).');
    console.log('   3. Copy the connection string.');
    console.log('   4. Replace <password> with your actual database user password.');
    console.log('   5. Save into server/.env.');
    console.log('----------------------------------------------------');
    process.exit(1);
  }

  try {
    const maskedUri = uri.replace(/:([^@]+)@/, ':****@');
    console.log(`Connecting to: ${maskedUri}`);

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
    });

    console.log('✅ Connection SUCCESSFUL!');
    console.log(`   Connected Host: ${conn.connection.host}`);
    console.log(`   Database Name: ${conn.connection.name}`);
    console.log(`   Ready State: ${conn.connection.readyState === 1 ? 'Connected (1)' : conn.connection.readyState}`);
    console.log('----------------------------------------------------');
    process.exit(0);
  } catch (err) {
    console.error('❌ Connection FAILED:');
    console.error(`   Error Message: ${err.message}`);
    console.log('\nCommon Atlas fixes:');
    console.log('1. Network Access: Ensure IP Access list includes 0.0.0.0/0 (allow from anywhere).');
    console.log('2. Credentials: Check if database username and password in URI match Atlas Database Access.');
    console.log('3. Password Special Characters: If password has characters like @, #, %, URL-encode them.');
    console.log('----------------------------------------------------');
    process.exit(1);
  }
};

testConnection();
