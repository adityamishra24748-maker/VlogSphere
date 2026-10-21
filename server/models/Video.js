import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a vlog title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a video description'],
      maxlength: [3000, 'Description cannot exceed 3000 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: {
        values: [
          'Travel',
          'Tech & Coding',
          'Lifestyle',
          'Cinematography',
          'Food & Culinary',
          'Gaming',
          'Fitness',
          'Music',
        ],
        message: '{VALUE} is not a valid category',
      },
      index: true,
      default: 'Lifestyle',
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    thumbnail: {
      type: String,
      required: [true, 'Please provide a thumbnail image URL'],
    },
    videoUrl: {
      type: String,
      required: [true, 'Please provide a video stream URL'],
    },
    duration: {
      type: String,
      default: '05:00',
    },
    is4K: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
      index: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Creator is required'],
      index: true,
    },
    visibility: {
      type: String,
      enum: ['public', 'unlisted', 'private'],
      default: 'public',
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for comments
videoSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'video',
});

// Indexes for high performance search, category filtering, and trending queries
videoSchema.index({ title: 'text', description: 'text', tags: 'text' });
videoSchema.index({ category: 1, createdAt: -1 });

const Video = mongoose.model('Video', videoSchema);
export default Video;
