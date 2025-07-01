import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { webhookService } from '../../lib/webhookService';
import { formTrackingService } from '../../lib/formTrackingService';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Please enter your email address');
      setStatus('error');
      return;
    }

    try {
      setStatus('loading');
      
      // Send to n8n webhook (non-blocking)
      try {
        const webhookData = webhookService.prepareNewsletterData(email);
        
        // Send to webhook without waiting for response (fire and forget)
        webhookService.sendToWebhook(webhookData).catch(error => {
          console.error('N8N webhook failed (non-blocking):', error);
        });
      } catch (webhookError) {
        console.error('Error preparing webhook data (non-blocking):', webhookError);
      }
      
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/newsletter_subscriptions`, {
        method: 'POST',
        headers: {
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          email,
          is_active: true
        })
      });

      if (response.ok) {
        // Track the newsletter signup
        try {
          const trackingResponse = await formTrackingService.submitForm(
            'newsletter-signup',
            { email }
          );
          console.log('Newsletter signup tracked:', trackingResponse.reference_id);
        } catch (trackingError) {
          console.error('Error tracking newsletter signup:', trackingError);
        }
        
        setStatus('success');
        setMessage('Thank you for subscribing to our newsletter!');
        setEmail('');
        // Redirect to thank you page after successful subscription
        setTimeout(() => {
          window.location.href = '/thank-you';
        }, 2000);
      } else {
        const error = await response.json();
        if (error.code === '23505') { // Unique violation
          setStatus('error');
          setMessage('This email is already subscribed to our newsletter.');
        } else {
          throw new Error('Subscription failed');
        }
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      className="bg-[#0A2342] py-20 px-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-outfit">
          Join Us on Our Journey
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Be part of our journey as we continue to innovate and inspire.
          Join us in creating unforgettable team-building experiences.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors duration-200"
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-gradient-primary text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          {message && (
            <div 
              className={`mt-3 text-sm ${
                status === 'success' ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </motion.section>
  );
};

export default NewsletterSection; 