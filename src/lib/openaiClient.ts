import OpenAI from 'openai';

// Initialize OpenAI client with Vite environment variables
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true, // Required for client-side usage
});

// Check if API key is configured
const isOpenAIConfigured = !!import.meta.env.VITE_OPENAI_API_KEY;

// Generate embeddings for text
export const generateEmbedding = async (text: string): Promise<number[]> => {
  if (!isOpenAIConfigured) {
    throw new Error('OpenAI API key not configured');
  }

  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });
    
    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw new Error('Failed to generate embedding');
  }
};

// Generate AI response using GPT
export const generateAIResponse = async (query: string, context: string): Promise<string> => {
  if (!isOpenAIConfigured) {
    console.warn('OpenAI API key not configured, using fallback response');
    throw new Error('OpenAI not configured');
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Using the more cost-effective model
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant for Trebound, a team building and corporate experience platform. 
          You help users find the perfect team building activities from our collection of 350+ unique experiences.
          
          Guidelines:
          - Be friendly, professional, and enthusiastic about team building
          - Provide specific recommendations when possible
          - Mention relevant details like group sizes, locations, or activity types
          - If you don't have specific information, guide users to contact the team
          - Keep responses concise but informative (2-3 sentences max)
          - Always maintain a positive, solution-oriented tone
          - Include actionable next steps when appropriate`
        },
        {
          role: "user",
          content: `Question: ${query}\n\nRelevant Context: ${context}`
        }
      ],
      max_tokens: 200,
      temperature: 0.7
    });

    return response.choices[0].message.content || 'I apologize, but I encountered an issue generating a response. Please try again or contact our support team.';
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw error; // Re-throw so the search API can handle it with fallback
  }
};

// Generate AI recommendations
export const generateRecommendations = async (userProfile: any, activities: any[]): Promise<any[]> => {
  if (!isOpenAIConfigured) {
    return [];
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an AI recommendation engine for Trebound. Analyze user profiles and suggest the best team building activities.
          
          Return recommendations as a JSON array with this format:
          [
            {
              "activityId": "string",
              "confidence": 0.0-1.0,
              "reason": "explanation",
              "personalizationFactors": ["factor1", "factor2"]
            }
          ]`
        },
        {
          role: "user",
          content: `User Profile: ${JSON.stringify(userProfile)}
          Available Activities: ${JSON.stringify(activities.slice(0, 20))} // Limit for token efficiency
          
          Please recommend the top 5 activities for this user.`
        }
      ],
      max_tokens: 500,
      temperature: 0.3
    });

    const content = response.choices[0].message.content || '[]';
    return JSON.parse(content);
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return [];
  }
};

// Generate company information for smart forms
export const generateCompanyInfo = async (companyName: string): Promise<any> => {
  if (!isOpenAIConfigured) {
    return null;
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a company information assistant. Provide basic company details in JSON format:
          {
            "industry": "string",
            "size": "startup|small|medium|large|enterprise",
            "location": "city, country",
            "website": "url if known",
            "description": "brief description"
          }`
        },
        {
          role: "user",
          content: `Provide information about the company: ${companyName}`
        }
      ],
      max_tokens: 300,
      temperature: 0.1
    });

    const content = response.choices[0].message.content || '{}';
    return JSON.parse(content);
  } catch (error) {
    console.error('Error generating company info:', error);
    return null;
  }
};

export { openai, isOpenAIConfigured }; 