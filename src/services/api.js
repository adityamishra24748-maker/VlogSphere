import { INITIAL_VLOGS, CURRENT_USER, SUBSCRIBED_CREATORS } from '../data/mockVlogs';

// Smart base URL: uses VITE_API_URL, /api through Vite proxy when on port 3000, or direct localhost:5000
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== 'undefined' && window.location.port === '3000') {
    return '/api';
  }
  return 'http://localhost:5000/api';
};

const API_BASE_URL = getApiBaseUrl();

// Helper to get auth headers with stored JWT token
const getAuthHeaders = () => {
  const token = localStorage.getItem('vlogsphere_token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// Generic safe request helper with fallback
const safeRequest = async (endpoint, options = {}, fallbackData = null) => {
  try {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    const res = await fetch(url, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.message || `API Error: ${res.statusText}`);
    }

    const data = await res.json();
    return {
      success: true,
      data: data.data !== undefined ? data.data : data,
      pagination: data.pagination,
    };
  } catch (err) {
    // Graceful offline fallback when backend server or MongoDB is offline
    console.info(`[VlogSphere API] Offline notice for ${endpoint}: ${err.message}`);
    return {
      success: false,
      isOfflineFallback: true,
      error: err.message,
      data: fallbackData,
    };
  }
};

/* =========================================================
   AUTH API
   ========================================================= */
export const authApi = {
  login: async (email, password) => {
    const res = await safeRequest(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      },
      null
    );

    if (res.success && res.data?.token) {
      localStorage.setItem('vlogsphere_token', res.data.token);
      return res.data.user;
    }
    return null;
  },

  signup: async ({ name, handle, email, password }) => {
    const res = await safeRequest(
      '/auth/signup',
      {
        method: 'POST',
        body: JSON.stringify({ name, handle, email, password }),
      },
      null
    );

    if (res.success && res.data?.token) {
      localStorage.setItem('vlogsphere_token', res.data.token);
      return res.data.user;
    }
    return null;
  },

  getMe: async () => {
    const res = await safeRequest('/auth/me', { method: 'GET' }, CURRENT_USER);
    return res.data?.user || res.data;
  },

  logout: () => {
    localStorage.removeItem('vlogsphere_token');
  },
};

/* =========================================================
   VLOGS API
   ========================================================= */
export const vlogsApi = {
  getAll: async ({ category = 'All', search = '', sort = 'recommended', page = 1, limit = 12 } = {}) => {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search) params.append('search', search);
    if (sort) params.append('sort', sort);
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);

    const queryStr = params.toString() ? `?${params.toString()}` : '';
    const res = await safeRequest(`/vlogs${queryStr}`, { method: 'GET' }, INITIAL_VLOGS);

    return Array.isArray(res.data) ? res.data : INITIAL_VLOGS;
  },

  getById: async (id) => {
    const fallbackVlog = INITIAL_VLOGS.find((v) => v.id === id) || null;
    const res = await safeRequest(`/vlogs/${id}`, { method: 'GET' }, fallbackVlog);
    return res.data;
  },

  create: async (vlogData) => {
    const res = await safeRequest(
      '/vlogs',
      {
        method: 'POST',
        body: JSON.stringify(vlogData),
      },
      { id: `vlog-${Date.now()}`, ...vlogData }
    );
    return res.data;
  },

  delete: async (id) => {
    const res = await safeRequest(`/vlogs/${id}`, { method: 'DELETE' }, { success: true });
    return res.success;
  },

  toggleLike: async (id) => {
    const res = await safeRequest(`/vlogs/${id}/like`, { method: 'POST' }, { success: true });
    return res.data;
  },

  addComment: async (id, text) => {
    const fallbackComment = {
      id: `c-${Date.now()}`,
      text,
      user: CURRENT_USER.name,
      avatar: CURRENT_USER.avatar,
      likes: 0,
      time: 'Just now',
    };

    const res = await safeRequest(
      `/vlogs/${id}/comments`,
      {
        method: 'POST',
        body: JSON.stringify({ text }),
      },
      fallbackComment
    );
    return res.data;
  },
};

/* =========================================================
   SUBSCRIPTIONS API
   ========================================================= */
export const subscriptionsApi = {
  toggle: async (channelId) => {
    const res = await safeRequest(
      `/subscriptions/${channelId}/toggle`,
      { method: 'POST' },
      { subscribed: true }
    );
    return res.data;
  },

  getChannels: async () => {
    const res = await safeRequest(
      '/subscriptions/channels',
      { method: 'GET' },
      SUBSCRIBED_CREATORS
    );
    return res.data;
  },
};

/* =========================================================
   USERS & CREATORS API
   ========================================================= */
export const usersApi = {
  getProfile: async (handle) => {
    const cleanHandle = handle.startsWith('@') ? handle : `@${handle}`;
    const fallbackCreator =
      SUBSCRIBED_CREATORS.find((c) => c.handle.toLowerCase() === cleanHandle.toLowerCase()) ||
      CURRENT_USER;

    const res = await safeRequest(
      `/users/${encodeURIComponent(cleanHandle)}`,
      { method: 'GET' },
      fallbackCreator
    );
    return res.data;
  },

  getDashboardStats: async () => {
    const fallbackStats = {
      totalViews: 1420850,
      totalLikes: 184000,
      subscribersCount: 128400,
      vlogs: INITIAL_VLOGS.slice(0, 5),
    };

    const res = await safeRequest(
      '/users/dashboard/stats',
      { method: 'GET' },
      fallbackStats
    );
    return res.data;
  },
};
