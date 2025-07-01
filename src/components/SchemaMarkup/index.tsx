import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SchemaMarkupProps {
  type: 'organization' | 'activity' | 'venue' | 'article' | 'product' | 'faq' | 'homepage';
  data: any;
}

const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ type, data }) => {
  const generateSchema = (): any => {
    const baseSchema: any = {
      "@context": "https://schema.org",
      "@graph": []
    };

    switch (type) {
      case 'organization':
        baseSchema["@graph"].push({
          "@type": "Organization",
          "@id": "https://www.trebound.com/#organization",
          "name": "Trebound",
          "alternateName": "Trebound Team Building",
          "url": "https://www.trebound.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.trebound.com/images/trebound-logo.png",
            "width": 400,
            "height": 100
          },
          "description": "AI-powered team building and corporate events solutions with 350+ unique activities",
          "foundingDate": "2018",
          "slogan": "AI-Powered Team Building Solutions",
          "contactPoint": [{
            "@type": "ContactPoint",
            "telephone": "+91-8447464439",
            "contactType": "customer service",
            "areaServed": "IN",
            "availableLanguage": ["en", "hi"]
          }],
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN",
            "addressRegion": "Karnataka",
            "addressLocality": "Bangalore"
          },
          "sameAs": [
            "https://www.linkedin.com/company/trebound",
            "https://www.facebook.com/trebound",
            "https://twitter.com/trebound"
          ],
          "serviceType": "Team Building Services",
          "areaServed": {
            "@type": "Country",
            "name": "India"
          },
          "knowsAbout": [
            "Team Building",
            "Corporate Events",
            "Virtual Team Building",
            "Outdoor Activities",
            "Corporate Training",
            "Employee Engagement",
            "AI-Powered Recommendations"
          ]
        });
        break;

      case 'activity':
        baseSchema["@graph"].push({
          "@type": "Product",
          "@id": `https://www.trebound.com/team-building-activity/${data.slug}#product`,
          "name": data.name,
          "description": data.description || data.tagline,
          "image": data.image || data.activity_image,
          "brand": {
            "@type": "Brand",
            "name": "Trebound"
          },
          "category": "Team Building Activity",
          "additionalType": "https://schema.org/Service",
          "serviceType": data.activity_type || "Team Building",
          "provider": {
            "@id": "https://www.trebound.com/#organization"
          },
          "audience": {
            "@type": "BusinessAudience",
            "audienceType": "Corporate Teams",
            "geographicArea": {
              "@type": "Country",
              "name": "India"
            }
          },
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "price": data.price || "Contact for pricing",
            "priceCurrency": "INR"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "150",
            "bestRating": "5",
            "worstRating": "1"
          },
          "keywords": data.keywords || `${data.name}, team building, corporate activities`,
          "duration": data.duration || "2-3 hours",
          "participants": data.group_size || "10-50 people"
        });
        break;

      case 'venue':
        const venueSchema: any = {
          "@type": ["Place", "TouristAttraction"],
          "@id": `https://www.trebound.com/stays/${data.slug}#place`,
          "name": data.name,
          "description": data.stay_description || data.tagline,
          "image": data.stay_image,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": data.location,
            "addressCountry": "IN"
          },
          "starRating": {
            "@type": "Rating",
            "ratingValue": data.rating || "4.5"
          },
          "priceRange": data.price_range || "₹₹",
          "servesCuisine": data.cuisine || "Multi-cuisine",
          "maximumAttendeeCapacity": data.capacity || 100,
          "isAccessibleForFree": false,
          "publicAccess": true
        };

        if (data.coordinates) {
          venueSchema.geo = {
            "@type": "GeoCoordinates",
            "latitude": data.coordinates.lat,
            "longitude": data.coordinates.lng
          };
        }

        if (data.facilities) {
          venueSchema.amenityFeature = data.facilities.split(',').map((facility: string) => ({
            "@type": "LocationFeatureSpecification",
            "name": facility.trim(),
            "value": true
          }));
        }

        baseSchema["@graph"].push(venueSchema);
        break;

      case 'article':
        baseSchema["@graph"].push({
          "@type": "Article",
          "@id": `https://www.trebound.com/blog/${data.slug}#article`,
          "headline": data.name,
          "description": data.small_description,
          "image": data.main_image,
          "datePublished": data.published_on,
          "dateModified": data.updated_at || data.published_on,
          "author": {
            "@type": "Person",
            "name": data.author || "Trebound Team",
            "url": "https://www.trebound.com/about"
          },
          "publisher": {
            "@id": "https://www.trebound.com/#organization"
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.trebound.com/blog/${data.slug}`
          },
          "articleSection": "Team Building",
          "keywords": data.blog_post_tags || "team building, corporate events",
          "wordCount": data.word_count || 1000,
          "inLanguage": "en-US",
          "about": {
            "@type": "Thing",
            "name": "Team Building",
            "description": "Corporate team building activities and strategies"
          }
        });
        break;

      case 'faq':
        baseSchema["@graph"].push({
          "@type": "FAQPage",
          "@id": `${data.url}#faq`,
          "mainEntity": data.faqs.map((faq: any, index: number) => ({
            "@type": "Question",
            "@id": `${data.url}#faq-${index}`,
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        });
        break;

      case 'homepage':
        baseSchema["@graph"].push({
          "@type": "WebSite",
          "@id": "https://www.trebound.com/#website",
          "url": "https://www.trebound.com",
          "name": "Trebound - AI-Powered Team Building Solutions",
          "description": "Transform your team with AI-powered team building activities, corporate events, and professional development programs.",
          "publisher": {
            "@id": "https://www.trebound.com/#organization"
          },
          "potentialAction": [
            {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.trebound.com/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            },
            {
              "@type": "InteractAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.trebound.com/ai-chat",
                "actionPlatform": [
                  "http://schema.org/DesktopWebPlatform",
                  "http://schema.org/MobileWebPlatform"
                ]
              },
              "object": {
                "@type": "SoftwareApplication",
                "name": "AI Chatbot",
                "description": "Get instant recommendations for team building activities"
              }
            }
          ],
          "mainEntity": {
            "@type": "ItemList",
            "name": "Team Building Services",
            "description": "Comprehensive list of AI-powered team building solutions",
            "numberOfItems": 350,
            "itemListElement": [
              {
                "@type": "Service",
                "name": "Virtual Team Building",
                "description": "AI-curated virtual team building experiences"
              },
              {
                "@type": "Service",
                "name": "Outdoor Activities",
                "description": "Adventure-based team building programs"
              },
              {
                "@type": "Service",
                "name": "Corporate Training",
                "description": "Professional development and skills training"
              }
            ]
          },
          "hasPart": [
            {
              "@type": "SoftwareApplication",
              "name": "AI Recommendation Engine",
              "description": "Personalized team building activity recommendations",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web Browser"
            }
          ]
        });
        break;

      default:
        return null;
    }

    return baseSchema;
  };

  const schema = generateSchema();
  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema, null, 2)}
      </script>
    </Helmet>
  );
};

export default SchemaMarkup; 