import Video from '../models/Video.js';
import Comment from '../models/Comment.js';
import { uploadToCloudinary } from '../config/cloudinary.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

// Format view counts into user-friendly strings (e.g. 1.4M views, 520K views)
const formatViews = (views = 0) => {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M views`;
  if (views >= 1000) return `${Math.round(views / 1000)}K views`;
  return `${views} views`;
};

// @desc    Get all vlogs with pagination, search, category filtering & sorting
// @route   GET /api/vlogs
export const getVlogs = async (req, res, next) => {
  try {
    const { category, search, sort } = req.query;
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, Math.min(50, parseInt(req.query.limit, 10) || 12));
    const skip = (page - 1) * limit;

    const query = { visibility: 'public' };

    // Category Filter
    if (category && category !== 'All') {
      query.category = category;
    }

    // Search Query (regex across title, description, or tags)
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { tags: { $in: [searchRegex] } },
      ];
    }

    // Sort order
    let sortOption = { createdAt: -1 };
    if (sort === 'newest') {
      sortOption = { createdAt: -1 };
    } else if (sort === 'views' || sort === 'trending') {
      sortOption = { views: -1, createdAt: -1 };
    }

    // Parallel fetch for items and total count
    const [total, vlogs] = await Promise.all([
      Video.countDocuments(query),
      Video.find(query)
        .populate('creator', 'name handle avatar verified subscribers')
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .lean(),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    // Transform to consistent presentation format
    const formatted = vlogs.map((v) => ({
      id: v._id.toString(),
      _id: v._id,
      title: v.title,
      description: v.description,
      category: v.category,
      tags: v.tags || [],
      thumbnail: v.thumbnail,
      videoUrl: v.videoUrl,
      duration: v.duration,
      is4K: v.is4K,
      views: v.views,
      formattedViews: formatViews(v.views),
      likes: (v.likes || []).length,
      uploadedAt: v.createdAt ? new Date(v.createdAt).toLocaleDateString() : 'Recently',
      creator: v.creator || {
        name: 'VlogSphere Creator',
        handle: '@creator',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        verified: true,
      },
    }));

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Vlogs retrieved successfully.',
      data: formatted,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single vlog by ID with populated comments and creator
// @route   GET /api/vlogs/:id
export const getVlogById = async (req, res, next) => {
  try {
    const vlog = await Video.findById(req.params.id)
      .populate('creator', 'name handle avatar verified bio')
      .populate({
        path: 'comments',
        options: { sort: { createdAt: -1 } },
        populate: { path: 'user', select: 'name handle avatar verified' },
      });

    if (!vlog) {
      return sendError(res, {
        statusCode: 404,
        message: 'Vlog not found with the specified ID.',
      });
    }

    // Increment view count
    vlog.views += 1;
    await vlog.save();

    const comments = (vlog.comments || []).map((c) => ({
      id: c._id.toString(),
      text: c.text,
      user: c.user?.name || 'VlogSphere Explorer',
      avatar: c.user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      likes: c.likes || 0,
      time: c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'Recently',
    }));

    const formattedVlog = {
      id: vlog._id.toString(),
      _id: vlog._id,
      title: vlog.title,
      description: vlog.description,
      category: vlog.category,
      tags: vlog.tags || [],
      thumbnail: vlog.thumbnail,
      videoUrl: vlog.videoUrl,
      duration: vlog.duration,
      is4K: vlog.is4K,
      views: vlog.views,
      formattedViews: formatViews(vlog.views),
      likes: (vlog.likes || []).length,
      uploadedAt: vlog.createdAt ? new Date(vlog.createdAt).toLocaleDateString() : 'Recently',
      creator: vlog.creator,
      comments,
    };

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Vlog details retrieved.',
      data: formattedVlog,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload and publish a new vlog
// @route   POST /api/vlogs
export const createVlog = async (req, res, next) => {
  try {
    const { title, description, category, tags, duration, is4K, videoUrl, thumbnail } = req.body;

    if (!title || !description) {
      return sendError(res, {
        statusCode: 400,
        message: 'Please provide both title and description for your vlog.',
      });
    }

    let finalVideoUrl = videoUrl;
    let finalThumbnail = thumbnail;

    // Support optional Cloudinary multipart file streams
    if (req.files) {
      if (req.files.video && req.files.video[0]) {
        try {
          const result = await uploadToCloudinary(req.files.video[0].buffer, 'vlogsphere/videos');
          finalVideoUrl = result.secure_url;
        } catch (uploadErr) {
          console.warn('[Cloudinary Stream Warning]:', uploadErr.message);
        }
      }
      if (req.files.thumbnail && req.files.thumbnail[0]) {
        try {
          const result = await uploadToCloudinary(req.files.thumbnail[0].buffer, 'vlogsphere/thumbnails');
          finalThumbnail = result.secure_url;
        } catch (uploadErr) {
          console.warn('[Cloudinary Stream Warning]:', uploadErr.message);
        }
      }
    }

    const vlog = await Video.create({
      title: title.trim(),
      description: description.trim(),
      category: category || 'Lifestyle',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map((t) => t.trim()) : ['Vlog']),
      thumbnail: finalThumbnail || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      videoUrl: finalVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      duration: duration || '06:30',
      is4K: is4K !== undefined ? is4K : true,
      creator: req.user._id,
      visibility: 'public',
    });

    return sendSuccess(res, {
      statusCode: 201,
      message: 'Vlog published successfully.',
      data: {
        id: vlog._id.toString(),
        title: vlog.title,
        category: vlog.category,
        thumbnail: vlog.thumbnail,
        videoUrl: vlog.videoUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a vlog (creator ownership verified)
// @route   DELETE /api/vlogs/:id
export const deleteVlog = async (req, res, next) => {
  try {
    const vlog = await Video.findById(req.params.id);

    if (!vlog) {
      return sendError(res, {
        statusCode: 404,
        message: 'Vlog not found.',
      });
    }

    if (vlog.creator.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      return sendError(res, {
        statusCode: 403,
        message: 'Unauthorized. You do not own this vlog.',
      });
    }

    await Promise.all([
      Video.findByIdAndDelete(req.params.id),
      Comment.deleteMany({ video: req.params.id }),
    ]);

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Vlog and associated comments deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle like status on a vlog
// @route   POST /api/vlogs/:id/like
export const toggleLikeVlog = async (req, res, next) => {
  try {
    const vlog = await Video.findById(req.params.id);

    if (!vlog) {
      return sendError(res, {
        statusCode: 404,
        message: 'Vlog not found.',
      });
    }

    const userId = req.user._id;
    const index = vlog.likes.indexOf(userId);
    let liked = false;

    if (index > -1) {
      vlog.likes.splice(index, 1);
      liked = false;
    } else {
      vlog.likes.push(userId);
      liked = true;
    }

    await vlog.save();

    return sendSuccess(res, {
      statusCode: 200,
      message: liked ? 'Vlog liked.' : 'Like removed.',
      data: {
        liked,
        likesCount: vlog.likes.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add comment to a vlog
// @route   POST /api/vlogs/:id/comments
export const addComment = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return sendError(res, {
        statusCode: 400,
        message: 'Comment text cannot be empty.',
      });
    }

    const video = await Video.findById(req.params.id);
    if (!video) {
      return sendError(res, {
        statusCode: 404,
        message: 'Vlog not found.',
      });
    }

    const comment = await Comment.create({
      text: text.trim(),
      user: req.user._id,
      video: req.params.id,
    });

    return sendSuccess(res, {
      statusCode: 201,
      message: 'Comment posted successfully.',
      data: {
        id: comment._id.toString(),
        text: comment.text,
        user: req.user.name,
        avatar: req.user.avatar,
        likes: 0,
        time: 'Just now',
      },
    });
  } catch (error) {
    next(error);
  }
};
