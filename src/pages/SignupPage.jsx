import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, User, AtSign, Mail, Lock, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, isLoading, authError } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    handle: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full Name or Channel Name is required.';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    if (!formData.handle.trim()) {
      errs.handle = 'Channel Handle is required (e.g. @yourname).';
    } else if (!/^[A-Za-z0-9_@]+$/.test(formData.handle.trim())) {
      errs.handle = 'Handle can only contain letters, numbers, and underscores.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email.';
    }

    if (!formData.password) {
      errs.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.agreeTerms) {
      errs.agreeTerms = 'You must agree to the Terms & Creator Guidelines.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const success = await signup({
      name: formData.name.trim(),
      handle: formData.handle.trim(),
      email: formData.email.trim(),
      password: formData.password
    });

    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-lg bg-white dark:bg-dark-card rounded-3xl shadow-2xl border border-gray-200 dark:border-dark-border p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
            <Play className="w-6 h-6 fill-current ml-0.5" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Create Your Vlog Channel
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Join the premier community for cinematic storytellers and creators.
          </p>
        </div>

        {/* Global Error Banner */}
        {authError && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name & Handle Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Channel Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: null });
                  }}
                  placeholder="Elena Rostova"
                  className={`w-full pl-10 pr-3 py-2.5 rounded-xl bg-gray-50 dark:bg-dark-surface border text-sm text-gray-900 dark:text-white outline-none transition-colors ${
                    errors.name ? 'border-rose-500' : 'border-gray-200 dark:border-dark-border focus:border-brand-500'
                  }`}
                />
              </div>
              {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Unique Handle *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <AtSign className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={formData.handle}
                  onChange={(e) => {
                    setFormData({ ...formData, handle: e.target.value });
                    if (errors.handle) setErrors({ ...errors, handle: null });
                  }}
                  placeholder="@elenarostova"
                  className={`w-full pl-10 pr-3 py-2.5 rounded-xl bg-gray-50 dark:bg-dark-surface border text-sm text-gray-900 dark:text-white outline-none transition-colors ${
                    errors.handle ? 'border-rose-500' : 'border-gray-200 dark:border-dark-border focus:border-brand-500'
                  }`}
                />
              </div>
              {errors.handle && <p className="text-xs text-rose-500 mt-1">{errors.handle}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
              Email Address *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
                placeholder="creator@vlogsphere.io"
                className={`w-full pl-10 pr-3 py-2.5 rounded-xl bg-gray-50 dark:bg-dark-surface border text-sm text-gray-900 dark:text-white outline-none transition-colors ${
                  errors.email ? 'border-rose-500' : 'border-gray-200 dark:border-dark-border focus:border-brand-500'
                }`}
              />
            </div>
            {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
          </div>

          {/* Password & Confirm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    if (errors.password) setErrors({ ...errors, password: null });
                  }}
                  placeholder="At least 6 chars"
                  className={`w-full pl-10 pr-3 py-2.5 rounded-xl bg-gray-50 dark:bg-dark-surface border text-sm text-gray-900 dark:text-white outline-none transition-colors ${
                    errors.password ? 'border-rose-500' : 'border-gray-200 dark:border-dark-border focus:border-brand-500'
                  }`}
                />
              </div>
              {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Confirm Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, confirmPassword: e.target.value });
                    if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
                  }}
                  placeholder="Repeat password"
                  className={`w-full pl-10 pr-3 py-2.5 rounded-xl bg-gray-50 dark:bg-dark-surface border text-sm text-gray-900 dark:text-white outline-none transition-colors ${
                    errors.confirmPassword ? 'border-rose-500' : 'border-gray-200 dark:border-dark-border focus:border-brand-500'
                  }`}
                />
              </div>
              {errors.confirmPassword && <p className="text-xs text-rose-500 mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Terms checkbox */}
          <div>
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-600 dark:text-gray-400">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) => {
                  setFormData({ ...formData, agreeTerms: e.target.checked });
                  if (errors.agreeTerms) setErrors({ ...errors, agreeTerms: null });
                }}
                className="mt-0.5 rounded text-brand-600 focus:ring-brand-500 border-gray-300 dark:border-dark-border"
              />
              <span>
                I agree to the <a href="#" className="text-brand-600 dark:text-brand-400 underline">Terms of Service</a> and <a href="#" className="text-brand-600 dark:text-brand-400 underline">Community Guidelines</a>.
              </span>
            </label>
            {errors.agreeTerms && <p className="text-xs text-rose-500 mt-1">{errors.agreeTerms}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 disabled:opacity-60 text-white font-semibold text-sm shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Launch Channel</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
          Already have an existing channel?{' '}
          <Link to="/login" className="font-semibold text-brand-600 dark:text-brand-400 hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
}
