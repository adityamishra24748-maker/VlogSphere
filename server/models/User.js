import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name or channel name'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    handle: {
      type: String,
      required: [true, 'Please provide a unique handle'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^@[A-Za-z0-9_]{2,30}$/, 'Handle must start with @ and be 3-30 alphanumeric characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    },
    banner: {
      type: String,
      default: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    },
    bio: {
      type: String,
      default: 'Cinematic creator on VlogSphere. Documenting life in 4K.',
      maxlength: [500, 'Bio cannot exceed 500 characters'],
    },
    role: {
      type: String,
      enum: ['Viewer', 'Creator', 'Pro Creator', 'Admin'],
      default: 'Creator',
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for subscriber relations
userSchema.virtual('subscribers', {
  ref: 'Subscription',
  localField: '_id',
  foreignField: 'channel',
});

// Virtual for channels this user subscribes to
userSchema.virtual('subscriptions', {
  ref: 'Subscription',
  localField: '_id',
  foreignField: 'subscriber',
});

// Virtual for uploaded videos
userSchema.virtual('videos', {
  ref: 'Video',
  localField: '_id',
  foreignField: 'creator',
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match password helper
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
