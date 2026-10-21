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
        return CURRENT_USER;
      }
    }
    return CURRENT_USER; // Default logged in as creator for easy college portfolio demonstration
  });

  const [authError, setAuthError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('vlogsphere_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('vlogsphere_user');
    }
  }, [user]);

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

    try {
      // Try backend authentication first
      const loggedUser = await authApi.login(email, password);
      if (loggedUser) {
        setUser(loggedUser);
        setIsLoading(false);
        return true;
      }
    } catch (err) {
      console.warn('Backend login notice, falling back to local session:', err.message);
    }

    // Fallback simulation
    const fallbackUser = {
      ...CURRENT_USER,
      email: email,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    };

    setUser(fallbackUser);
    setIsLoading(false);
    return true;
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

    try {
      const newUser = await authApi.signup({ name, handle: cleanHandle, email, password });
      if (newUser) {
        setUser(newUser);
        setIsLoading(false);
        return true;
      }
    } catch (err) {
      console.warn('Backend signup notice, falling back to local session:', err.message);
    }

    const fallbackUser = {
      name,
      handle: cleanHandle,
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      subscribers: '0 subscribers',
      role: 'Creator',
      notifications: [],
    };

    setUser(fallbackUser);
    setIsLoading(false);
    return true;
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
