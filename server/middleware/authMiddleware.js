import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendError } from '../utils/apiResponse.js';

/**
 * Protect middleware: requires a valid JWT Bearer token
 */
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return sendError(res, {
      statusCode: 401,
      message: 'Access denied. No authentication token provided.',
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'vlogsphere_super_secret_jwt_key_2026_pro'
    );

    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      // Fallback mock session for rapid testing
      req.user = {
        _id: decoded.id,
        name: 'Alex Rivera',
        handle: '@alexrivera',
        role: 'Pro Creator',
      };
    }

    next();
  } catch (error) {
    return sendError(res, {
      statusCode: 401,
      message: 'Authentication failed. Invalid or expired token.',
    });
  }
};

/**
 * Optional Auth middleware: attaches user if token is present, but doesn't block if missing
 */
export const optionalAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'vlogsphere_super_secret_jwt_key_2026_pro'
      );
      req.user = await User.findById(decoded.id).select('-password');
    } catch (err) {
      // Intentionally silent for optional auth
    }
  }
  next();
};
