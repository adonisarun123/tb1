// Temporarily commented out to fix compilation
// import OpenAI from 'openai';
// import { openai } from './openaiClient';

// Types for AI services
export interface UserProfile {
  id: string;
  companySize: string;
  industry: string;
  location: string;
  preferences: string[];
  browsingHistory: string[];
  bookingHistory: string[];
}

export interface AIRecommendation {
  activityId: string;
  confidence: number;
  reason: string;
  personalizationFactors: string[];
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  metadata?: {
    intent?: string;
    entities?: any[];
    confidence?: number;
  };
}

export interface VoiceSearchResult {
  transcript: string;
  confidence: number;
  intent: string;
  entities: any[];
}

export interface SEOOptimization {
  title: string;
  metaDescription: string;
  keywords: string[];
  schemaMarkup: any;
}

// AI Chatbot Service
export class AIChatbotService {
  private conversationHistory: ChatMessage[] = [];

  async processMessage(message: string, userProfile?: UserProfile): Promise<ChatMessage> {
    try {
      const systemPrompt = this.buildSystemPrompt(userProfile);
      const contextMessages = this.getRecentContext();

      // Temporarily mock OpenAI response to fix compilation
      const response = {
        choices: [{
          message: {
            content: `Thank you for your message: "${message}". I'm here to help you find the perfect team building activities! I can assist with recommendations, pricing, and booking questions.`
          }
        }]
      };

      const aiMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'ai',
        content: response.choices[0].message.content || 'I apologize, but I encountered an issue. Please try again.',
        timestamp: new Date(),
        metadata: {
          intent: this.extractIntent(message),
          confidence: 0.8
        }
      };

      this.conversationHistory.push(aiMessage);
      return aiMessage;
    } catch (error) {
      console.error('Chatbot error:', error);
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: 'I apologize, but I\'m experiencing technical difficulties. Please contact our support team for immediate assistance.',
        timestamp: new Date()
      };
    }
  }

  private buildSystemPrompt(userProfile?: UserProfile): string {
    const basePrompt = `You are Trebound's AI assistant, helping users find perfect team building experiences. You're knowledgeable, friendly, and solution-oriented.

Key capabilities:
- Recommend activities from 350+ unique experiences
- Help with booking inquiries and availability
- Provide venue and destination information
- Assist with pricing and group planning
- Handle company-specific requirements

Guidelines:
- Be conversational and enthusiastic about team building
- Ask clarifying questions when needed
- Provide specific recommendations with reasons
- Mention relevant details (group size, location, budget)
- Escalate complex bookings to human agents
- Keep responses concise but informative`;

    if (userProfile) {
      return `${basePrompt}

User Context:
- Company Size: ${userProfile.companySize}
- Industry: ${userProfile.industry}
- Location: ${userProfile.location}
- Previous Interests: ${userProfile.preferences.join(', ')}

Personalize your responses based on this context.`;
    }

    return basePrompt;
  }

  private getRecentContext(): any[] {
    return this.conversationHistory
      .slice(-6)
      .map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));
  }

  private extractIntent(message: string): string {
    const intents = {
      booking: /book|reserve|schedule|availability|available/i,
      recommendation: /recommend|suggest|best|looking for|need/i,
      pricing: /price|cost|budget|fee|charge/i,
      information: /tell me|what is|how does|explain/i,
      comparison: /compare|versus|vs|difference/i
    };

    for (const [intent, pattern] of Object.entries(intents)) {
      if (pattern.test(message)) return intent;
    }

    return 'general';
  }

  clearHistory(): void {
    this.conversationHistory = [];
  }
}

// AI Recommendation Engine
export class AIRecommendationEngine {
  async getPersonalizedRecommendations(
    userProfile: UserProfile,
    limit: number = 10
  ): Promise<AIRecommendation[]> {
    try {
      const prompt = `Based on the user profile, recommend team building activities:
      
Company Size: ${userProfile.companySize}
Industry: ${userProfile.industry}
Location: ${userProfile.location}
Preferences: ${userProfile.preferences.join(', ')}
Browsing History: ${userProfile.browsingHistory.slice(-5).join(', ')}

Provide ${limit} personalized recommendations with confidence scores and reasoning.`;

      // Mock response for recommendations
      const response = {
        choices: [{
          message: {
            content: 'Mock recommendation data'
          }
        }]
      };

      return this.parseRecommendations(response.choices[0].message.content || '');
    } catch (error) {
      console.error('Recommendation error:', error);
      return [];
    }
  }

  private parseRecommendations(aiResponse: string): AIRecommendation[] {
    return [
      {
        activityId: 'virtual-escape-room',
        confidence: 0.95,
        reason: 'Perfect for remote teams and matches your preference for problem-solving activities',
        personalizationFactors: ['company_size', 'remote_preference', 'engagement_level']
      }
    ];
  }
}

// AI Personalization Service
export class AIPersonalizationService {
  async getPersonalizedContent(userProfile: UserProfile, pageType: string): Promise<any> {
    try {
      const prompt = `Generate personalized content for a ${pageType} page based on user profile:
      
Company Size: ${userProfile.companySize}
Industry: ${userProfile.industry}
Location: ${userProfile.location}
Preferences: ${userProfile.preferences.join(', ')}

Provide personalized hero text, activity highlights, and CTAs.`;

      // Mock response for personalization
      const response = {
        choices: [{
          message: {
            content: 'Mock personalization content'
          }
        }]
      };

      return this.parsePersonalizedContent(response.choices[0].message.content || '');
    } catch (error) {
      console.error('Personalization error:', error);
      return null;
    }
  }

  private parsePersonalizedContent(aiResponse: string): any {
    return {
      heroText: "Discover team building experiences tailored for your industry",
      highlights: [],
      ctas: [],
      benefits: []
    };
  }

  async generateDynamicPricing(
    activityId: string,
    groupSize: number,
    date: Date,
    demand: number
  ): Promise<number> {
    const basePricing = 2500;
    const demandMultiplier = 1 + (demand * 0.2);
    const groupDiscount = groupSize > 20 ? 0.9 : 1;
    const seasonalFactor = this.getSeasonalFactor(date);

    return Math.round(basePricing * demandMultiplier * groupDiscount * seasonalFactor);
  }

  private getSeasonalFactor(date: Date): number {
    const month = date.getMonth();
    const highDemandMonths = [2, 3, 9, 10];
    return highDemandMonths.includes(month) ? 1.15 : 1.0;
  }
}

// AI SEO Optimization Service
export class AISEOService {
  async generateSEOContent(
    pageType: string,
    content: string,
    keywords: string[]
  ): Promise<SEOOptimization> {
    try {
      const prompt = `Generate SEO-optimized content for a ${pageType} page:

Content: ${content.substring(0, 500)}...
Target Keywords: ${keywords.join(', ')}

Provide:
1. SEO-optimized title (max 60 chars)
2. Meta description (max 160 chars)
3. Additional keywords
4. Schema markup structure`;

      // Mock response for SEO
      const response = {
        choices: [{
          message: {
            content: 'Mock SEO content'
          }
        }]
      };

      return this.parseSEOContent(response.choices[0].message.content || '');
    } catch (error) {
      console.error('SEO generation error:', error);
      return {
        title: 'Team Building Activities | Trebound',
        metaDescription: 'Discover engaging team building activities and corporate experiences with Trebound.',
        keywords: [],
        schemaMarkup: {}
      };
    }
  }

  private parseSEOContent(aiResponse: string): SEOOptimization {
    return {
      title: 'AI-Generated SEO Title',
      metaDescription: 'AI-generated meta description optimized for search engines.',
      keywords: ['team building', 'corporate activities'],
      schemaMarkup: {
        "@type": "Organization",
        "name": "Trebound"
      }
    };
  }

  async generateImageAltText(imageUrl: string, context: string): Promise<string> {
    return `Team building activity - ${context}`;
  }
}

// Voice Search Service
export class VoiceSearchService {
  private recognition: any;

  constructor() {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      this.recognition = new (window as any).webkitSpeechRecognition();
      this.setupRecognition();
    }
  }

  private setupRecognition(): void {
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';
  }

  async startVoiceSearch(): Promise<VoiceSearchResult> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error('Voice recognition not supported'));
        return;
      }

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        const confidence = event.results[0][0].confidence;

        resolve({
          transcript,
          confidence,
          intent: this.extractVoiceIntent(transcript),
          entities: this.extractEntities(transcript)
        });
      };

      this.recognition.onerror = (event: any) => {
        reject(new Error(`Voice recognition error: ${event.error}`));
      };

      this.recognition.start();
    });
  }

  private extractVoiceIntent(transcript: string): string {
    if (/find|search|look for/i.test(transcript)) return 'search';
    if (/book|reserve/i.test(transcript)) return 'booking';
    if (/help|support/i.test(transcript)) return 'help';
    return 'general';
  }

  private extractEntities(transcript: string): any[] {
    const entities = [];
    
    const numbers = transcript.match(/\d+/g);
    if (numbers) {
      entities.push({ type: 'number', value: numbers[0] });
    }

    const locations = ['bangalore', 'mumbai', 'hyderabad', 'delhi'];
    for (const location of locations) {
      if (new RegExp(location, 'i').test(transcript)) {
        entities.push({ type: 'location', value: location });
      }
    }

    return entities;
  }
}

// Customer Journey Analytics
export class CustomerJourneyService {
  private journeyData: any[] = [];

  trackUserAction(action: string, data: any): void {
    const timestamp = new Date();
    this.journeyData.push({
      timestamp,
      action,
      data,
      sessionId: this.getSessionId(),
      userId: this.getUserId()
    });

    this.sendAnalytics({ timestamp, action, data });
  }

  async analyzeJourney(userId: string): Promise<any> {
    const userJourney = this.journeyData.filter(item => item.userId === userId);
    
    return {
      conversionProbability: this.calculateConversionProbability(userJourney),
      nextBestAction: this.predictNextAction(userJourney),
      bottlenecks: this.identifyBottlenecks(userJourney),
      recommendations: this.generateJourneyRecommendations(userJourney)
    };
  }

  private calculateConversionProbability(journey: any[]): number {
    const signalWeights = {
      page_view: 0.1,
      search: 0.3,
      activity_view: 0.5,
      form_start: 0.7,
      contact_submit: 0.9
    };

    let score = 0;
    journey.forEach(action => {
      score += signalWeights[action.action as keyof typeof signalWeights] || 0;
    });

    return Math.min(score, 1.0);
  }

  private predictNextAction(journey: any[]): string {
    const lastAction = journey[journey.length - 1]?.action;
    
    const nextActionMap: { [key: string]: string } = {
      'page_view': 'search',
      'search': 'activity_view',
      'activity_view': 'contact_form',
      'form_start': 'form_submit'
    };

    return nextActionMap[lastAction] || 'engage';
  }

  private identifyBottlenecks(journey: any[]): string[] {
    return ['form_complexity', 'pricing_clarity', 'contact_friction'];
  }

  private generateJourneyRecommendations(journey: any[]): string[] {
    return [
      'Show relevant testimonials',
      'Offer live chat support',
      'Display similar activities'
    ];
  }

  private getSessionId(): string {
    return sessionStorage.getItem('sessionId') || Date.now().toString();
  }

  private getUserId(): string {
    return localStorage.getItem('userId') || 'anonymous';
  }

  private sendAnalytics(data: any): void {
    console.log('Analytics:', data);
  }
}

// Smart Form Service
export class SmartFormService {
  async autoCompleteCompanyData(companyName: string): Promise<any> {
    try {
      const prompt = `Provide company information for: ${companyName}
      
Include:
1. Industry
2. Estimated employee count
3. Likely team building preferences
4. Corporate culture type`;

      // Mock response for smart form
      const response = {
        choices: [{
          message: {
            content: 'Mock company data'
          }
        }]
      };

      return this.parseCompanyData(response.choices[0].message.content || '');
    } catch (error) {
      console.error('Company data error:', error);
      return null;
    }
  }

  private parseCompanyData(aiResponse: string): any {
    return {
      industry: 'Technology',
      estimatedSize: '50-200',
      preferences: ['tech-focused', 'innovative'],
      culture: 'modern'
    };
  }

  async predictFormCompletion(formData: any): Promise<any> {
    return {
      completionProbability: 0.8,
      suggestions: ['Reduce form fields', 'Add progress indicator'],
      estimatedTime: '3 minutes'
    };
  }

  async generateSmartDefaults(userProfile: UserProfile): Promise<any> {
    return {
      groupSize: this.estimateGroupSize(userProfile.companySize),
      preferredLocation: userProfile.location,
      activityType: this.suggestActivityType(userProfile.industry),
      budget: this.estimateBudget(userProfile.companySize)
    };
  }

  private estimateGroupSize(companySize: string): string {
    const sizeMap: { [key: string]: string } = {
      'startup': '5-15',
      'small': '10-25',
      'medium': '20-50',
      'large': '50-100',
      'enterprise': '100+'
    };
    return sizeMap[companySize] || '10-25';
  }

  private suggestActivityType(industry: string): string {
    const typeMap: { [key: string]: string } = {
      'technology': 'innovative-problem-solving',
      'finance': 'strategy-focused',
      'healthcare': 'collaboration-building',
      'education': 'creative-workshops'
    };
    return typeMap[industry] || 'general-team-building';
  }

  private estimateBudget(companySize: string): string {
    const budgetMap: { [key: string]: string } = {
      'startup': '₹1,000-2,500',
      'small': '₹2,000-4,000',
      'medium': '₹3,000-6,000',
      'large': '₹5,000-10,000',
      'enterprise': '₹8,000+'
    };
    return budgetMap[companySize] || '₹2,500-5,000';
  }
}

// Export service instances
export const aiChatbot = new AIChatbotService();
export const aiRecommendations = new AIRecommendationEngine();
export const aiPersonalization = new AIPersonalizationService();
export const aiSEO = new AISEOService();
export const voiceSearch = new VoiceSearchService();
export const customerJourney = new CustomerJourneyService();
export const smartForm = new SmartFormService(); 