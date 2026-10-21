/**
 * Standardized API Response Utilities
 * Ensures uniform JSON format across all VlogSphere REST API endpoints
 */

export const sendSuccess = (
  res,
  {
    statusCode = 200,
    message = 'Success',
    data = null,
    pagination = null,
  } = {}
) => {
  const response = {
    success: true,
    message,
    data,
  };

  if (pagination) {
    response.pagination = {
      page: Number(pagination.page),
      limit: Number(pagination.limit),
      total: Number(pagination.total),
      totalPages: Number(pagination.totalPages),
      hasNextPage: Boolean(pagination.hasNextPage),
      hasPrevPage: Boolean(pagination.hasPrevPage),
    };
  }

  return res.status(statusCode).json(response);
};

export const sendError = (
  res,
  {
    statusCode = 500,
    message = 'An unexpected error occurred.',
    errors = null,
  } = {}
) => {
  const response = {
    success: false,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};
