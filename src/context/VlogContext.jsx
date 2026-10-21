import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { INITIAL_VLOGS, CATEGORIES, SUBSCRIBED_CREATORS, CURRENT_USER } from '../data/mockVlogs';
import { vlogsApi, usersApi } from '../services/api';

const VlogContext = createContext();

export const VlogProvider = ({ children }) => {
  const [vlogs, setVlogs] = useState(INITIAL_VLOGS);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended"); // recommended, newest, views
  
  // UI states
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  // User interactions
  const [watchLaterList, setWatchLaterList] = useState(["vlog-1", "vlog-3", "vlog-5"]);
  const [likedVideos, setLikedVideos] = useState(["vlog-2", "vlog-5"]);
  const [subscribedCreators, setSubscribedCreators] = useState(
    SUBSCRIBED_CREATORS.map(c => c.id)
  );

  // Fetch vlogs from backend API when available
  useEffect(() => {
    let isMounted = true;
    const fetchVlogs = async () => {
      try {
        const data = await vlogsApi.getAll({
          category: selectedCategory,
          search: searchQuery,
          sort: sortBy,
        });
        if (isMounted && data && data.length > 0) {
          setVlogs(data);
        }
      } catch (err) {
        console.info('[VlogContext] Initial load using local mock feed.');
      }
    };
    fetchVlogs();
    return () => {
      isMounted = false;
    };
  }, [selectedCategory, sortBy]);

  const toggleSidebar = () => {
    setIsSidebarExpanded(prev => !prev);
  };

  const toggleWatchLater = (vlogId) => {
    setWatchLaterList(prev => 
      prev.includes(vlogId) ? prev.filter(id => id !== vlogId) : [...prev, vlogId]
    );
  };

  const isWatchLater = (vlogId) => watchLaterList.includes(vlogId);

  const toggleLike = async (vlogId) => {
    // Optimistic UI update
    setLikedVideos(prev => {
      const alreadyLiked = prev.includes(vlogId);
      const updated = alreadyLiked ? prev.filter(id => id !== vlogId) : [...prev, vlogId];
      
      setVlogs(currentVlogs =>
        currentVlogs.map(vlog => {
          if (vlog.id === vlogId) {
            return {
              ...vlog,
              likes: alreadyLiked ? Math.max(0, (vlog.likes || 1) - 1) : (vlog.likes || 0) + 1
            };
          }
          return vlog;
        })
      );

      return updated;
    });

    // Notify backend
    try {
      await vlogsApi.toggleLike(vlogId);
    } catch (e) {
      // Handled silently
    }
  };

  const isLiked = (vlogId) => likedVideos.includes(vlogId);

  const toggleSubscribe = async (creatorHandleOrId) => {
    setSubscribedCreators(prev =>
      prev.includes(creatorHandleOrId)
        ? prev.filter(id => id !== creatorHandleOrId)
        : [...prev, creatorHandleOrId]
    );

    // Notify backend
    try {
      await usersApi.toggleSubscribe(creatorHandleOrId);
    } catch (e) {
      // Handled silently
    }
  };

  const isSubscribed = (creatorHandleOrId) => subscribedCreators.includes(creatorHandleOrId);

  // Helper getters
  const getVlogById = (id) => {
    return vlogs.find(v => v.id === id);
  };

  const getVlogsByCreator = (handle) => {
    const cleanHandle = handle ? (handle.startsWith('@') ? handle.toLowerCase() : `@${handle.toLowerCase()}`) : '';
    return vlogs.filter(v => v.creator?.handle?.toLowerCase() === cleanHandle);
  };

  // Delete vlog (used in Creator Dashboard)
  const deleteVlog = async (id) => {
    setVlogs(prev => prev.filter(v => v.id !== id));
    setWatchLaterList(prev => prev.filter(vId => vId !== id));
    setLikedVideos(prev => prev.filter(vId => vId !== id));

    try {
      await vlogsApi.delete(id);
    } catch (e) {
      // Handled silently
    }
  };

  // Add comment to specific vlog
  const addCommentToVlog = async (vlogId, comment) => {
    setVlogs(prev =>
      prev.map(v => {
        if (v.id === vlogId) {
          return {
            ...v,
            comments: [comment, ...(v.comments || [])]
          };
        }
        return v;
      })
    );

    try {
      await vlogsApi.addComment(vlogId, comment.text);
    } catch (e) {
      // Handled silently
    }
  };

  // Add new vlog dynamically
  const addNewVlog = async ({ title, description, category, tags, thumbnail, duration, videoUrl }) => {
    const newId = `vlog-${Date.now()}`;
    const newVlog = {
      id: newId,
      title,
      description: description || "No description provided.",
      category: category || "Lifestyle",
      thumbnail: thumbnail || "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
      videoUrl: videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      duration: duration || "05:00",
      is4K: true,
      views: 1,
      formattedViews: "1 view",
      uploadedAt: "Just now",
      likes: 1,
      tags: tags && tags.length > 0 ? tags : ["Vlog", "VlogSphere", category],
      creator: {
        name: CURRENT_USER.name,
        handle: CURRENT_USER.handle,
        avatar: CURRENT_USER.avatar,
        subscribers: CURRENT_USER.subscribers,
        verified: true
      },
      comments: []
    };

    setVlogs(prev => [newVlog, ...prev]);

    // Send to backend
    try {
      const created = await vlogsApi.create({
        title,
        description,
        category,
        tags,
        thumbnail: newVlog.thumbnail,
        videoUrl: newVlog.videoUrl,
        duration: newVlog.duration,
      });
      if (created?.id) {
        return created.id;
      }
    } catch (e) {
      // Handled silently
    }

    return newId;
  };

  // Filter and sort vlogs
  const filteredVlogs = useMemo(() => {
    let result = [...vlogs];

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter(v => v.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Search query filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(v =>
        v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.creator.name.toLowerCase().includes(q) ||
        v.creator.handle.toLowerCase().includes(q) ||
        (v.tags && v.tags.some(tag => tag.toLowerCase().includes(q)))
      );
    }

    // Sorting
    if (sortBy === "newest") {
      result = [...result].reverse();
    } else if (sortBy === "views") {
      result = [...result].sort((a, b) => b.views - a.views);
    }

    return result;
  }, [vlogs, selectedCategory, searchQuery, sortBy]);

  return (
    <VlogContext.Provider
      value={{
        vlogs,
        filteredVlogs,
        categories: CATEGORIES,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        isSidebarExpanded,
        setIsSidebarExpanded,
        toggleSidebar,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        isUploadModalOpen,
        setIsUploadModalOpen,
        activeVideo,
        setActiveVideo,
        watchLaterList,
        toggleWatchLater,
        isWatchLater,
        likedVideos,
        toggleLike,
        isLiked,
        subscribedCreators,
        toggleSubscribe,
        isSubscribed,
        addNewVlog,
        deleteVlog,
        getVlogById,
        getVlogsByCreator,
        addCommentToVlog,
        currentUser: CURRENT_USER,
        allCreators: SUBSCRIBED_CREATORS
      }}
    >
      {children}
    </VlogContext.Provider>
  );
};

export const useVlogs = () => {
  const context = useContext(VlogContext);
  if (!context) {
    throw new Error('useVlogs must be used within a VlogProvider');
  }
  return context;
};
