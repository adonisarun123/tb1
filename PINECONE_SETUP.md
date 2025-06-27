# Pinecone Vector Search Integration Guide

This guide walks you through setting up Pinecone vector search for AI-powered content discovery on your Trebound website.

## 🚀 Prerequisites

1. **Pinecone Account**: Sign up at [pinecone.io](https://pinecone.io)
2. **OpenAI Account**: Get API key from [platform.openai.com](https://platform.openai.com)
3. **Environment Setup**: Ensure you have access to your Supabase database

## 📋 Step 1: Create Pinecone Index

1. Log into your Pinecone console
2. Create a new index with these settings:
   - **Index Name**: `trebound-activities`
   - **Dimensions**: `1536` (for text-embedding-3-small)
   - **Metric**: `cosine`
   - **Cloud Provider**: Choose your preferred region
   - **Plan**: Start with Starter (free tier)

## 🔑 Step 2: Environment Configuration

Create a `.env` file in your project root and add:

```env
# AI-Powered Search Configuration
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_PINECONE_API_KEY=your_pinecone_api_key_here
VITE_PINECONE_ENVIRONMENT=your_pinecone_environment_here
VITE_PINECONE_INDEX_NAME=trebound-activities

# Your existing Supabase configuration
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Getting Your API Keys:

**OpenAI API Key:**
1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Click "Create new secret key"
3. Copy the key (starts with `sk-`)

**Pinecone API Key:**
1. Go to your Pinecone console
2. Navigate to "API Keys" section
3. Copy your API key
4. Note your environment (e.g., `us-east-1-aws`)

## 📊 Step 3: Generate Activity Embeddings

Run the embedding script to process all your activities:

```bash
npm run embed-activities
```

This script will:
- Fetch all activities from your Supabase database
- Generate embeddings using OpenAI's text-embedding-3-small model
- Store vectors in your Pinecone index
- Process activities in batches to respect rate limits

**Expected Output:**
```
Starting activity embedding process...
Found 350 activities to process
Processing batch 1...
Generating embedding for: Movie Making Team Building
Successfully uploaded 10 vectors to Pinecone
...
Activity embedding process completed successfully!
```

## 🔍 Step 4: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to your homepage and try the AI search:
   - Search for "team building activities"
   - Search for "virtual collaboration"
   - Search for "outdoor adventures"

3. Check the browser console for search logs:
   - `Performing vector search for: [query]`
   - Vector search confidence scores
   - Fallback to text search if needed

## 🎯 Features Enabled

### **AI-Powered Search**
- Semantic search using vector embeddings
- Natural language understanding
- Context-aware responses
- Intelligent activity recommendations

### **Search Capabilities**
- **Vector Search**: Primary search using semantic similarity
- **Fallback Search**: Traditional text search as backup
- **Confidence Scoring**: Filters results by similarity threshold (0.7+)
- **Dynamic Suggestions**: Context-aware search suggestions

### **AI Response Generation**
- Contextual answers using GPT-4o-mini
- Activity-specific recommendations
- Professional, friendly tone
- Concise, actionable responses

## 🔧 Configuration Options

### Similarity Threshold
Adjust the confidence threshold in `src/api/search.ts`:
```typescript
.filter(match => match.metadata && match.score && match.score > 0.7) // Adjust threshold
```

### Search Results Count
Modify the number of results:
```typescript
const searchResults = await index.query({
  vector: queryEmbedding,
  topK: 10, // Adjust number of results
  includeMetadata: true
});
```

### Batch Processing
Adjust embedding batch size in `scripts/embedActivities.ts`:
```typescript
const BATCH_SIZE = 10; // Reduce if hitting rate limits
const DELAY_BETWEEN_BATCHES = 1000; // Increase delay if needed
```

## 📈 Monitoring & Analytics

### Search Performance
Monitor these metrics in your browser console:
- `vectorSearchUsed`: Whether vector search was used
- `searchConfidence`: Similarity score of top result
- Search response times
- Fallback usage frequency

### Cost Optimization
- **Embeddings**: ~$0.00002 per 1K tokens (text-embedding-3-small)
- **GPT Responses**: ~$0.00015 per 1K tokens (gpt-4o-mini)
- **Pinecone**: Free tier includes 1M vectors

## 🚨 Troubleshooting

### Common Issues

**1. "Failed to generate embedding" Error**
- Check OpenAI API key is valid
- Verify you have sufficient credits
- Check rate limits (3 RPM on free tier)

**2. "Pinecone connection failed" Error**
- Verify Pinecone API key and environment
- Ensure index name matches configuration
- Check index is in "Ready" state

**3. "No vector results found" Error**
- Run embedding script: `npm run embed-activities`
- Check if activities exist in database
- Verify index has vectors (check Pinecone console)

**4. High Response Times**
- Reduce `topK` parameter
- Increase similarity threshold
- Consider caching frequent queries

### Debug Mode
Enable detailed logging by adding to your search:
```typescript
console.log('Vector search results:', searchResults);
console.log('Activity matches:', activities);
```

## 🔄 Maintenance

### Re-embedding Activities
Run when you add new activities or update existing ones:
```bash
npm run embed-activities
```

### Index Management
- Monitor index usage in Pinecone console
- Consider upgrading plan as you scale
- Regularly check search quality and adjust thresholds

## 📚 Next Steps

1. **Production Deployment**: Move API keys to server-side for security
2. **Caching**: Implement Redis caching for frequent queries
3. **Analytics**: Add search analytics and user behavior tracking
4. **A/B Testing**: Test different AI prompts and search parameters
5. **Personalization**: Enhance with user preferences and search history

## 🔐 Security Notes

⚠️ **Important**: The current setup uses client-side API calls for development. For production:

1. Move OpenAI and Pinecone calls to server-side API routes
2. Use environment variables without `VITE_` prefix on server
3. Implement proper API rate limiting
4. Add authentication for search endpoints
5. Consider using OpenAI Azure endpoints for enterprise

---

🎉 **Congratulations!** Your Trebound website now has AI-powered vector search capabilities. Users can find activities using natural language queries, and the system will intelligently match their intent with the most relevant team building experiences. 