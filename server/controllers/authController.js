import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Subscription from '../models/Subscription.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'vlogsphere_super_secret_jwt_key_2026_pro',
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '30d',
    }
  );
};

// @desc    Register a new creator channel
// @route   POST /api/auth/signup
export const signup = async (req, res, next) => {
  try {
    const { name, handle, email, password } = req.body;

    if (!name || !handle || !email || !password) {
      return sendError(res, {
        statusCode: 400,
        message: 'Please provide all required registration fields (name, handle, email, password).',
      });
    }

    const cleanHandle = handle.startsWith('@') ? handle.toLowerCase() : `@${handle.toLowerCase()}`;

    // Check if user with email or handle already exists
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { handle: cleanHandle }],
    });

    if (existingUser) {
      const match = existingUser.email === email.toLowerCase() ? 'Email' : 'Channel handle';
      return sendError(res, {
        statusCode: 400,
        message: `${match} is already in use by another creator.`,
      });
    }

    const user = await User.create({
      name,
      handle: cleanHandle,
      email: email.toLowerCase(),
      password,
      role: 'Creator',
    });

    const token = generateToken(user._id);

    return sendSuccess(res, {
      statusCode: 201,
      message: 'Channel registered successfully.',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          handle: user.handle,
          email: user.email,
          avatar: user.avatar,
          bio: user.bio,
          role: user.role,
          verified: user.verified,
          subscribersCount: 0,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate creator & return JWT
// @route   POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, {
        statusCode: 400,
        message: 'Please provide both email and password.',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return sendError(res, {
        statusCode: 401,
        message: 'Invalid email or password credentials.',
      });
    }

    const token = generateToken(user._id);
    const subscribersCount = await Subscription.countDocuments({ channel: user._id });

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Signed in successfully.',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          handle: user.handle,
          email: user.email,
          avatar: user.avatar,
          bio: user.bio,
          role: user.role,
          verified: user.verified,
          subscribersCount,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current authenticated profile
// @route   GET /api/auth/me
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return sendError(res, {
        statusCode: 404,
        message: 'User profile not found.',
      });
    }

    const subscribersCount = await Subscription.countDocuments({ channel: user._id });
    const followingCount = await Subscription.countDocuments({ subscriber: user._id });

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Current profile retrieved.',
      data: {
        id: user._id,
        name: user.name,
        handle: user.handle,
        email: user.email,
        avatar: user.avatar,
        banner: user.banner,
        bio: user.bio,
        role: user.role,
        verified: user.verified,
        subscribersCount,
        followingCount,
      },
    });
  } catch (error) {
    next(error);
  }
};
