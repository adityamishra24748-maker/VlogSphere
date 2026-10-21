import User from '../models/User.js';
import Video from '../models/Video.js';
import Subscription from '../models/Subscription.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// @desc    Get creator channel profile by handle
// @route   GET /api/users/:handle
export const getCreatorProfile = async (req, res, next) => {
  try {
    const handleParam = decodeURIComponent(req.params.handle).toLowerCase();
    const cleanHandle = handleParam.startsWith('@') ? handleParam : `@${handleParam}`;

    const creator = await User.findOne({ handle: cleanHandle }).select('-password');

    if (!creator) {
      return sendError(res, {
        statusCode: 404,
        message: `Creator channel '${cleanHandle}' was not found.`,
      });
    }

    const [vlogs, subscribersCount] = await Promise.all([
      Video.find({ creator: creator._id, visibility: 'public' }).sort({ createdAt: -1 }),
      Subscription.countDocuments({ channel: creator._id }),
    ]);

    const totalViews = vlogs.reduce((acc, curr) => acc + (curr.views || 0), 0);

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Creator profile retrieved.',
      data: {
        id: creator._id.toString(),
        name: creator.name,
        handle: creator.handle,
        avatar: creator.avatar,
        banner: creator.banner,
        bio: creator.bio,
        role: creator.role,
        verified: creator.verified,
        subscribersCount,
        totalViews,
        vlogsCount: vlogs.length,
        vlogs,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get studio dashboard statistics
// @route   GET /api/users/dashboard/stats
export const getDashboardStats = async (req, res, next) => {
  try {
    const [vlogs, subscribersCount] = await Promise.all([
      Video.find({ creator: req.user._id }).sort({ createdAt: -1 }),
      Subscription.countDocuments({ channel: req.user._id }),
    ]);

    const totalViews = vlogs.reduce((acc, curr) => acc + (curr.views || 0), 0);
    const totalLikes = vlogs.reduce((acc, curr) => acc + ((curr.likes || []).length), 0);

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Dashboard metrics retrieved.',
      data: {
        totalVlogs: vlogs.length,
        totalViews,
        totalLikes,
        subscribersCount,
        vlogs,
      },
    });
  } catch (error) {
    next(error);
  }
};
