import { sendError } from '../utils/apiResponse.js';

/**
 * 404 Route Not Found Middleware
 */
export const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Centralized Error Handler Middleware
 * Normalizes Mongoose and application errors into a uniform JSON response
 */
export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';
  let errors = null;

  // Handle Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError') {
    message = `Resource not found with ID of: ${err.value}`;
    statusCode = 404;
  }

  // Handle Mongoose Duplicate Key Error (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'Field';
    message = `Duplicate value entered for '${field}'. Please provide a unique value.`;
    statusCode = 400;
  }

  // Handle Mongoose Schema Validation Errors
  if (err.name === 'ValidationError') {
    errors = Object.values(err.errors).map((val) => val.message);
    message = 'Validation failed. Please verify the submitted data.';
    statusCode = 400;
  }

  // Handle JWT Errors
  if (err.name === 'JsonWebTokenError') {
    message = 'Invalid authentication token. Please log in again.';
    statusCode = 401;
  }

  if (err.name === 'TokenExpiredError') {
    message = 'Authentication token expired. Please log in again.';
    statusCode = 401;
  }

  return sendError(res, {
    statusCode,
    message,
    errors,
  });
};
