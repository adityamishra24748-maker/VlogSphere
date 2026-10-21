import express from 'express';
import cors from 'cors';

// Route imports
import authRoutes from './routes/authRoutes.js';
import vlogRoutes from './routes/vlogRoutes.js';
import userRoutes from './routes/userRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';

// Error Middleware imports
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

// Global Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'VlogSphere REST API Server is healthy and online.',
    service: 'VlogSphere API Server',
    database: 'MongoDB Atlas',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/vlogs', vlogRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// 404 & Centralized Error Handlers
app.use(notFound);
app.use(errorHandler);

export default app;
