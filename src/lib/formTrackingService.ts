import { supabase } from './supabaseClient';

export interface FormSubmission {
  reference_id: string;
  form_type: string;
  form_data: Record<string, any>;
  source_url: string;
  user_agent: string;
  ip_address?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  timestamp: string;
  status: 'submitted' | 'processing' | 'completed' | 'failed';
  user_email?: string;
  user_name?: string;
  user_company?: string;
  user_phone?: string;
  session_id?: string;
  device_info?: Record<string, any>;
  location_data?: Record<string, any>;
  form_completion_time?: number; // in seconds
  form_steps_completed?: number;
  total_form_steps?: number;
}

export interface FormTrackingResponse {
  success: boolean;
  reference_id: string;
  message: string;
  next_steps?: string[];
  estimated_response_time?: string;
  contact_info?: {
    email?: string;
    phone?: string;
  };
}

export class FormTrackingService {
  private static instance: FormTrackingService;
  private sessionStartTime: number = Date.now();

  public static getInstance(): FormTrackingService {
    if (!FormTrackingService.instance) {
      FormTrackingService.instance = new FormTrackingService();
    }
    return FormTrackingService.instance;
  }

  /**
   * Generate a unique reference ID
   */
  private generateReferenceId(): string {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    const prefix = this.getRandomPrefix();
    return `${prefix}-${timestamp}-${randomPart}`;
  }

  /**
   * Get random prefix for reference ID
   */
  private getRandomPrefix(): string {
    const prefixes = ['TRB', 'TBF', 'TSF', 'TCF', 'TEF'];
    return prefixes[Math.floor(Math.random() * prefixes.length)];
  }

  /**
   * Extract URL parameters for tracking
   */
  private extractUrlParams(): {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    referrer?: string;
  } {
    if (typeof window === 'undefined') return {};

    const urlParams = new URLSearchParams(window.location.search);
    return {
      utm_source: urlParams.get('utm_source') || undefined,
      utm_medium: urlParams.get('utm_medium') || undefined,
      utm_campaign: urlParams.get('utm_campaign') || undefined,
      referrer: document.referrer || undefined,
    };
  }

  /**
   * Get device and browser information
   */
  private getDeviceInfo(): Record<string, any> {
    if (typeof window === 'undefined') return {};

    return {
      user_agent: navigator.userAgent,
      screen_resolution: `${screen.width}x${screen.height}`,
      browser_language: navigator.language,
      platform: navigator.platform,
      is_mobile: /Mobi|Android/i.test(navigator.userAgent),
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  }

  /**
   * Get user's approximate location (if available)
   */
  private async getLocationData(): Promise<Record<string, any>> {
    try {
      // Try to get IP-based location (you can integrate with a service like ipapi.co)
      const response = await fetch('https://ipapi.co/json/');
      if (response.ok) {
        const locationData = await response.json();
        return {
          country: locationData.country_name,
          region: locationData.region,
          city: locationData.city,
          postal: locationData.postal,
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          timezone: locationData.timezone,
        };
      }
    } catch (error) {
      console.log('Could not fetch location data:', error);
    }
    return {};
  }

  /**
   * Submit form data and get tracking response
   */
  public async submitForm(
    formType: string,
    formData: Record<string, any>,
    options: {
      formStepsCompleted?: number;
      totalFormSteps?: number;
      customSuccessMessage?: string;
    } = {}
  ): Promise<FormTrackingResponse> {
    try {
      const referenceId = this.generateReferenceId();
      const timestamp = new Date().toISOString();
      const urlParams = this.extractUrlParams();
      const deviceInfo = this.getDeviceInfo();
      const locationData = await this.getLocationData();
      const formCompletionTime = Math.floor((Date.now() - this.sessionStartTime) / 1000);

      // Extract user information from form data
      const userEmail = formData.email || formData.workEmail || formData.contactEmail;
      const userName = formData.name || formData.contactPerson || formData.firstName 
        ? `${formData.firstName} ${formData.lastName || ''}`.trim()
        : formData.fullName;
      const userCompany = formData.company || formData.companyName || formData.organization;
      const userPhone = formData.phone || formData.mobile || formData.phoneNumber;

      const submission: FormSubmission = {
        reference_id: referenceId,
        form_type: formType,
        form_data: formData,
        source_url: typeof window !== 'undefined' ? window.location.href : '',
        user_agent: deviceInfo.user_agent || '',
        utm_source: urlParams.utm_source,
        utm_medium: urlParams.utm_medium,
        utm_campaign: urlParams.utm_campaign,
        referrer: urlParams.referrer,
        timestamp,
        status: 'submitted',
        user_email: userEmail,
        user_name: userName,
        user_company: userCompany,
        user_phone: userPhone,
        session_id: this.generateSessionId(),
        device_info: deviceInfo,
        location_data: locationData,
        form_completion_time: formCompletionTime,
        form_steps_completed: options.formStepsCompleted,
        total_form_steps: options.totalFormSteps,
      };

      // Save to Supabase
      const { error } = await supabase
        .from('form_submissions')
        .insert([submission]);

      if (error) {
        console.error('Error saving form submission:', error);
        throw error;
      }

      // Generate response based on form type
      const response = this.generateFormResponse(formType, referenceId, options.customSuccessMessage);

      // Send notification email to admin (optional)
      this.sendAdminNotification(submission);

      return response;
    } catch (error) {
      console.error('Error in submitForm:', error);
      return {
        success: false,
        reference_id: '',
        message: 'There was an error submitting your form. Please try again or contact us directly.',
      };
    }
  }

  /**
   * Generate session ID
   */
  private generateSessionId(): string {
    return `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Generate appropriate response based on form type
   */
  private generateFormResponse(
    formType: string, 
    referenceId: string, 
    customMessage?: string
  ): FormTrackingResponse {
    const baseResponse = {
      success: true,
      reference_id: referenceId,
    };

    switch (formType) {
      case 'expert-consultation':
        return {
          ...baseResponse,
          message: customMessage || `Thank you for booking your expert consultation! Your reference ID is ${referenceId}. Our team will review your requirements and contact you within 2 hours to schedule your personalized consultation.`,
          next_steps: [
            'Our expert will review your consultation requirements',
            'You\'ll receive a call within 2 hours to schedule your session',
            'Get personalized recommendations and strategic insights',
            'Receive a detailed proposal tailored to your needs'
          ],
          estimated_response_time: '2 hours',
          contact_info: {
            email: 'expert@trebound.com',
            phone: '+91-8447464439'
          }
        };

      case 'contact-form':
        return {
          ...baseResponse,
          message: customMessage || `Thank you for contacting us! Your reference ID is ${referenceId}. We've received your inquiry and our team will get back to you within 24 hours with personalized recommendations.`,
          next_steps: [
            'We\'ll review your team building requirements',
            'Our specialist will call you for detailed consultation',
            'Receive customized activity recommendations',
            'Get a detailed quote and proposal'
          ],
          estimated_response_time: '24 hours',
          contact_info: {
            email: 'hello@trebound.com',
            phone: '+91-8447464439'
          }
        };

      case 'smart-form':
        return {
          ...baseResponse,
          message: customMessage || `Your smart form has been submitted successfully! Reference ID: ${referenceId}. Our AI has analyzed your requirements and our team will contact you with optimized recommendations within 12 hours.`,
          next_steps: [
            'AI analysis of your team building preferences',
            'Personalized activity matching based on your profile',
            'Expert consultation call within 12 hours',
            'Receive AI-optimized recommendations and pricing'
          ],
          estimated_response_time: '12 hours',
          contact_info: {
            email: 'ai-support@trebound.com',
            phone: '+91-8447464439'
          }
        };

      case 'newsletter-signup':
        return {
          ...baseResponse,
          message: customMessage || `Welcome to Trebound! Your subscription reference ID is ${referenceId}. You'll receive our latest team building insights, trends, and exclusive offers directly in your inbox.`,
          next_steps: [
            'Check your email for a welcome message',
            'Get weekly team building tips and insights',
            'Access to exclusive offers and early bird discounts',
            'Be the first to know about new activities and venues'
          ],
          estimated_response_time: 'Immediate',
        };

      case 'global-partner-registration':
        return {
          ...baseResponse,
          message: customMessage || `Thank you for your interest in becoming a Trebound Global Partner! Your application reference ID is ${referenceId}. Our partnerships team will review your application and contact you within 3-5 business days.`,
          next_steps: [
            'Application review by our partnerships team',
            'Initial screening call within 3-5 business days',
            'Partnership agreement discussion',
            'Onboarding process if approved'
          ],
          estimated_response_time: '3-5 business days',
          contact_info: {
            email: 'partnerships@trebound.com',
            phone: '+91-8447464439'
          }
        };

      case 'quote-request':
        return {
          ...baseResponse,
          message: customMessage || `Your quote request has been submitted! Reference ID: ${referenceId}. Our team is preparing a customized proposal based on your requirements and will send it to you within 6 hours.`,
          next_steps: [
            'Detailed analysis of your event requirements',
            'Customized proposal preparation',
            'Quote delivery within 6 hours',
            'Follow-up call to discuss options and answer questions'
          ],
          estimated_response_time: '6 hours',
          contact_info: {
            email: 'quotes@trebound.com',
            phone: '+91-8447464439'
          }
        };

      default:
        return {
          ...baseResponse,
          message: customMessage || `Thank you for your submission! Your reference ID is ${referenceId}. Our team will review your request and get back to you within 24 hours.`,
          next_steps: [
            'Review of your submission',
            'Team consultation and planning',
            'Personalized follow-up within 24 hours'
          ],
          estimated_response_time: '24 hours',
          contact_info: {
            email: 'hello@trebound.com',
            phone: '+91-8447464439'
          }
        };
    }
  }

  /**
   * Send notification to admin about new form submission
   */
  private async sendAdminNotification(submission: FormSubmission): Promise<void> {
    try {
      // This would integrate with your email service
      // For now, we'll just log it
      console.log('New form submission:', {
        reference_id: submission.reference_id,
        form_type: submission.form_type,
        user_email: submission.user_email,
        user_name: submission.user_name,
        timestamp: submission.timestamp
      });

      // You can integrate with services like SendGrid, Mailgun, etc.
      // Example: await emailService.sendAdminNotification(submission);
    } catch (error) {
      console.error('Error sending admin notification:', error);
    }
  }

  /**
   * Get submission by reference ID
   */
  public async getSubmission(referenceId: string): Promise<FormSubmission | null> {
    try {
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .eq('reference_id', referenceId)
        .single();

      if (error) {
        console.error('Error fetching submission:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getSubmission:', error);
      return null;
    }
  }

  /**
   * Update submission status
   */
  public async updateSubmissionStatus(
    referenceId: string, 
    status: FormSubmission['status']
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('form_submissions')
        .update({ status })
        .eq('reference_id', referenceId);

      if (error) {
        console.error('Error updating submission status:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in updateSubmissionStatus:', error);
      return false;
    }
  }

  /**
   * Get analytics data for form submissions
   */
  public async getFormAnalytics(
    formType?: string,
    dateRange?: { start: string; end: string }
  ): Promise<any> {
    try {
      let query = supabase
        .from('form_submissions')
        .select('*');

      if (formType) {
        query = query.eq('form_type', formType);
      }

      if (dateRange) {
        query = query
          .gte('timestamp', dateRange.start)
          .lte('timestamp', dateRange.end);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching analytics:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getFormAnalytics:', error);
      return null;
    }
  }
}

// Export singleton instance
export const formTrackingService = FormTrackingService.getInstance(); 