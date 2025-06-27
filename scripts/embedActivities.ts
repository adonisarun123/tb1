import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

// Load environment variables
dotenv.config();

// Initialize clients with environment variables
const supabase = createClient(
  process.env.VITE_SUPABASE_URL || "https://yrppmcoycmydrujbesnd.supabase.co",
  process.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycHBtY295Y215ZHJ1amJlc25kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxMDY5OTEsImV4cCI6MjA1NDY4Mjk5MX0.ZbLPKtUGitTBgor2zzr_7L-FOZ-55IL3RaWJj-7aDW0"
);

const pinecone = new Pinecone({
  apiKey: process.env.VITE_PINECONE_API_KEY!,
});

const openaiClient = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY!,
});

const indexName = process.env.VITE_PINECONE_INDEX_NAME || 'trebound-activities';

// Enhanced retry logic
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries) {
        throw error;
      }
      
      const delay = baseDelay * Math.pow(2, i) + Math.random() * 1000;
      console.log(`❌ Attempt ${i + 1} failed, retrying in ${Math.round(delay)}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Max retries exceeded');
}

// Generate embedding for text content with retry
async function generateEmbedding(text: string): Promise<number[]> {
  return retryWithBackoff(async () => {
    const response = await openaiClient.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });
    
    return response.data[0].embedding;
  }, 3, 2000);
}

// Get Pinecone index
async function getIndex() {
  try {
    return pinecone.index(indexName);
  } catch (error) {
    console.error('Error getting Pinecone index:', error);
    throw error;
  }
}

// Check if content already exists in Pinecone
async function checkExistingContent(index: any, ids: string[]): Promise<string[]> {
  try {
    const response = await index.fetch(ids);
    const existingIds = Object.keys(response.records || {});
    return ids.filter(id => !existingIds.includes(id));
  } catch (error) {
    console.log('Could not check existing content, proceeding with all items');
    return ids;
  }
}

// Embed activities from Supabase with resume capability
async function embedActivities() {
  try {
    console.log('🔄 Fetching activities from Supabase...');
    
    const { data: activities, error } = await supabase
      .from('activities')
      .select('*');

    if (error) {
      console.error('Error fetching activities:', error);
      return;
    }

    if (!activities || activities.length === 0) {
      console.log('No activities found in database');
      return;
    }

    console.log(`📊 Found ${activities.length} activities to embed`);

    const index = await getIndex();
    
    // Check which activities already exist
    const activityIds = activities.map(a => `activity_${a.id}`);
    const missingIds = await checkExistingContent(index, activityIds);
    const missingActivities = activities.filter(a => missingIds.includes(`activity_${a.id}`));
    
    if (missingActivities.length === 0) {
      console.log('✅ All activities already embedded');
      return;
    }

    console.log(`📝 Need to embed ${missingActivities.length} activities`);

    const batchSize = 5; // Reduced batch size for better reliability
    let processedCount = 0;

    for (let i = 0; i < missingActivities.length; i += batchSize) {
      const batch = missingActivities.slice(i, i + batchSize);
      const vectors: any[] = [];

      for (const activity of batch) {
        try {
          // Create comprehensive text for embedding
          const textContent = [
            activity.name,
            activity.activity_description,
            activity.activity_type,
            activity.group_size,
            activity.duration,
            activity.location,
            activity.industry,
            activity.tags,
            activity.objectives
          ].filter(Boolean).join(' ');

          const embedding = await generateEmbedding(textContent);

          vectors.push({
            id: `activity_${activity.id}`,
            values: embedding,
            metadata: {
              type: 'activity',
              name: activity.name,
              description: activity.activity_description,
              activity_type: activity.activity_type,
              group_size: activity.group_size,
              duration: activity.duration,
              location: activity.location,
              slug: activity.slug,
              main_image: activity.main_image,
              rating: activity.rating || '4.8'
            }
          });

          processedCount++;
        } catch (error) {
          console.error(`Error processing activity ${activity.id}:`, error);
        }
      }

      if (vectors.length > 0) {
        await retryWithBackoff(async () => {
          await index.upsert(vectors);
        }, 3, 2000);
        console.log(`✅ Uploaded batch ${Math.floor(i / batchSize) + 1} (${vectors.length} activities)`);
      }

      // Rate limiting with longer delay
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log(`🎉 Successfully embedded ${processedCount} activities`);
  } catch (error) {
    console.error('Error in embedActivities:', error);
    throw error;
  }
}

// Embed venues/stays from Supabase with resume capability
async function embedVenues() {
  try {
    console.log('🔄 Fetching venues from Supabase...');
    
    const { data: venues, error } = await supabase
      .from('stays')
      .select('*');

    if (error) {
      console.error('Error fetching venues:', error);
      return;
    }

    if (!venues || venues.length === 0) {
      console.log('No venues found in database');
      return;
    }

    console.log(`📊 Found ${venues.length} venues to embed`);

    const index = await getIndex();
    
    // Check which venues already exist
    const venueIds = venues.map(v => `venue_${v.id}`);
    const missingIds = await checkExistingContent(index, venueIds);
    const missingVenues = venues.filter(v => missingIds.includes(`venue_${v.id}`));
    
    if (missingVenues.length === 0) {
      console.log('✅ All venues already embedded');
      return;
    }

    console.log(`📝 Need to embed ${missingVenues.length} venues`);

    const batchSize = 5; // Reduced batch size for better reliability
    let processedCount = 0;

    for (let i = 0; i < missingVenues.length; i += batchSize) {
      const batch = missingVenues.slice(i, i + batchSize);
      const vectors: any[] = [];

      for (const venue of batch) {
        try {
          // Create comprehensive text for embedding
          const textContent = [
            venue.name,
            venue.stay_description,
            venue.tagline,
            venue.location,
            venue.destination,
            venue.facilities,
            venue.special_activities,
            venue.location_plain_text
          ].filter(Boolean).join(' ');

          const embedding = await generateEmbedding(textContent);

          vectors.push({
            id: `venue_${venue.id}`,
            values: embedding,
            metadata: {
              type: 'venue',
              name: venue.name,
              description: venue.stay_description || venue.tagline,
              location: venue.location || venue.destination,
              slug: venue.slug,
              image: venue.stay_image || venue.banner_image_url || venue.image_url,
              facilities: venue.facilities,
              activities: venue.special_activities,
              capacity: venue.total_room_value || '50-200',
              rating: '4.7'
            }
          });

          processedCount++;
        } catch (error) {
          console.error(`Error processing venue ${venue.id}:`, error);
        }
      }

      if (vectors.length > 0) {
        await retryWithBackoff(async () => {
          await index.upsert(vectors);
        }, 3, 2000);
        console.log(`✅ Uploaded batch ${Math.floor(i / batchSize) + 1} (${vectors.length} venues) - ${processedCount}/${missingVenues.length} total`);
      }

      // Rate limiting with longer delay
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log(`🎉 Successfully embedded ${processedCount} venues`);
  } catch (error) {
    console.error('Error in embedVenues:', error);
    throw error;
  }
}

// Embed destinations (create from unique locations) with resume capability
async function embedDestinations() {
  try {
    console.log('🔄 Creating destination embeddings...');
    
    // Get unique destinations from venues
    const { data: venues, error } = await supabase
      .from('stays')
      .select('destination, location')
      .not('destination', 'is', null);

    if (error) {
      console.error('Error fetching destinations:', error);
      return;
    }

    // Create unique destinations
    const destinationMap = new Map();
    venues?.forEach(venue => {
      if (venue.destination) {
        const key = venue.destination.toLowerCase().trim();
        if (!destinationMap.has(key)) {
          destinationMap.set(key, {
            name: venue.destination,
            location: venue.location || venue.destination,
            venues_count: 1
          });
        } else {
          destinationMap.get(key).venues_count++;
        }
      }
    });

    const destinations = Array.from(destinationMap.values());
    console.log(`📊 Found ${destinations.length} unique destinations to embed`);

    const index = await getIndex();
    
    // Check which destinations already exist
    const destinationIds = destinations.map(d => `destination_${d.name.toLowerCase().replace(/\s+/g, '_')}`);
    const missingIds = await checkExistingContent(index, destinationIds);
    const missingDestinations = destinations.filter(d => 
      missingIds.includes(`destination_${d.name.toLowerCase().replace(/\s+/g, '_')}`)
    );
    
    if (missingDestinations.length === 0) {
      console.log('✅ All destinations already embedded');
      return;
    }

    console.log(`📝 Need to embed ${missingDestinations.length} destinations`);

    const vectors: any[] = [];
    let processedCount = 0;

    for (const destination of missingDestinations) {
      try {
        // Create comprehensive text for embedding
        const textContent = [
          destination.name,
          destination.location,
          `${destination.venues_count} venues available`,
          `team building destination`,
          `corporate retreat location`,
          `team outing place`
        ].join(' ');

        const embedding = await generateEmbedding(textContent);

        vectors.push({
          id: `destination_${destination.name.toLowerCase().replace(/\s+/g, '_')}`,
          values: embedding,
          metadata: {
            type: 'destination',
            name: destination.name,
            description: `Popular destination with ${destination.venues_count} venues for team building and corporate events`,
            location: destination.location,
            slug: destination.name.toLowerCase().replace(/\s+/g, '-'),
            capacity: `${destination.venues_count}+ venues available`,
            rating: '4.6'
          }
        });

        processedCount++;
      } catch (error) {
        console.error(`Error processing destination ${destination.name}:`, error);
      }
    }

    if (vectors.length > 0) {
      await retryWithBackoff(async () => {
        await index.upsert(vectors);
      }, 3, 2000);
      console.log(`✅ Uploaded ${vectors.length} destinations`);
    }

    console.log(`🎉 Successfully embedded ${processedCount} destinations`);
  } catch (error) {
    console.error('Error in embedDestinations:', error);
    throw error;
  }
}

// Embed blog posts from Supabase with resume capability
async function embedBlogPosts() {
  try {
    console.log('🔄 Fetching blog posts from Supabase...');
    
    const { data: blogPosts, error } = await supabase
      .from('blog_posts')
      .select('*');

    if (error) {
      console.error('Error fetching blog posts:', error);
      return;
    }

    if (!blogPosts || blogPosts.length === 0) {
      console.log('No blog posts found in database');
      return;
    }

    console.log(`📊 Found ${blogPosts.length} blog posts to embed`);

    const index = await getIndex();
    
    // Check which blog posts already exist
    const blogIds = blogPosts.map(b => `blog_${b.id}`);
    const missingIds = await checkExistingContent(index, blogIds);
    const missingBlogPosts = blogPosts.filter(b => missingIds.includes(`blog_${b.id}`));
    
    if (missingBlogPosts.length === 0) {
      console.log('✅ All blog posts already embedded');
      return;
    }

    console.log(`📝 Need to embed ${missingBlogPosts.length} blog posts`);

    const batchSize = 5;
    let processedCount = 0;

    for (let i = 0; i < missingBlogPosts.length; i += batchSize) {
      const batch = missingBlogPosts.slice(i, i + batchSize);
      const vectors: any[] = [];

      for (const post of batch) {
        try {
          // Strip HTML tags from post body for embedding
          const cleanPostBody = post.post_body?.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() || '';
          
          // Create comprehensive text for embedding
          const textContent = [
            post.name,
            post.small_description,
            cleanPostBody.substring(0, 2000), // Limit body content
            post.blog_post_tags,
            post.author,
            'team building blog',
            'corporate insights'
          ].filter(Boolean).join(' ');

          const embedding = await generateEmbedding(textContent);

          vectors.push({
            id: `blog_${post.id}`,
            values: embedding,
            metadata: {
              type: 'blog',
              name: post.name,
              description: post.small_description,
              author: post.author,
              slug: post.slug,
              image: post.thumbnail_image || post.main_image,
              tags: post.blog_post_tags,
              published_date: post.published_on,
              rating: '4.5'
            }
          });

          processedCount++;
        } catch (error) {
          console.error(`Error processing blog post ${post.id}:`, error);
        }
      }

      if (vectors.length > 0) {
        await retryWithBackoff(async () => {
          await index.upsert(vectors);
        }, 3, 2000);
        console.log(`✅ Uploaded batch ${Math.floor(i / batchSize) + 1} (${vectors.length} blog posts) - ${processedCount}/${missingBlogPosts.length} total`);
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log(`🎉 Successfully embedded ${processedCount} blog posts`);
  } catch (error) {
    console.error('Error in embedBlogPosts:', error);
    throw error;
  }
}

// Embed landing pages from Supabase with resume capability
async function embedLandingPages() {
  try {
    console.log('🔄 Fetching landing pages from Supabase...');
    
    const { data: landingPages, error } = await supabase
      .from('landing_pages')
      .select('*');

    if (error) {
      console.error('Error fetching landing pages:', error);
      return;
    }

    if (!landingPages || landingPages.length === 0) {
      console.log('No landing pages found in database');
      return;
    }

    console.log(`📊 Found ${landingPages.length} landing pages to embed`);

    const index = await getIndex();
    
    // Check which landing pages already exist
    const pageIds = landingPages.map(p => `landing_${p.id}`);
    const missingIds = await checkExistingContent(index, pageIds);
    const missingPages = landingPages.filter(p => missingIds.includes(`landing_${p.id}`));
    
    if (missingPages.length === 0) {
      console.log('✅ All landing pages already embedded');
      return;
    }

    console.log(`📝 Need to embed ${missingPages.length} landing pages`);

    const batchSize = 5;
    let processedCount = 0;

    for (let i = 0; i < missingPages.length; i += batchSize) {
      const batch = missingPages.slice(i, i + batchSize);
      const vectors: any[] = [];

      for (const page of batch) {
        try {
          // Strip HTML tags from post body for embedding
          const cleanPostBody = page.post_body?.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() || '';
          
          // Create comprehensive text for embedding
          const textContent = [
            page.name,
            page.small_description,
            cleanPostBody.substring(0, 2000), // Limit body content
            'team building page',
            'corporate team activities',
            'team building solutions'
          ].filter(Boolean).join(' ');

          const embedding = await generateEmbedding(textContent);

          vectors.push({
            id: `landing_${page.id}`,
            values: embedding,
            metadata: {
              type: 'landing_page',
              name: page.name,
              description: page.small_description,
              slug: page.slug,
              image: page.thumbnail_image || page.main_image,
              featured: page.featured,
              rating: '4.6'
            }
          });

          processedCount++;
        } catch (error) {
          console.error(`Error processing landing page ${page.id}:`, error);
        }
      }

      if (vectors.length > 0) {
        await retryWithBackoff(async () => {
          await index.upsert(vectors);
        }, 3, 2000);
        console.log(`✅ Uploaded batch ${Math.floor(i / batchSize) + 1} (${vectors.length} landing pages) - ${processedCount}/${missingPages.length} total`);
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log(`🎉 Successfully embedded ${processedCount} landing pages`);
  } catch (error) {
    console.error('Error in embedLandingPages:', error);
    throw error;
  }
}

// Embed corporate team building content from Supabase with resume capability
async function embedCorporateTeambuilding() {
  try {
    console.log('🔄 Fetching corporate team building content from Supabase...');
    
    const { data: corporateContent, error } = await supabase
      .from('corporate_teambuildings')
      .select('*');

    if (error) {
      console.error('Error fetching corporate team building content:', error);
      return;
    }

    if (!corporateContent || corporateContent.length === 0) {
      console.log('No corporate team building content found in database');
      return;
    }

    console.log(`📊 Found ${corporateContent.length} corporate team building pages to embed`);

    const index = await getIndex();
    
    // Check which corporate content already exists
    const corporateIds = corporateContent.map(c => `corporate_${c.id}`);
    const missingIds = await checkExistingContent(index, corporateIds);
    const missingContent = corporateContent.filter(c => missingIds.includes(`corporate_${c.id}`));
    
    if (missingContent.length === 0) {
      console.log('✅ All corporate content already embedded');
      return;
    }

    console.log(`📝 Need to embed ${missingContent.length} corporate content items`);

    const batchSize = 5;
    let processedCount = 0;

    for (let i = 0; i < missingContent.length; i += batchSize) {
      const batch = missingContent.slice(i, i + batchSize);
      const vectors: any[] = [];

      for (const content of batch) {
        try {
          // Create comprehensive text for embedding
          const textContent = [
            content.name,
            content.main_heading,
            content.meta_description,
            content.tagline,
            content.form_cta_heading,
            content.form_cta_paragraph,
            content.target_keyword,
            'corporate team building',
            'team building activities',
            'corporate events'
          ].filter(Boolean).join(' ');

          const embedding = await generateEmbedding(textContent);

          vectors.push({
            id: `corporate_${content.id}`,
            values: embedding,
            metadata: {
              type: 'corporate_teambuilding',
              name: content.name,
              description: content.meta_description || content.tagline,
              slug: content.slug,
              heading: content.main_heading,
              cta_text: content.button_text,
              rating: '4.7'
            }
          });

          processedCount++;
        } catch (error) {
          console.error(`Error processing corporate content ${content.id}:`, error);
        }
      }

      if (vectors.length > 0) {
        await retryWithBackoff(async () => {
          await index.upsert(vectors);
        }, 3, 2000);
        console.log(`✅ Uploaded batch ${Math.floor(i / batchSize) + 1} (${vectors.length} corporate pages) - ${processedCount}/${missingContent.length} total`);
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log(`🎉 Successfully embedded ${processedCount} corporate team building pages`);
  } catch (error) {
    console.error('Error in embedCorporateTeambuilding:', error);
    throw error;
  }
}

// Main function to embed all content types with better error handling
async function embedAllContent() {
  console.log('🚀 Starting comprehensive embedding process...');
  console.log('📋 This will embed: Activities, Venues, Destinations, Blog Posts, Landing Pages, and Corporate Content');
  
  const tasks = [
    { name: 'Activities', fn: embedActivities },
    { name: 'Venues', fn: embedVenues },
    { name: 'Destinations', fn: embedDestinations },
    { name: 'Blog Posts', fn: embedBlogPosts },
    { name: 'Landing Pages', fn: embedLandingPages },
    { name: 'Corporate Content', fn: embedCorporateTeambuilding }
  ];

  let completedTasks = 0;
  let failedTasks = 0;

  for (const task of tasks) {
    try {
      console.log(`\n🔄 Starting ${task.name} embedding...`);
      await task.fn();
      console.log(`✅ ${task.name} embedding completed successfully`);
      completedTasks++;
    } catch (error) {
      console.error(`❌ Error in ${task.name} embedding:`, error);
      console.log(`⏭️ Continuing with next task...`);
      failedTasks++;
    }
  }

  console.log('\n🎯 Embedding process completed!');
  console.log(`📊 Summary: ${completedTasks} completed, ${failedTasks} failed`);
  
  if (completedTasks > 0) {
    console.log('💡 Your AI search now supports:');
    console.log('   - Team building activities');
    console.log('   - Venues and destinations'); 
    console.log('   - Blog posts and insights');
    console.log('   - Team building pages and solutions');
    console.log('   - Corporate team building content');
  }
}

// Run the script if called directly
embedAllContent()
  .then(() => {
    console.log('Embedding script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Embedding script failed:', error);
    process.exit(1);
  }); 