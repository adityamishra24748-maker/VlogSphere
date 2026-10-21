import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  Film,
  Sparkles,
  CheckCircle,
  X,
  Globe,
  Lock,
  EyeOff,
  AlertCircle,
  Check
} from 'lucide-react';
import { useVlogs } from '../context/VlogContext';
import { useAuth } from '../context/AuthContext';

export default function UploadPage() {
  const navigate = useNavigate();
  const { addNewVlog, categories } = useVlogs();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Travel');
  const [visibility, setVisibility] = useState('public');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(['4K', 'Cinematic', 'TravelVlog']);
  const [thumbnailUrl, setThumbnailUrl] = useState(
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});

  const sampleThumbnails = [
    { label: 'Cinematic Travel', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Modern Studio', url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Tech Workspace', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Gourmet Culinary', url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80' }
  ];

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
    setIsUploading(true);
    setUploadProgress(15);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const validate = () => {
    const errs = {};
    if (!title.trim()) {
      errs.title = 'Vlog title is required.';
    } else if (title.trim().length > 100) {
      errs.title = 'Title must be 100 characters or less.';
    }

    if (!description.trim()) {
      errs.description = 'Please enter a description for your audience.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newId = addNewVlog({
      title: title.trim(),
      description: description.trim(),
      category,
      tags,
      thumbnail: thumbnailUrl,
      duration: '08:24',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    });

    // Navigate to newly created vlog's dedicated watch page
    navigate(`/watch/${newId}`);
  };

  return (
    <div className="py-4 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-dark-border pb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2.5">
          <UploadCloud className="w-8 h-8 text-brand-500" />
          <span>Upload New Vlog</span>
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Publish your video to the community. Add cinematic thumbnails, tags, and gear breakdowns.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Dropzone */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
            Video Source File
          </label>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            onClick={() => {
              if (!selectedFile) {
                handleFileSelected({
                  name: 'cinematic_iceland_expedition_4k.mp4',
                  size: '62.4 MB'
                });
              }
            }}
            className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all ${
              selectedFile
                ? 'border-brand-500 bg-brand-50/20 dark:bg-brand-950/20'
                : 'border-gray-300 dark:border-dark-border hover:border-brand-400 dark:hover:border-brand-500 hover:bg-gray-50 dark:hover:bg-dark-hover/50'
            }`}
          >
            {selectedFile ? (
              <div className="space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-brand-100 dark:bg-brand-950 text-brand-600 flex items-center justify-center">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-base font-bold text-gray-900 dark:text-white">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {selectedFile.size || '54 MB'} • Processed & Ready for Encoding
                  </p>
                </div>
                {isUploading && (
                  <div className="w-full max-w-sm mx-auto space-y-1.5">
                    <div className="bg-gray-200 dark:bg-dark-card rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-brand-600 h-2 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-gray-400 font-mono">
                      Uploading: {uploadProgress}%
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-brand-50 dark:bg-dark-surface text-brand-600 flex items-center justify-center">
                  <Film className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Drag and drop your vlog file here, or click to browse
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Supports 4K MP4, WebM, or ProRes MOV up to 10GB
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Vlog Title *
            </label>
            <span className="text-xs text-gray-400 font-mono">
              {title.length}/100
            </span>
          </div>
          <input
            type="text"
            value={title}
            maxLength={100}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors({ ...errors, title: null });
            }}
            placeholder="e.g. 48 Hours in Tokyo: Hidden Izakayas & Cyberpunk Nightscapes"
            className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-card border text-sm text-gray-900 dark:text-white outline-none transition-colors ${
              errors.title
                ? 'border-rose-500'
                : 'border-gray-200 dark:border-dark-border focus:border-brand-500'
            }`}
          />
          {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
        </div>

        {/* Category & Visibility Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
              Primary Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border text-sm text-gray-900 dark:text-white outline-none focus:border-brand-500 transition-colors"
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
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border text-sm text-gray-900 dark:text-white outline-none focus:border-brand-500 transition-colors"
            >
              <option value="public">🌐 Public (Recommended)</option>
              <option value="unlisted">🔗 Unlisted (Only with link)</option>
              <option value="private">🔒 Private (Only you)</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
            Description, Gear & Timestamps *
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) setErrors({ ...errors, description: null });
            }}
            placeholder="Share your story, filming locations, camera lenses, music credits, or timestamps..."
            className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-dark-card border text-sm text-gray-900 dark:text-white outline-none transition-colors resize-none ${
              errors.description
                ? 'border-rose-500'
                : 'border-gray-200 dark:border-dark-border focus:border-brand-500'
            }`}
          />
          {errors.description && <p className="text-xs text-rose-500 mt-1">{errors.description}</p>}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
            Tags & Keywords (Press Enter to Add)
          </label>
          <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-semibold"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-rose-500"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Add tag (e.g. SonyFX3, Tokyo, Coding)..."
              className="flex-1 min-w-[140px] bg-transparent text-sm text-gray-900 dark:text-white outline-none px-2 py-1"
            />
          </div>
        </div>

        {/* Thumbnail Selector */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
            Select Cover Thumbnail
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {sampleThumbnails.map((sample, idx) => (
              <div
                key={idx}
                onClick={() => setThumbnailUrl(sample.url)}
                className={`relative aspect-video rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                  thumbnailUrl === sample.url
                    ? 'border-brand-500 ring-4 ring-brand-500/30'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={sample.url}
                  alt={sample.label}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1.5 inset-x-2 text-center bg-black/75 backdrop-blur-sm text-[10px] font-semibold text-white rounded-md py-0.5 truncate px-1">
                  {sample.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-dark-border">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors"
          >
            Discard
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-sm font-bold shadow-xl shadow-brand-500/25 hover:scale-105 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Publish Vlog Live</span>
          </button>
        </div>
      </form>
    </div>
  );
}
