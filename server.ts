import express from 'express';
import cors from 'cors';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import sitemapRouter from './src/api/sitemap';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

// Security middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Middleware
app.use(cors());
app.use(express.json()); // Add JSON parsing middleware
app.use(compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// Cache configuration for different asset types
const cacheConfig = {
  // Long cache for hashed assets (1 year)
  hashedAssets: 'public, max-age=31536000, immutable',
  // Medium cache for images (30 days)
  images: 'public, max-age=2592000',
  // Short cache for HTML and other dynamic content (1 hour)
  html: 'public, max-age=3600',
  // Medium cache for fonts (7 days)
  fonts: 'public, max-age=604800',
  // Short cache for API responses (5 minutes)
  api: 'public, max-age=300'
};

// Serve static files with proper cache headers
app.use('/assets', (req, res, next) => {
  // Assets with hash in filename get long cache
  if (req.url.match(/\-[a-f0-9]{8,}\./)) {
    res.setHeader('Cache-Control', cacheConfig.hashedAssets);
  } else {
    res.setHeader('Cache-Control', cacheConfig.images);
  }
  next();
}, express.static(path.join(__dirname, 'dist/assets')));

// Serve images with proper cache headers
app.use('/images', (req, res, next) => {
  res.setHeader('Cache-Control', cacheConfig.images);
  // Enable modern image format serving
  if (req.headers.accept && req.headers.accept.includes('image/webp')) {
    res.setHeader('Vary', 'Accept');
  }
  next();
}, express.static(path.join(__dirname, 'public/images')));

// Serve fonts with proper cache headers
app.use('/fonts', (req, res, next) => {
  res.setHeader('Cache-Control', cacheConfig.fonts);
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
}, express.static(path.join(__dirname, 'dist/fonts')));

// Serve other public assets
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', cacheConfig.html);
    } else if (path.match(/\.(jpg|jpeg|png|gif|webp|avif|svg|ico)$/i)) {
      res.setHeader('Cache-Control', cacheConfig.images);
    } else {
      res.setHeader('Cache-Control', cacheConfig.images);
    }
  }
}));

// Serve built app
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', cacheConfig.html);
    } else if (path.match(/\.(js|css)$/)) {
      if (path.includes('-')) {
        res.setHeader('Cache-Control', cacheConfig.hashedAssets);
      } else {
        res.setHeader('Cache-Control', cacheConfig.html);
      }
    }
  }
}));

// Routes
app.use('/', sitemapRouter);

// Handle client-side routing - serve index.html for all non-API routes
app.get('*', (req, res) => {
  // Don't serve HTML for API routes
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  res.setHeader('Cache-Control', cacheConfig.html);
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 