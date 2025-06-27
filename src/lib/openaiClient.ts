import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  // Note: This should only be used on the server-side in Next.js
});

// Generate embeddings for text
export const generateEmbedding = async (text: string): Promise<number[]> => {
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
          - Always maintain a positive, solution-oriented tone`
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
    return 'I apologize, but I encountered an issue generating a response. Please try again or contact our support team.';
  }
};

export { openai }; 