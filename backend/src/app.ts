import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';

import { corsOptions } from './config/cors';
import { limiter } from './config/rateLimit';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';
import { logger } from './utils/logger';

// Routes
import authRoutes from './routes/auth.routes';
import postRoutes from './routes/post.routes';
import projectRoutes from './routes/project.routes';
import contactRoutes from './routes/contact.routes';
import newsletterRoutes from './routes/newsletter.routes';
import mediaRoutes from './routes/media.routes';
import categoryRoutes from './routes/category.routes';
import tagRoutes from './routes/tag.routes';
import adminRoutes from './routes/admin.routes';

const app = express();

// ─── Security ───────────────────────────────────────
app.use(helmet());
app.use(cors(corsOptions));
app.use(limiter);

// ─── Parsing ────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(compression());

// ─── Logging ────────────────────────────────────────
app.use(
  morgan('combined', {
    stream: { write: (msg) => logger.http(msg.trim()) },
  })
);

// ─── Static Files (uploads) ─────────────────────────
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
app.use('/uploads', express.static(path.join(process.cwd(), uploadDir)));

// ─── Health check ───────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    env: process.env.NODE_ENV || 'development',
  });
});

// ─── API Routes ─────────────────────────────────────
const API_PREFIX = '/api/v1';

app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/posts`, postRoutes);
app.use(`${API_PREFIX}/projects`, projectRoutes);
app.use(`${API_PREFIX}/contact`, contactRoutes);
app.use(`${API_PREFIX}/newsletter`, newsletterRoutes);
app.use(`${API_PREFIX}/media`, mediaRoutes);
app.use(`${API_PREFIX}/categories`, categoryRoutes);
app.use(`${API_PREFIX}/tags`, tagRoutes);
app.use(`${API_PREFIX}/admin`, adminRoutes);

// ─── 404 & Error Handler ────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;
