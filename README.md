# 🎬 VlogSphere - Full-Stack MERN Vlogging Platform

> **College Portfolio Project**  
> **Author**: Alex Rivera (Senior MERN Developer)  
> **Frontend**: React 18, React Router v6, Vite, Tailwind CSS, Lucide React  
> **Backend**: Node.js, Express.js, MongoDB + Mongoose, Cloudinary, JWT, Multer  

---

## 🌟 Overview

**VlogSphere** is a modern video-sharing ecosystem and creator platform. It features complete client-side routing, an interactive video player, creator channel profiles, a studio analytics dashboard with SVG performance curves, and a RESTful backend API powered by Express, MongoDB, and Cloudinary.

### 🛡️ Dual-Mode Operation (Senior Portfolio Pattern)
- **Live Connected Mode**: When the Express server is running on port 5000 and connected to MongoDB, all authentication, vlog uploads, likes, and comments persist into MongoDB.
- **Graceful Offline Fallback**: If MongoDB or the Express server is offline, the client-side API layer smoothly falls back to realistic curated in-memory mock data so the platform **never crashes or displays empty error screens during college presentations or grading!**

---

## 🗺️ Route & Component Architecture

### Frontend Pages
| Route | Page | Purpose & Features |
|---|---|---|
| `/` | **Home** | Category pills filtering, Featured Creator Spotlight banner, responsive video grid, loading skeletons. |
| `/explore` | **Explore & Trending** | Trending leaderboard with podium medals (🥇 #1, 🥈 #2, 🥉 #3), top creators directory, and topic exploration cards. |
| `/watch/:id` | **Video Watch** | Dedicated HTML5 player with stream controls, like/dislike counts, subscribe button, expandable description, interactive real-time comments, and up-next recommendations. |
| `/login` | **Login** | Form validation (email pattern & password length), error banners, loading spinner, and **1-Click Demo Login as Alex Rivera (Pro Creator)**. |
| `/signup` | **Signup** | Full channel registration, handle format validation (`@handle`), password matching, and Terms agreement check. |
| `/upload` | **Upload Vlog** | Creator studio upload page with drag-and-drop dropzone, upload progress simulation, title/description validation, category selector, live tag chips, and thumbnail picker. Auto-redirects to `/watch/:id` upon publish! |
| `/creator/:handle` | **Creator Profile** | Dynamic channel page with wide banner, avatar with verified badge, subscriber count, total views, vlogs grid, and about/gear breakdown. |
| `/dashboard` | **Creator Studio** | Analytics metrics (Views, Watch Time, Subscribers, Revenue), 28-day audience growth SVG area chart, and content management table with delete actions. |
| `/watch-later` | **Watch Later & Liked** | Saved video queue, toggle between Watch Later and Liked vlogs, "Play All" CTA, and remove buttons with empty states. |
| `*` | **Not Found (404)** | Polished 404 page with return home and explore links. |

---

## 📡 Backend REST API Endpoints

### 🔐 Authentication (`/api/auth`)
- `POST /api/auth/signup` — Register new creator channel (hashes password with `bcryptjs`, returns JWT).
- `POST /api/auth/login` — Authenticate creator credentials, returns user profile + JWT.
- `GET /api/auth/me` — Protected route returning authenticated creator session.

### 📹 Vlogs (`/api/vlogs`)
- `GET /api/vlogs` — Retrieve public vlogs with query filters (`?category=Travel&search=tokyo&sort=trending`).
- `GET /api/vlogs/:id` — Retrieve single vlog by ID, auto-increments views counter, populates creator and comments.
- `POST /api/vlogs` — Protected endpoint to upload a new vlog (supports Cloudinary direct buffer streaming or custom URLs).
- `DELETE /api/vlogs/:id` — Protected endpoint to delete a vlog (creator ownership verified).
- `POST /api/vlogs/:id/like` — Protected endpoint to toggle like status.
- `POST /api/vlogs/:id/comments` — Protected endpoint to post a comment on a vlog.

### 👤 Creators & Channels (`/api/users`)
- `GET /api/users/:handle` — Retrieve creator channel profile, subscriber count, total views, and uploaded vlogs.
- `POST /api/users/:handle/subscribe` — Protected endpoint to subscribe or unsubscribe from a channel.
- `GET /api/users/dashboard/stats` — Protected endpoint returning aggregated studio analytics and uploaded videos list.

### 🏥 System (`/api/health`)
- `GET /api/health` — Health check endpoint returning server status and uptime timestamp.

---

## 📂 Project Directory Structure

```
vlogsphere/
├── index.html                   # HTML5 Entrypoint with Google Fonts
├── package.json                 # Frontend dependencies & full-stack scripts
├── vite.config.js               # Vite config with /api proxy to http://localhost:5000
├── tailwind.config.js           # Tailwind configuration (dark mode, custom palette)
├── postcss.config.js            # PostCSS configuration
├── README.md                    # Project documentation
├── server/                      # ─── BACKEND (Node.js + Express + MongoDB) ───
│   ├── package.json             # Backend dependencies (express, mongoose, jwt, etc.)
│   ├── server.js                # Express app entrypoint & route mounting
│   ├── seed.js                  # Database seeder script
│   ├── .env                     # Backend environment configuration
│   ├── .env.example             # Environment template
│   ├── config/
│   │   ├── db.js                # MongoDB connection handler
│   │   └── cloudinary.js        # Cloudinary SDK & buffer upload utility
│   ├── models/
│   │   ├── User.js              # User & Creator Mongoose model with bcrypt
│   │   ├── Video.js             # Video Mongoose model with text search index
│   │   └── Comment.js           # Comment Mongoose model
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT verification middleware (protect)
│   │   └── uploadMiddleware.js  # Multer memory storage middleware
│   ├── controllers/
│   │   ├── authController.js    # Signup, login, getMe handlers
│   │   ├── vlogController.js    # Vlog CRUD, like, and comment handlers
│   │   └── userController.js    # Creator profile, subscription & dashboard stats
│   └── routes/
│       ├── authRoutes.js        # /api/auth routes
│       ├── vlogRoutes.js        # /api/vlogs routes
│       └── userRoutes.js        # /api/users routes
└── src/                         # ─── FRONTEND (React 18 + Vite + Tailwind) ───
    ├── main.jsx                 # React root renderer
    ├── App.jsx                  # Main router setup with 10 routes
    ├── index.css                # Global styles, scrollbar styling, Tailwind directives
    ├── services/
    │   └── api.js               # Full-stack API client with JWT headers & offline fallback
    ├── context/
    │   ├── AuthContext.jsx      # Auth state, login/signup/demo connected to backend
    │   ├── ThemeContext.jsx     # Dark / Light theme provider & localStorage hook
    │   └── VlogContext.jsx      # Video state & interactions connected to backend API
    ├── data/
    │   └── mockVlogs.js         # Realistic vlogs, creators & profile fallback dataset
    ├── pages/
    │   ├── HomePage.jsx         # Homepage with pills & spotlight
    │   ├── ExplorePage.jsx      # Trending leaderboard & creator directory
    │   ├── WatchPage.jsx        # Dedicated video player with comments & related
    │   ├── LoginPage.jsx        # Validated login & 1-click demo login
    │   ├── SignupPage.jsx       # Validated channel registration form
    │   ├── UploadPage.jsx       # Dedicated upload studio with dropzone
    │   ├── CreatorProfilePage.jsx # Channel profile with banner & stats
    │   ├── DashboardPage.jsx    # Studio analytics & content management table
    │   ├── WatchLaterPage.jsx   # Watch Later & Liked queues
    │   └── NotFoundPage.jsx     # 404 error page
    └── components/
        ├── Navbar.jsx               # Header, search, theme toggle & action buttons
        ├── Sidebar.jsx              # Responsive collapsible sidebar & mobile drawer
        ├── CategoryPills.jsx        # Horizontal scrolling category filter chips
        ├── FeaturedBanner.jsx       # Hero creator spotlight on homepage
        ├── VideoGrid.jsx            # Dynamic responsive grid with empty state
        ├── VideoCard.jsx            # Individual video item with hover animations
        ├── WatchModal.jsx           # Theater modal with video player & comments
        ├── UploadModal.jsx          # Upload modal with drag & drop
        ├── LoadingSkeleton.jsx      # Pulse loading skeletons
        ├── NotificationDropdown.jsx # Dropdown showing creator notifications
        └── ProfileDropdown.jsx      # Dropdown showing user profile & stats
```

---

## 🛠️ Step-by-Step Running Instructions

### 1. Start the Backend Server (Terminal 1)
```powershell
cd C:\Users\asus\.gemini\antigravity\scratch\vlogsphere
npm run server
```
*Output:*
```
🎬 VlogSphere Backend API running on http://localhost:5000
📡 Health Check: http://localhost:5000/api/health
```

### 2. Start the Frontend Development Client (Terminal 2)
```powershell
cd C:\Users\asus\.gemini\antigravity\scratch\vlogsphere
npm run dev
```
Open **`http://localhost:3000`** in your browser. All API requests to `/api` are automatically proxied to the Express backend!

### 3. (Optional) Seed MongoDB Database
If you have a local MongoDB instance running (or MongoDB Atlas connection string in `server/.env`):
```powershell
cd C:\Users\asus\.gemini\antigravity\scratch\vlogsphere
npm run seed
```

### 4. Build for Production
```powershell
cd C:\Users\asus\.gemini\antigravity\scratch\vlogsphere
npm run build
```
Builds an optimized production bundle in `dist/` in ~3.8 seconds.
