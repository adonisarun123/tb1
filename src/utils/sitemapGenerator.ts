import { supabase } from '../lib/supabaseClient';

interface SitemapURL {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const BASE_URL = 'https://www.trebound.com';

// Static routes with their priorities and change frequencies
const staticRoutes: SitemapURL[] = [
  // Core pages
  { loc: '/', priority: 1.0, changefreq: 'weekly' },
  { loc: '/about', priority: 0.8, changefreq: 'monthly' },
  { loc: '/contact', priority: 0.7, changefreq: 'monthly' },
  { loc: '/thank-you', priority: 0.5, changefreq: 'yearly' },
  { loc: '/privacy-policy', priority: 0.5, changefreq: 'yearly' },
  { loc: '/terms-and-conditions', priority: 0.5, changefreq: 'yearly' },
  
  // Main service pages
  { loc: '/team-outing-regions', priority: 0.9, changefreq: 'weekly' },
  { loc: '/corporate-team-outing-places', priority: 0.9, changefreq: 'weekly' },
  { loc: '/stays', priority: 0.8, changefreq: 'weekly' },
  { loc: '/team-outings', priority: 0.8, changefreq: 'weekly' },
  { loc: '/team-building-activity', priority: 0.8, changefreq: 'weekly' },
  { loc: '/teambuilding', priority: 0.9, changefreq: 'weekly' },
  { loc: '/corporate-teambuilding', priority: 0.9, changefreq: 'weekly' },
  { loc: '/customized-training', priority: 0.8, changefreq: 'weekly' },
  
  // Blog and Jobs
  { loc: '/blog', priority: 0.8, changefreq: 'daily' },
  { loc: '/jobs', priority: 0.7, changefreq: 'daily' },
  
  // Virtual and Online Activities
  { loc: '/virtual-team-building', priority: 0.8, changefreq: 'weekly' },
  { loc: '/virtual-team-building-activities-for-the-holiday-season', priority: 0.7, changefreq: 'monthly' },
  { loc: '/fun-virtual-team-building-games', priority: 0.7, changefreq: 'weekly' },
  { loc: '/online-team-building-activities-for-digital-workspaces', priority: 0.7, changefreq: 'weekly' },
  { loc: '/virtual-escape-room-teambuilding-activity-trebound', priority: 0.7, changefreq: 'weekly' },
  { loc: '/virtual-team-building-icebreaker-games', priority: 0.7, changefreq: 'weekly' },
  
  // Outbound and Outdoor Activities
  { loc: '/outbound-teambuilding-activities', priority: 0.8, changefreq: 'weekly' },
  { loc: '/exciting-outdoor-team-building-activities', priority: 0.7, changefreq: 'weekly' },
  { loc: '/corporate-team-outbound-training', priority: 0.7, changefreq: 'weekly' },
  
  // Team Building Games and Activities
  { loc: '/team-building-games', priority: 0.8, changefreq: 'weekly' },
  { loc: '/corporate-team-building-games', priority: 0.7, changefreq: 'weekly' },
  { loc: '/icebreaker-games', priority: 0.7, changefreq: 'weekly' },
  { loc: '/team-collaboration-games', priority: 0.7, changefreq: 'weekly' },
  { loc: '/top-team-building-activities', priority: 0.7, changefreq: 'weekly' },
  { loc: '/top-team-building-activities-for-large-groups', priority: 0.7, changefreq: 'weekly' },
  { loc: '/team-building-activities-for-small-groups', priority: 0.7, changefreq: 'weekly' },
  
  // Corporate Team Outings
  { loc: '/corporate-team-outings', priority: 0.8, changefreq: 'weekly' },
  { loc: '/corporate-team-offsite', priority: 0.7, changefreq: 'weekly' },
  { loc: '/plan-your-team-offsite-today', priority: 0.7, changefreq: 'weekly' },
  
  // Location-specific pages
  { loc: '/corporate-team-outing-in-bangalore', priority: 0.8, changefreq: 'weekly' },
  { loc: '/corporate-team-building-activities-in-mumbai', priority: 0.7, changefreq: 'weekly' },
  { loc: '/corporate-team-building-activities-in-hyderabad', priority: 0.7, changefreq: 'weekly' },
  { loc: '/corporate-team-building-activities', priority: 0.7, changefreq: 'weekly' },
  { loc: '/team-building-activities-in-bangalore', priority: 0.7, changefreq: 'weekly' },
  { loc: '/team-outing-places-in-hyderabad', priority: 0.7, changefreq: 'weekly' },
  { loc: '/team-outing-places-in-bangalore', priority: 0.7, changefreq: 'weekly' },
  { loc: '/team-outing-resorts-in-bangalore', priority: 0.7, changefreq: 'weekly' },
  { loc: '/corporate-team-outing-places-in-hyderabad', priority: 0.7, changefreq: 'weekly' },
  { loc: '/corporate-team-outing-places-in-bangalore', priority: 0.7, changefreq: 'weekly' },
  
  // Resort and Stay pages
  { loc: '/one-day-outing-in-bangalore', priority: 0.7, changefreq: 'weekly' },
  { loc: '/one-day-outing-resorts-in-hyderabad', priority: 0.7, changefreq: 'weekly' },
  { loc: '/overnight-team-outing-near-bangalore', priority: 0.7, changefreq: 'weekly' },
  { loc: '/resorts-around-bangalore', priority: 0.7, changefreq: 'weekly' },
  { loc: '/discover-the-perfect-setting-for-your-team-in-bangalore', priority: 0.7, changefreq: 'weekly' },
  
  // Engagement and Special Activities
  { loc: '/team-engagement-activities', priority: 0.7, changefreq: 'weekly' },
  { loc: '/high-engaging-team-building-activities', priority: 0.7, changefreq: 'weekly' },
  { loc: '/high-engagement-team-building-activities', priority: 0.7, changefreq: 'weekly' },
  { loc: '/fun-indoor-team-building-activities', priority: 0.7, changefreq: 'weekly' },
  
  // Special Programs and Services
  { loc: '/corporate-gifting', priority: 0.6, changefreq: 'monthly' },
  { loc: '/campus-to-corporate', priority: 0.6, changefreq: 'monthly' },
  { loc: '/global-partner-registration', priority: 0.6, changefreq: 'monthly' },
  { loc: '/amdocs', priority: 0.6, changefreq: 'monthly' },
  
  // Guidelines and Information
  { loc: '/onground-dos-donts', priority: 0.6, changefreq: 'monthly' },
  { loc: '/virtual-dos-donts', priority: 0.6, changefreq: 'monthly' },
  
  // Special Long URL
  { loc: '/return-to-office-2022-welcome-your-employees-back-to-office-with-an-amazing-fun-experience', priority: 0.6, changefreq: 'yearly' },
];

// Function to escape special characters in XML
const escapeXml = (unsafe: string): string => {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
};

// Function to format date for sitemap
const formatDate = (date: Date): string => {
  return date.toISOString();
};

// Function to generate sitemap URL entry
const generateUrlEntry = ({ loc, lastmod, changefreq, priority }: SitemapURL): string => {
  let entry = `  <url>\n    <loc>${escapeXml(BASE_URL + loc)}</loc>\n`;
  if (lastmod) entry += `    <lastmod>${lastmod}</lastmod>\n`;
  if (changefreq) entry += `    <changefreq>${changefreq}</changefreq>\n`;
  if (priority) entry += `    <priority>${priority}</priority>\n`;
  entry += '  </url>';
  return entry;
};

// Function to fetch dynamic routes from database
const fetchDynamicRoutes = async (): Promise<SitemapURL[]> => {
  const dynamicRoutes: SitemapURL[] = [];

  // Fetch blog posts
  const { data: blogPosts } = await supabase
    .from('blog_posts')
    .select('slug, updated_on, published_on')
    .not('published_on', 'is', null);

  blogPosts?.forEach(post => {
    dynamicRoutes.push({
      loc: `/blog/${post.slug}`,
      lastmod: formatDate(new Date(post.updated_on || post.published_on)),
      changefreq: 'monthly',
      priority: 0.7
    });
  });

  // Fetch stays
  const { data: stays } = await supabase
    .from('stays')
    .select('slug, updated_at');

  stays?.forEach(stay => {
    dynamicRoutes.push({
      loc: `/stays/${stay.slug}`,
      lastmod: stay.updated_at ? formatDate(new Date(stay.updated_at)) : undefined,
      changefreq: 'weekly',
      priority: 0.7
    });
  });

  // Fetch activities
  const { data: activities } = await supabase
    .from('activities')
    .select('slug, updated_at, published_at')
    .not('published_at', 'is', null);

  activities?.forEach(activity => {
    dynamicRoutes.push({
      loc: `/team-building-activity/${activity.slug}`,
      lastmod: formatDate(new Date(activity.updated_at || activity.published_at)),
      changefreq: 'weekly',
      priority: 0.7
    });
  });

  // Fetch destinations
  const { data: destinations } = await supabase
    .from('destinations')
    .select('slug, updated_at, published_at')
    .not('published_at', 'is', null);

  destinations?.forEach(destination => {
    dynamicRoutes.push({
      loc: `/corporate-team-outing-places/${destination.slug}`,
      lastmod: formatDate(new Date(destination.updated_at || destination.published_at)),
      changefreq: 'weekly',
      priority: 0.8
    });
  });

  // Fetch regions
  const { data: regions } = await supabase
    .from('regions')
    .select('slug, updated_at, published_at')
    .not('published_at', 'is', null);

  regions?.forEach(region => {
    dynamicRoutes.push({
      loc: `/team-outing-regions/${region.slug}`,
      lastmod: formatDate(new Date(region.updated_at || region.published_at)),
      changefreq: 'weekly',
      priority: 0.8
    });
  });

  // Fetch team building pages
  const { data: teamBuilding } = await supabase
    .from('corporate_teambuildings')
    .select('slug, updated_at');

  teamBuilding?.forEach(page => {
    dynamicRoutes.push({
      loc: `/corporate-teambuilding/${page.slug}`,
      lastmod: page.updated_at ? formatDate(new Date(page.updated_at)) : undefined,
      changefreq: 'weekly',
      priority: 0.8
    });
  });

  // Fetch customized training pages
  const { data: trainings } = await supabase
    .from('customized_trainings')
    .select('slug, updated_at');

  trainings?.forEach(training => {
    dynamicRoutes.push({
      loc: `/customized-training/${training.slug}`,
      lastmod: training.updated_at ? formatDate(new Date(training.updated_at)) : undefined,
      changefreq: 'weekly',
      priority: 0.8
    });
  });

  return dynamicRoutes;
};

// Main function to generate sitemap
export const generateSitemap = async (): Promise<string> => {
  const dynamicRoutes = await fetchDynamicRoutes();
  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const urlEntries = allRoutes.map(generateUrlEntry).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}; 