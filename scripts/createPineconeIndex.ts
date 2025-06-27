import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function createPineconeIndex() {
  try {
    // Initialize Pinecone client
    const pc = new Pinecone({
      apiKey: process.env.VITE_PINECONE_API_KEY!,
    });

    const indexName = process.env.VITE_PINECONE_INDEX_NAME || 'trebound-activities';

    // Check if index already exists
    const existingIndexes = await pc.listIndexes();
    const indexExists = existingIndexes.indexes?.some(index => index.name === indexName);

    if (indexExists) {
      console.log(`✅ Index '${indexName}' already exists!`);
      return;
    }

    // Create the index
    console.log(`🔧 Creating Pinecone index: ${indexName}`);
    
    await pc.createIndex({
      name: indexName,
      dimension: 1536, // OpenAI text-embedding-3-small dimensions
      metric: 'cosine',
      spec: {
        serverless: {
          cloud: 'aws',
          region: 'us-east-1'
        }
      },
      deletionProtection: 'disabled', // For development
      tags: {
        environment: 'development',
        project: 'trebound'
      }
    });

    console.log(`✅ Successfully created index: ${indexName}`);
    console.log('📋 Index specifications:');
    console.log('   - Dimensions: 1536');
    console.log('   - Metric: cosine');
    console.log('   - Cloud: AWS');
    console.log('   - Region: us-east-1');
    
  } catch (error) {
    console.error('❌ Error creating Pinecone index:', error);
    process.exit(1);
  }
}

// Run the script
createPineconeIndex(); 