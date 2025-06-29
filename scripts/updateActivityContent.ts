import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '.env.local'), override: true });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase environment variables not found!');
  console.error('Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Interface for activity data
interface Activity {
  id: number;
  slug: string;
  name: string;
  small_description?: string;
  meta_description?: string;
  description?: string;
  tagline?: string;
  activity_description?: string;
}

// Interface for landing page data
interface LandingPage {
  id: number;
  slug: string;
  name: string;
  small_description?: string;
  meta_description?: string;
  description?: string;
  tagline?: string;
  post_body?: string;
}

// Function to remove "Engineer Your Way to Success:" from text
const removeEngineerLine = (text: string): string => {
  if (!text) return text;
  
  // Remove variations of the line
  const patterns = [
    /Engineer Your Way to Success:\s*/gi,
    /Engineer Your Way to Success\s*/gi,
    /Engineer Your Way to Success:/gi,
  ];
  
  let cleanedText = text;
  patterns.forEach(pattern => {
    cleanedText = cleanedText.replace(pattern, '');
  });
  
  // Clean up any extra whitespace or line breaks
  cleanedText = cleanedText.trim().replace(/^\s*\n/, '');
  
  return cleanedText;
};

// Function to check and update activities table
async function updateActivitiesTable(): Promise<boolean> {
  console.log('🔍 Searching ALL activities for "Engineer Your Way to Success:" text...');
  let updated = false;

  try {
    // Get ALL activities (remove the filter)
    const { data: activities, error } = await supabase
      .from('activities')
      .select('*');

    if (error) {
      console.error('❌ Error fetching activities:', error);
      return false;
    }

    if (!activities || activities.length === 0) {
      console.log('❌ No activities found');
      return false;
    }

    console.log(`✅ Found ${activities.length} activities to check`);

    for (const activity of activities) {
      console.log(`\n📝 Processing: ${activity.name} (ID: ${activity.id})`);
      
      const updates: Partial<Activity> = {};
      let hasChanges = false;

      // Check each possible field for the text
      const fieldsToCheck = ['small_description', 'meta_description', 'description', 'tagline', 'activity_description'];
      
      fieldsToCheck.forEach(field => {
        const originalValue = activity[field];
        if (originalValue && typeof originalValue === 'string') {
          const cleanedValue = removeEngineerLine(originalValue);
          if (cleanedValue !== originalValue) {
            console.log(`   🔧 Found "Engineer Your Way to Success:" in ${field}`);
            console.log(`   📄 Original: ${originalValue.substring(0, 100)}...`);
            console.log(`   ✨ Updated:  ${cleanedValue.substring(0, 100)}...`);
            updates[field] = cleanedValue;
            hasChanges = true;
          }
        }
      });

      if (hasChanges) {
        // Update the activity
        const { error: updateError } = await supabase
          .from('activities')
          .update(updates)
          .eq('id', activity.id);

        if (updateError) {
          console.error(`❌ Error updating activity ${activity.id}:`, updateError);
        } else {
          console.log(`✅ Successfully updated activity: ${activity.name}`);
          updated = true;
        }
      } else {
        console.log(`ℹ️  No "Engineer Your Way to Success:" text found in ${activity.name}`);
      }
    }

    return updated;
  } catch (error) {
    console.error('❌ Error in updateActivitiesTable:', error);
    return false;
  }
}

// Function to check and update landing_pages table
async function updateLandingPagesTable(): Promise<boolean> {
  console.log('🔍 Searching ALL landing pages for "Engineer Your Way to Success:" text...');
  let updated = false;

  try {
    // Get ALL landing pages (remove the filter)
    const { data: pages, error } = await supabase
      .from('landing_pages')
      .select('*');

    if (error) {
      console.error('❌ Error fetching landing pages:', error);
      return false;
    }

    if (!pages || pages.length === 0) {
      console.log('❌ No landing pages found');
      return false;
    }

    console.log(`✅ Found ${pages.length} landing pages to check`);

    for (const page of pages) {
      console.log(`\n📝 Processing: ${page.name} (ID: ${page.id})`);
      
      const updates: Partial<LandingPage> = {};
      let hasChanges = false;

      // Check each possible field for the text
      const fieldsToCheck = ['small_description', 'meta_description', 'description', 'tagline', 'post_body'];
      
      fieldsToCheck.forEach(field => {
        const originalValue = page[field];
        if (originalValue && typeof originalValue === 'string') {
          const cleanedValue = removeEngineerLine(originalValue);
          if (cleanedValue !== originalValue) {
            console.log(`   🔧 Found "Engineer Your Way to Success:" in ${field}`);
            console.log(`   📄 Original: ${originalValue.substring(0, 100)}...`);
            console.log(`   ✨ Updated:  ${cleanedValue.substring(0, 100)}...`);
            updates[field] = cleanedValue;
            hasChanges = true;
          }
        }
      });

      if (hasChanges) {
        // Update the page
        const { error: updateError } = await supabase
          .from('landing_pages')
          .update(updates)
          .eq('id', page.id);

        if (updateError) {
          console.error(`❌ Error updating landing page ${page.id}:`, updateError);
        } else {
          console.log(`✅ Successfully updated landing page: ${page.name}`);
          updated = true;
        }
      } else {
        console.log(`ℹ️  No "Engineer Your Way to Success:" text found in ${page.name}`);
      }
    }

    return updated;
  } catch (error) {
    console.error('❌ Error in updateLandingPagesTable:', error);
    return false;
  }
}

// Main function
async function main() {
  console.log('🚀 Starting comprehensive content cleanup...');
  console.log('🎯 Target: Remove "Engineer Your Way to Success:" from ALL content');
  
  try {
    // Check both possible tables
    const activitiesUpdated = await updateActivitiesTable();
    const landingPagesUpdated = await updateLandingPagesTable();
    
    if (activitiesUpdated || landingPagesUpdated) {
      console.log('\n🎉 Content update completed successfully!');
      console.log('✅ "Engineer Your Way to Success:" has been removed from all found instances');
    } else {
      console.log('\n⚠️  No updates were made.');
      console.log('This could mean:');
      console.log('   • No content was found with this text');
      console.log('   • The content has already been cleaned');
    }
    
  } catch (error) {
    console.error('❌ Fatal error during content update:', error);
    process.exit(1);
  }
}

// Run the script
// Execute main function
main();

export { main as updateActivityContent }; 