import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    subscriber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Subscriber user ID is required'],
      index: true,
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Channel / Creator user ID is required'],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index so a user cannot subscribe to the same channel twice
subscriptionSchema.index({ subscriber: 1, channel: 1 }, { unique: true });

// Pre-save validation to prevent self-subscription
subscriptionSchema.pre('save', function (next) {
  if (this.subscriber.toString() === this.channel.toString()) {
    return next(new Error('Creators cannot subscribe to their own channel.'));
  }
  next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;
