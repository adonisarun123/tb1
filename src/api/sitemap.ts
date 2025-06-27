import { generateSitemap } from '../utils/sitemapGenerator';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/sitemap.xml', async (_req: Request, res: Response) => {
  try {
    const sitemap = await generateSitemap();
    
    // Set headers
    res.header('Content-Type', 'application/xml');
    res.header('Content-Encoding', 'gzip');
    res.header('Cache-Control', 'public, max-age=1800'); // Cache for 30 minutes
    
    // Send the sitemap
    res.send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
});

export default router; 