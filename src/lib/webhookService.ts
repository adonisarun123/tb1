// Webhook service for sending form data to n8n
export interface WebhookData {
  // Common fields for all forms
  formType: 'contact' | 'newsletter' | 'job_application' | 'partner_registration' | 'bangalore_resorts';
  timestamp: string;
  pageUrl: string;
  pageTitle: string;
  
  // Contact form fields
  name?: string;
  work_email?: string;
  email?: string;
  phone?: string;
  company?: string;
  preferred_destination?: string;
  number_of_pax?: number;
  more_details?: string;
  message?: string;
  activity_type?: string;
  
  // Newsletter fields
  newsletter_email?: string;
  
  // Job application fields
  job_id?: number;
  job_title?: string;
  applicant_name?: string;
  resume_url?: string;
  portfolio_url?: string;
  cover_letter?: string;
  experience_years?: string;
  current_company?: string;
  notice_period?: string;
  expected_salary?: string;
  
  // Partner registration fields
  company_name?: string;
  website?: string;
  first_name?: string;
  last_name?: string;
  country?: string;
  city?: string;
  company_type?: string;
  employee_count?: string;
  years_in_business?: string;
  services_offered?: string[];
  
  // Bangalore resorts specific
  team_size?: string;
  
  // Additional metadata
  user_agent?: string;
  ip_address?: string;
}

class WebhookService {
  private n8nWebhookUrl: string;
  private isEnabled: boolean;

  constructor() {
    this.n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || '';
    this.isEnabled = !!this.n8nWebhookUrl;
    
    if (!this.isEnabled) {
      console.warn('N8N webhook URL not configured. Webhook submissions will be disabled.');
    }
  }

  /**
   * Send data to n8n webhook
   */
  async sendToWebhook(data: WebhookData): Promise<boolean> {
    if (!this.isEnabled) {
      console.log('N8N webhook disabled, skipping webhook submission');
      return false;
    }

    try {
      console.log('Sending data to n8n webhook:', data);
      
      const response = await fetch(this.n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`N8N webhook error: ${response.status} - ${errorText}`);
        return false;
      }

      console.log('Successfully sent data to n8n webhook');
      return true;
    } catch (error) {
      console.error('Error sending to n8n webhook:', error);
      return false;
    }
  }

  /**
   * Prepare contact form data for webhook
   */
  prepareContactData(formData: {
    name: string;
    work_email: string;
    phone?: string;
    company?: string;
    preferred_destination?: string;
    number_of_pax?: number;
    more_details?: string;
    message?: string;
    activity_type?: string;
  }): WebhookData {
    return {
      formType: 'contact',
      timestamp: new Date().toISOString(),
      pageUrl: window.location.href,
      pageTitle: document.title,
      name: formData.name,
      work_email: formData.work_email,
      phone: formData.phone,
      company: formData.company,
      preferred_destination: formData.preferred_destination,
      number_of_pax: formData.number_of_pax,
      more_details: formData.more_details || formData.message,
      activity_type: formData.activity_type,
      user_agent: navigator.userAgent,
    };
  }

  /**
   * Prepare newsletter data for webhook
   */
  prepareNewsletterData(email: string): WebhookData {
    return {
      formType: 'newsletter',
      timestamp: new Date().toISOString(),
      pageUrl: window.location.href,
      pageTitle: document.title,
      newsletter_email: email,
      user_agent: navigator.userAgent,
    };
  }

  /**
   * Prepare job application data for webhook
   */
  prepareJobApplicationData(jobData: {
    job_id: number;
    job_title: string;
    applicant_name: string;
    email: string;
    phone?: string;
    resume_url: string;
    portfolio_url?: string;
    cover_letter?: string;
    experience_years?: string;
    current_company?: string;
    notice_period?: string;
    expected_salary?: string;
  }): WebhookData {
    return {
      formType: 'job_application',
      timestamp: new Date().toISOString(),
      pageUrl: window.location.href,
      pageTitle: document.title,
      job_id: jobData.job_id,
      job_title: jobData.job_title,
      applicant_name: jobData.applicant_name,
      email: jobData.email,
      phone: jobData.phone,
      resume_url: jobData.resume_url,
      portfolio_url: jobData.portfolio_url,
      cover_letter: jobData.cover_letter,
      experience_years: jobData.experience_years,
      current_company: jobData.current_company,
      notice_period: jobData.notice_period,
      expected_salary: jobData.expected_salary,
      user_agent: navigator.userAgent,
    };
  }

  /**
   * Prepare partner registration data for webhook
   */
  preparePartnerRegistrationData(partnerData: {
    company_name: string;
    website?: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    company_type: string;
    employee_count?: string;
    years_in_business?: string;
    services_offered: string[];
    message?: string;
  }): WebhookData {
    return {
      formType: 'partner_registration',
      timestamp: new Date().toISOString(),
      pageUrl: window.location.href,
      pageTitle: document.title,
      company_name: partnerData.company_name,
      website: partnerData.website,
      first_name: partnerData.first_name,
      last_name: partnerData.last_name,
      email: partnerData.email,
      phone: partnerData.phone,
      country: partnerData.country,
      city: partnerData.city,
      company_type: partnerData.company_type,
      employee_count: partnerData.employee_count,
      years_in_business: partnerData.years_in_business,
      services_offered: partnerData.services_offered,
      more_details: partnerData.message,
      user_agent: navigator.userAgent,
    };
  }

  /**
   * Prepare Bangalore resorts form data for webhook
   */
  prepareBangaloreResortsData(resortData: {
    name: string;
    email: string;
    company: string;
    phone: string;
    team_size: string;
    message?: string;
  }): WebhookData {
    return {
      formType: 'bangalore_resorts',
      timestamp: new Date().toISOString(),
      pageUrl: window.location.href,
      pageTitle: document.title,
      name: resortData.name,
      email: resortData.email,
      company: resortData.company,
      phone: resortData.phone,
      team_size: resortData.team_size,
      more_details: resortData.message,
      user_agent: navigator.userAgent,
    };
  }
}

// Export singleton instance
export const webhookService = new WebhookService(); 