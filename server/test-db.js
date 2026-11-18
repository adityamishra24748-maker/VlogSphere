import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config();

const testConnection = async () => {
  const uri = process.env.MONGO_URI;
  console.log('----------------------------------------------------');
  console.log('📡 Testing MongoDB Atlas Connection...');
  console.log('----------------------------------------------------');

  if (!uri || uri.includes('<db_password>') || uri.includes('<password>')) {
    console.warn('⚠️  Your MONGO_URI contains the placeholder "<db_password>".');
    console.log('   Expected format:');
    console.log('   mongodb+srv://adityamishra24748_db_user:<your_password>@cluster0.fr4p7qk.mongodb.net/vlogsphere?compressors=zlib&retryWrites=true&w=majority\n');
    console.log('   Steps to activate your MongoDB Atlas connection:');
    console.log('   1. In server/.env, replace <db_password> with your actual database user password.');
    console.log('   2. Ensure 0.0.0.0/0 is added to your MongoDB Atlas Network Access.');
    console.log('   3. Run "npm run test:db" to verify.');
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
