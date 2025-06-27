import { Helmet } from 'react-helmet-async';

// Analytics configuration - add your IDs here or use environment variables
const ANALYTICS_CONFIG = {
  // Google Analytics 4
  GA4_ID: import.meta.env.VITE_GA4_ID || '',
  
  // Google Tag Manager
  GTM_ID: import.meta.env.VITE_GTM_ID || '',
  
  // Facebook Pixel
  FACEBOOK_PIXEL_ID: import.meta.env.VITE_FACEBOOK_PIXEL_ID || '',
  
  // Google Search Console verification
  GOOGLE_SITE_VERIFICATION: import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || '',
  
  // Microsoft Clarity
  CLARITY_ID: import.meta.env.VITE_CLARITY_ID || '',
  
  // Hotjar
  HOTJAR_ID: import.meta.env.VITE_HOTJAR_ID || '',
  
  // LinkedIn Insight Tag
  LINKEDIN_PARTNER_ID: import.meta.env.VITE_LINKEDIN_PARTNER_ID || '',
};

const Analytics = () => {
  const shouldLoadAnalytics = import.meta.env.PROD || import.meta.env.VITE_ENABLE_ANALYTICS === 'true';

  if (!shouldLoadAnalytics) {
    return null;
  }

  return (
    <Helmet>
      {/* Google Tag Manager */}
      {ANALYTICS_CONFIG.GTM_ID && (
        <>
          <script>
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${ANALYTICS_CONFIG.GTM_ID}');
            `}
          </script>
          <noscript>
            {`<iframe src="https://www.googletagmanager.com/ns.html?id=${ANALYTICS_CONFIG.GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`}
          </noscript>
        </>
      )}

      {/* Google Analytics 4 */}
      {ANALYTICS_CONFIG.GA4_ID && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.GA4_ID}`}
          ></script>
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ANALYTICS_CONFIG.GA4_ID}');
            `}
          </script>
        </>
      )}

      {/* Google Search Console Verification */}
      {ANALYTICS_CONFIG.GOOGLE_SITE_VERIFICATION && (
        <meta name="google-site-verification" content={ANALYTICS_CONFIG.GOOGLE_SITE_VERIFICATION} />
      )}

      {/* Facebook Pixel */}
      {ANALYTICS_CONFIG.FACEBOOK_PIXEL_ID && (
        <>
          <script>
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${ANALYTICS_CONFIG.FACEBOOK_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </script>
          <noscript>
            {`<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${ANALYTICS_CONFIG.FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1" />`}
          </noscript>
        </>
      )}

      {/* Microsoft Clarity */}
      {ANALYTICS_CONFIG.CLARITY_ID && (
        <script>
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${ANALYTICS_CONFIG.CLARITY_ID}");
          `}
        </script>
      )}

      {/* Hotjar */}
      {ANALYTICS_CONFIG.HOTJAR_ID && (
        <script>
          {`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:${ANALYTICS_CONFIG.HOTJAR_ID},hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </script>
      )}

      {/* LinkedIn Insight Tag */}
      {ANALYTICS_CONFIG.LINKEDIN_PARTNER_ID && (
        <script>
          {`
            _linkedin_partner_id = "${ANALYTICS_CONFIG.LINKEDIN_PARTNER_ID}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);})(window.lintrk);
          `}
        </script>
      )}

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
    </Helmet>
  );
};

export default Analytics; 