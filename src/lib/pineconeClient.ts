import { Pinecone } from '@pinecone-database/pinecone';

// Initialize Pinecone client
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || '',
});

export const getIndex = () => {
  const indexName = process.env.PINECONE_INDEX_NAME || 'trebound-activities';
  return pinecone.index(indexName);
};

export { pinecone }; 