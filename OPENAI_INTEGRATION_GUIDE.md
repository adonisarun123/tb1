# 🤖 OpenAI Integration Guide for Trebound

## 🚀 Setup Instructions

### 1. **Get Your OpenAI API Key**
1. Visit [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Sign in to your OpenAI account
3. Click "Create new secret key"
4. Copy the API key (starts with `sk-...`)

### 2. **Configure Environment Variables**
Create a `.env` file in your project root with:

```env
# Supabase Configuration (existing)
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# N8N Webhook Configuration (existing)
VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-webhook-id

# 🤖 AI-Powered Features Configuration
VITE_OPENAI_API_KEY=sk-your-openai-api-key-here
VITE_PINECONE_API_KEY=your_pinecone_api_key_here
VITE_PINECONE_ENVIRONMENT=your_pinecone_environment_here
VITE_PINECONE_INDEX_NAME=trebound-activities

# Optional: Other integrations
PIPEDRIVE_API_TOKEN=your_pipedrive_token
PIPEDRIVE_COMPANY_DOMAIN=your_company_domain 
```

### 3. **Start the Development Server**
```bash
npm run dev
```

## ✨ **AI Features Now Available:**

### **🎯 AIChatbot**
- **Real conversational AI** for team building recommendations
- **Context-aware responses** about activities, pricing, and booking
- **Intent recognition** (booking, recommendations, pricing, etc.)
- **Conversation history** for better context

### **🔍 AI Recommendations**
- **Personalized activity suggestions** based on company profile
- **Confidence scoring** with reasoning for each recommendation
- **Industry-specific filtering** (tech, finance, healthcare, etc.)
- **Fallback to rule-based recommendations** if OpenAI unavailable

### **📝 Smart Form Auto-completion**
- **Company information enrichment** from company names
- **Industry detection** and size estimation
- **Intelligent field suggestions** with real-time validation

### **🎤 Enhanced Voice Search**
- **Improved speech recognition** with AI-powered intent analysis
- **Entity extraction** (locations, group sizes, activity types)
- **Better search result matching**

## 💰 **Cost Management**

### **Token Usage Optimization:**
- Using **GPT-4o-mini** (most cost-effective model)
- **Limited token counts** (200-500 tokens per request)
- **Fallback mechanisms** to prevent excessive API calls
- **Request batching** for recommendations

### **Expected Costs:**
- **Chatbot**: ~$0.001-0.003 per conversation
- **Recommendations**: ~$0.002-0.005 per request
- **Company Data**: ~$0.001-0.002 per lookup
- **Monthly estimate**: $10-50 depending on usage

## 🛡️ **Error Handling & Fallbacks**

### **Graceful Degradation:**
- ✅ **No API Key**: Components show helpful messages, site still works
- ✅ **API Errors**: Automatic fallback to rule-based responses
- ✅ **Rate Limits**: Built-in error handling with user-friendly messages
- ✅ **Network Issues**: Local fallback recommendations

### **Monitoring:**
- All AI interactions logged to browser console
- Error tracking for API failures
- Performance monitoring for response times

## 📊 **Testing the Integration**

### **1. Test AI Chatbot:**
1. Open any page with the floating chat button
2. Ask: "What team building activities do you recommend for a tech company of 50 people?"
3. Should get intelligent, contextual responses

### **2. Test Smart Recommendations:**
1. Visit the homepage
2. The AI Recommendations section should show personalized suggestions
3. Look for confidence scores and reasoning

### **3. Test Smart Form:**
1. Fill out any contact form
2. Enter a real company name (e.g., "Microsoft", "Google")
3. Should auto-populate industry and size information

### **4. Test Voice Search:**
1. Click the microphone icon in search
2. Say: "Find outdoor team building activities in Bangalore"
3. Should transcribe and search intelligently

## 🔧 **Troubleshooting**

### **Common Issues:**

**❌ "AI features are currently unavailable"**
- Check if `VITE_OPENAI_API_KEY` is set in your `.env` file
- Verify the API key starts with `sk-` and is valid
- Restart the development server after adding the key

**❌ "Failed to generate response"**
- Check your OpenAI account has sufficient credits
- Verify network connectivity
- Check browser console for detailed error messages

**❌ Components not showing**
- Clear browser cache and hard refresh
- Check browser console for JavaScript errors
- Verify all environment variables are properly set

## 🎯 **Next Steps**

Once OpenAI is integrated, you can:

1. **Monitor Usage**: Track API costs in OpenAI dashboard
2. **Customize Prompts**: Modify AI responses in `openaiClient.ts`
3. **Add More Features**: Extend AI capabilities to other components
4. **Optimize Performance**: Implement caching for frequently requested data
5. **A/B Testing**: Compare AI vs non-AI user experiences

## 📈 **Expected Impact**

- **🔥 20-30% increase** in user engagement
- **⭐ Better user experience** with personalized recommendations  
- **📞 Higher conversion rates** through intelligent lead qualification
- **🎯 Improved SEO** with AI-generated content optimization
- **⚡ Faster user journeys** with smart form completion

---

**Ready to revolutionize your team building platform with AI? Let's integrate OpenAI! 🚀** 