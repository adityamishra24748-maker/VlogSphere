import Subscription from '../models/Subscription.js';
import User from '../models/User.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// @desc    Toggle subscription to a channel
// @route   POST /api/subscriptions/:channelId/toggle
export const toggleSubscription = async (req, res, next) => {
  try {
    const { channelId } = req.params;
    const subscriberId = req.user._id;

    if (subscriberId.toString() === channelId) {
      return sendError(res, {
        statusCode: 400,
        message: 'Creators cannot subscribe to their own channel.',
      });
    }

    const channel = await User.findById(channelId);
    if (!channel) {
      return sendError(res, {
        statusCode: 404,
        message: 'Creator channel not found.',
      });
    }

    // Check if subscription exists
    const existing = await Subscription.findOne({
      subscriber: subscriberId,
      channel: channelId,
    });

    let subscribed = false;

    if (existing) {
      await Subscription.findByIdAndDelete(existing._id);
      subscribed = false;
    } else {
      await Subscription.create({
        subscriber: subscriberId,
        channel: channelId,
      });
      subscribed = true;
    }

    const subscribersCount = await Subscription.countDocuments({ channel: channelId });

    return sendSuccess(res, {
      statusCode: 200,
      message: subscribed ? `Subscribed to ${channel.name}` : `Unsubscribed from ${channel.name}`,
      data: {
        subscribed,
        channelId,
        subscribersCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all channels the current user is subscribed to
// @route   GET /api/subscriptions/channels
export const getSubscribedChannels = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({ subscriber: req.user._id })
      .populate('channel', 'name handle avatar verified bio')
      .sort({ createdAt: -1 });

    const channels = subscriptions.map((sub) => sub.channel).filter(Boolean);

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Subscribed channels retrieved.',
      data: channels,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get list of subscribers for a channel
// @route   GET /api/subscriptions/subscribers/:channelId
export const getChannelSubscribers = async (req, res, next) => {
  try {
    const { channelId } = req.params;

    const subscriptions = await Subscription.find({ channel: channelId })
      .populate('subscriber', 'name handle avatar verified')
      .sort({ createdAt: -1 });

    const subscribers = subscriptions.map((sub) => sub.subscriber).filter(Boolean);

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Channel subscribers list retrieved.',
      data: subscribers,
    });
  } catch (error) {
    next(error);
  }
};
