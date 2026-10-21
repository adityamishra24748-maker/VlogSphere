import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Mail, Lock, AlertCircle, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, demoLogin, isLoading, authError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  const handleDemoLogin = () => {
    demoLogin();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md bg-white dark:bg-dark-card rounded-3xl shadow-2xl border border-gray-200 dark:border-dark-border p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
            <Play className="w-6 h-6 fill-current ml-0.5" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Welcome to VlogSphere
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Sign in to manage your vlogs, analyze metrics, and connect with fans.
          </p>
        </div>

        {/* Global Error Banner */}
        {authError && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
                placeholder="creator@vlogsphere.io"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-dark-surface border text-sm text-gray-900 dark:text-white outline-none transition-colors ${
                  errors.email
                    ? 'border-rose-500 focus:border-rose-500'
                    : 'border-gray-200 dark:border-dark-border focus:border-brand-500'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-rose-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-xs text-brand-600 dark:text-brand-400 hover:underline">
                Forgot?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
                placeholder="••••••••"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-dark-surface border text-sm text-gray-900 dark:text-white outline-none transition-colors ${
                  errors.password
                    ? 'border-rose-500 focus:border-rose-500'
                    : 'border-gray-200 dark:border-dark-border focus:border-brand-500'
                }`}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-rose-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 disabled:opacity-60 text-white font-semibold text-sm shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Channel</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-gray-200 dark:border-dark-border" />
          <span className="absolute bg-white dark:bg-dark-card px-3 text-xs text-gray-400 uppercase tracking-wider">
            Fast Portfolio Demo
          </span>
        </div>

        {/* Demo 1-Click Login Button */}
        <button
          onClick={handleDemoLogin}
          type="button"
          className="w-full py-2.5 rounded-xl border border-brand-500/40 hover:border-brand-500 bg-brand-50/50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-300 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 group"
        >
          <Sparkles className="w-4 h-4 text-brand-500 group-hover:scale-110 transition-transform" />
          <span>1-Click Demo Login as Alex Rivera (Pro Creator)</span>
        </button>

        {/* Footer links */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
          Don't have a creator account?{' '}
          <Link to="/signup" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
            Register Channel
          </Link>
        </p>
      </div>
    </div>
  );
}
