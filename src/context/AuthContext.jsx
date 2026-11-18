import React, { createContext, useContext, useState, useEffect } from 'react';
import { CURRENT_USER } from '../data/mockVlogs';
import { authApi } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('vlogsphere_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [authError, setAuthError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sync user changes to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('vlogsphere_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('vlogsphere_user');
    }
  }, [user]);

  // Sync with backend on initial load if token exists
  useEffect(() => {
    const token = localStorage.getItem('vlogsphere_token');
    if (token && !user) {
      authApi.getMe().then((me) => {
        if (me && (me.id || me._id)) {
          setUser(me);
        }
      }).catch(() => {});
    }
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setAuthError(null);

    if (!email || !password) {
      setAuthError('Please enter both email and password.');
      setIsLoading(false);
      return false;
    }

    if (password.length < 6) {
      setAuthError('Password must be at least 6 characters.');
      setIsLoading(false);
      return false;
    }

    const res = await authApi.login(email, password);
    setIsLoading(false);

    if (res.success && res.user) {
      setUser(res.user);
      return true;
    }

    setAuthError(res.error || 'Invalid credentials or unable to reach database.');
    return false;
  };

  const signup = async ({ name, handle, email, password }) => {
    setIsLoading(true);
    setAuthError(null);

    if (!name || !email || !password) {
      setAuthError('Please fill in all required fields.');
      setIsLoading(false);
      return false;
    }

    const cleanHandle = handle.startsWith('@') ? handle : `@${handle}`;

    const res = await authApi.signup({ name, handle: cleanHandle, email, password });
    setIsLoading(false);

    if (res.success && res.user) {
      setUser(res.user);
      return true;
    }

    setAuthError(res.error || 'Failed to create channel in database.');
    return false;
  };

  const demoLogin = () => {
    setUser(CURRENT_USER);
    setAuthError(null);
    return true;
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        demoLogin,
        logout,
        authError,
        setAuthError,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
