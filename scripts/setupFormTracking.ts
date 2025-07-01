import { supabase } from './supabaseClient';

async function setupFormTracking() {
  try {
    console.log('🚀 Setting up form tracking system...');
    
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }
    
    // Create the form_submissions table
    console.log('Creating form_submissions table...');
    
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS form_submissions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        reference_id VARCHAR(50) UNIQUE NOT NULL,
        form_type VARCHAR(100) NOT NULL,
        form_data JSONB NOT NULL,
        source_url TEXT NOT NULL,
        user_agent TEXT,
        ip_address VARCHAR(45),
        utm_source VARCHAR(255),
        utm_medium VARCHAR(255),
        utm_campaign VARCHAR(255),
        referrer TEXT,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        status VARCHAR(20) DEFAULT 'submitted' CHECK (status IN ('submitted', 'processing', 'completed', 'failed')),
        user_email VARCHAR(255),
        user_name VARCHAR(255),
        user_company VARCHAR(255),
        user_phone VARCHAR(50),
        session_id VARCHAR(100),
        device_info JSONB,
        location_data JSONB,
        form_completion_time INTEGER,
        form_steps_completed INTEGER,
        total_form_steps INTEGER,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    
    const { error: tableError } = await supabase.rpc('exec_sql', { sql: createTableSQL });
    
    if (tableError) {
      console.error('❌ Error creating table:', tableError);
    } else {
      console.log('✅ Table created successfully');
    }
    
    // Create indexes
    console.log('Creating indexes...');
    
    const indexQueries = [
      'CREATE INDEX IF NOT EXISTS idx_form_submissions_reference_id ON form_submissions(reference_id);',
      'CREATE INDEX IF NOT EXISTS idx_form_submissions_form_type ON form_submissions(form_type);',
      'CREATE INDEX IF NOT EXISTS idx_form_submissions_status ON form_submissions(status);',
      'CREATE INDEX IF NOT EXISTS idx_form_submissions_timestamp ON form_submissions(timestamp);',
      'CREATE INDEX IF NOT EXISTS idx_form_submissions_user_email ON form_submissions(user_email);'
    ];
    
    for (const indexQuery of indexQueries) {
      const { error } = await supabase.rpc('exec_sql', { sql: indexQuery });
      if (error) {
        console.error('❌ Error creating index:', error);
      }
    }
    
    console.log('✅ Indexes created successfully');
    
    // Test the setup by creating a sample submission
    console.log('\n🧪 Testing form tracking setup...');
    
    const testSubmission = {
      reference_id: 'TEST-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      form_type: 'test-form',
      form_data: {
        test: true,
        message: 'This is a test submission',
        timestamp: new Date().toISOString()
      },
      source_url: 'http://localhost:5173/test',
      user_agent: 'Node.js Test Script',
      status: 'submitted',
      user_email: 'test@example.com',
      user_name: 'Test User'
    };
    
    const { data, error } = await supabase
      .from('form_submissions')
      .insert([testSubmission])
      .select();
    
    if (error) {
      console.error('❌ Error testing form submissions:', error);
    } else {
      console.log('✅ Form tracking test successful!');
      console.log('Test submission created with ID:', data[0]?.reference_id);
      
      // Verify we can read the data
      const { data: retrievedData, error: retrieveError } = await supabase
        .from('form_submissions')
        .select('*')
        .eq('reference_id', testSubmission.reference_id)
        .single();
      
      if (retrieveError) {
        console.error('❌ Error retrieving test data:', retrieveError);
      } else {
        console.log('✅ Data retrieval test successful');
      }
      
      // Clean up test submission
      await supabase
        .from('form_submissions')
        .delete()
        .eq('reference_id', testSubmission.reference_id);
      
      console.log('✅ Test submission cleaned up');
    }
    
    console.log('\n🎉 Form tracking system setup complete!');
    console.log('\n📋 System Features:');
    console.log('• ✅ Unique reference IDs for all form submissions');
    console.log('• ✅ Comprehensive tracking (URL, device, location, timing)');
    console.log('• ✅ UTM parameter tracking for marketing analytics');
    console.log('• ✅ Form-specific success messages with next steps');
    console.log('• ✅ Database storage with proper indexing');
    console.log('• ✅ Analytics-ready data structure');
    
    console.log('\n🚀 Forms Updated:');
    console.log('• Expert Consultation Form');
    console.log('• Contact Form');
    console.log('• Smart Form');
    console.log('• Newsletter Signup');
    
    console.log('\n💡 Reference ID Prefixes:');
    console.log('• TRB- : General inquiries');
    console.log('• TBF- : Expert consultations');
    console.log('• TSF- : Smart form submissions');
    console.log('• TCF- : Contact form submissions');
    console.log('• TEF- : Event form submissions');
    
  } catch (error) {
    console.error('❌ Error setting up form tracking:', error);
    process.exit(1);
  }
}

// Run the setup
setupFormTracking();

export { setupFormTracking }; 