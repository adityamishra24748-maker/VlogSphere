import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { VlogProvider } from './context/VlogContext';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import WatchModal from './components/WatchModal';
import UploadModal from './components/UploadModal';

// Pages
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import WatchPage from './pages/WatchPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UploadPage from './pages/UploadPage';
import CreatorProfilePage from './pages/CreatorProfilePage';
import DashboardPage from './pages/DashboardPage';
import WatchLaterPage from './pages/WatchLaterPage';
import NotFoundPage from './pages/NotFoundPage';

function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-gray-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Sticky Header */}
      <Navbar />

      {/* Main Body */}
      <div className="flex-1 flex max-w-[1920px] w-full mx-auto">
        {/* Navigation Sidebar */}
        <Sidebar />

        {/* Viewport Routes */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-4 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/watch/:id" element={<WatchPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/creator/:handle" element={<CreatorProfilePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/watch-later" element={<WatchLaterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>

      {/* Modals for quick overlay actions */}
      <WatchModal />
      <UploadModal />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <VlogProvider>
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </VlogProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
