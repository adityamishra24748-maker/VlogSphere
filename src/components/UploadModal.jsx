import React, { useState, useEffect } from 'react';
import {
  X,
  UploadCloud,
  Film,
  Image as ImageIcon,
  CheckCircle,
  Tag,
  Globe,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useVlogs } from '../context/VlogContext';

export default function UploadModal() {
  const { isUploadModalOpen, setIsUploadModalOpen, addNewVlog, categories } = useVlogs();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Lifestyle');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(['Vlog', 'Cinematic']);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');

  // Sample curated thumbnails for quick testing
  const sampleThumbnails = [
    { label: 'Cinematic Travel', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Modern Studio', url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Coding Workspace', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Gourmet Food', url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80' }
  ];

  // Set default thumbnail when opened
  useEffect(() => {
    if (isUploadModalOpen && !thumbnailUrl) {
      setThumbnailUrl(sampleThumbnails[0].url);
    }
  }, [isUploadModalOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsUploadModalOpen(false);
      }
    };
    if (isUploadModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isUploadModalOpen, setIsUploadModalOpen]);

  if (!isUploadModalOpen) return null;

  const handleAddTag = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const clean = tagInput.trim().replace(/^#/, '');
      if (!tags.includes(clean)) {
        setTags([...tags, clean]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer?.files?.[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelected = (file) => {
    setSelectedFile(file);
    // Simulate upload progress
    setIsUploading(true);
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a title for your vlog.');
      return;
    }

    addNewVlog({
      title: title.trim(),
      description: description.trim(),
      category,
      tags,
      thumbnail: thumbnailUrl || sampleThumbnails[0].url,
      duration: '06:45',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    });

    // Reset form
    setTitle('');
    setDescription('');
    setSelectedFile(null);
    setUploadProgress(0);
    setIsUploadModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-dark-surface rounded-3xl shadow-2xl border border-gray-200 dark:border-dark-border overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-dark-border bg-white dark:bg-dark-card">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white text-base">
                Upload New Vlog
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Share your cinematic journey with the VlogSphere community
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(false)}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-hover"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Drag & Drop Zone */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
              Video File
            </label>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                selectedFile
                  ? 'border-brand-500 bg-brand-50/20 dark:bg-brand-950/20'
                  : 'border-gray-300 dark:border-dark-border hover:border-brand-400 dark:hover:border-brand-500 hover:bg-gray-50 dark:hover:bg-dark-hover/50'
              }`}
              onClick={() => {
                if (!selectedFile) {
                  // Simulate picking a sample vlog file
                  handleFileSelected({
                    name: 'cinematic_vlog_master_4k.mp4',
                    size: '48.2 MB'
                  });
                }
              }}
            >
              {selectedFile ? (
                <div className="space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-brand-100 dark:bg-brand-950 text-brand-600 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedFile.size || '34 MB'} • Ready to process
                  </p>
                  {isUploading && (
                    <div className="w-full bg-gray-200 dark:bg-dark-card rounded-full h-2 overflow-hidden mt-3 max-w-xs mx-auto">
                      <div
                        className="bg-brand-600 h-2 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <UploadCloud className="w-10 h-10 mx-auto text-gray-400 dark:text-gray-500" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Click to browse or drag & drop video file here
                  </p>
                  <p className="text-xs text-gray-400">
                    MP4, MOV, or WebM up to 4K 60FPS
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Title Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Vlog Title *
              </label>
              <span className="text-[11px] text-gray-400">
                {title.length}/100
              </span>
            </div>
            <input
              type="text"
              required
              maxLength={100}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. 24 Hours in Iceland: Chasing Northern Lights in 4K"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border focus:border-brand-500 focus:bg-white dark:focus:bg-dark-surface outline-none text-sm text-gray-900 dark:text-white transition-colors"
            />
          </div>

          {/* Category & Visibility */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border focus:border-brand-500 focus:bg-white dark:focus:bg-dark-surface outline-none text-sm text-gray-900 dark:text-white transition-colors"
              >
                {categories.filter(c => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Visibility
              </label>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border text-sm text-gray-900 dark:text-white">
                <Globe className="w-4 h-4 text-brand-500" />
                <span>Public (Recommended)</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
              Description & Gear
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell viewers about your journey, locations visited, camera equipment, or timestamps..."
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border focus:border-brand-500 focus:bg-white dark:focus:bg-dark-surface outline-none text-sm text-gray-900 dark:text-white transition-colors resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
              Tags (Press Enter to add)
            </label>
            <div className="flex flex-wrap items-center gap-2 p-2 rounded-xl bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-medium"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-rose-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Add tag..."
                className="flex-1 min-w-[100px] bg-transparent text-xs text-gray-900 dark:text-white outline-none px-2 py-1"
              />
            </div>
          </div>

          {/* Thumbnail Picker */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
              Choose Thumbnail Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {sampleThumbnails.map((sample, idx) => (
                <div
                  key={idx}
                  onClick={() => setThumbnailUrl(sample.url)}
                  className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                    thumbnailUrl === sample.url
                      ? 'border-brand-500 ring-2 ring-brand-500/50'
                      : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={sample.url}
                    alt={sample.label}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 inset-x-1 text-center bg-black/70 backdrop-blur-sm text-[9px] text-white rounded py-0.5 truncate px-1">
                    {sample.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-dark-border">
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-sm font-semibold shadow-lg shadow-brand-500/25 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Publish Vlog</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
