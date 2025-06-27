import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiUsers, FiClock, FiShare2, FiArrowRight } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import NewsletterSection from '../../components/NewsletterSection';
import PageWrapper from '../../components/PageWrapper';

interface TeamBuildingPage {
  id: number;
  name: string;
  slug: string;
  small_description: string;
  main_image: string;
  thumbnail_image: string;
  featured: boolean;
  post_body: string;
}

const TeamBuildingDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<TeamBuildingPage | null>(null);
  const [similarPages, setSimilarPages] = useState<TeamBuildingPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/landing_pages?slug=eq.${slug}&select=*`,
          {
            headers: {
              'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setPage(data[0]);
            
            // Fetch similar pages
            const similarResponse = await fetch(
              `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/landing_pages?id=neq.${data[0].id}&limit=3`,
              {
                headers: {
                  'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
                  'Content-Type': 'application/json'
                }
              }
            );
            
            if (similarResponse.ok) {
              const similarData = await similarResponse.json();
              setSimilarPages(similarData);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching team building page:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPage();
    }
  }, [slug]);

  const handleShare = async () => {
    try {
      if (navigator.share && page) {
        await navigator.share({
          title: page.name,
          text: page.small_description,
          url: window.location.href
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-2xl text-red-500">Activity not found</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${page.name} | Team Building Activities | Trebound`}</title>
        <meta name="description" content={page.small_description} />
        <meta property="og:title" content={page.name} />
        <meta property="og:description" content={page.small_description} />
        <meta property="og:image" content={page.main_image} />
        <meta property="og:type" content="article" />
      </Helmet>

      <PageWrapper className="min-h-screen bg-white">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content Column */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="order-2 lg:order-1"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-outfit leading-tight">
                  {page.name}
                </h1>
                
                <p className="text-xl text-gray-600 mb-8 font-dm-sans">
                  {page.small_description}
                </p>
                
                <div className="flex flex-wrap gap-6 text-gray-600 text-lg mb-8">
                  <div className="flex items-center">
                    <FiUsers className="mr-2 text-[#FF4C39]" />
                    <span>Team Activity</span>
                  </div>
                  <div className="flex items-center">
                    <FiClock className="mr-2 text-[#FF4C39]" />
                    <span>2-4 Hours</span>
                  </div>
                  <button 
                    onClick={handleShare}
                    className="flex items-center text-[#FF4C39] hover:text-[#FFB573] transition-colors"
                  >
                    <FiShare2 className="mr-2" />
                    <span>Share</span>
                  </button>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  Partner with Us
                  <FiArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </motion.div>

              {/* Image Column */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="order-1 lg:order-2"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={page.main_image || page.thumbnail_image} 
                    alt={page.name}
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Content Section */}
        <section className="py-20 px-4 lg:px-8 bg-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div 
              className="prose prose-lg max-w-none [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:font-outfit [&>h1]:mb-8 
                         [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:font-outfit [&>h2]:mb-6 [&>h2]:mt-12
                         [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:font-outfit [&>h3]:mb-4 [&>h3]:mt-8
                         [&>p]:text-gray-600 [&>p]:leading-relaxed [&>p]:mb-6 [&>p]:text-lg
                         [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:text-gray-600 [&>ul>li]:mb-2
                         [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:text-gray-600 [&>ol>li]:mb-2
                         [&>blockquote]:border-l-4 [&>blockquote]:border-[#FF4C39] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-700 [&>blockquote]:my-8
                         [&>img]:rounded-xl [&>img]:shadow-lg [&>img]:my-8 [&>img]:w-full [&>img]:max-w-full
                         [&>a]:text-[#FF4C39] [&>a]:no-underline [&>a]:font-medium [&>a]:transition-colors [&>a:hover]:text-[#FFB573]
                         [&>table]:w-full [&>table]:my-8 [&>table]:border-collapse
                         [&>table>thead>tr>th]:bg-gray-100 [&>table>thead>tr>th]:p-3 [&>table>thead>tr>th]:text-left [&>table>thead>tr>th]:border [&>table>thead>tr>th]:border-gray-300
                         [&>table>tbody>tr>td]:p-3 [&>table>tbody>tr>td]:border [&>table>tbody>tr>td]:border-gray-300"
              dangerouslySetInnerHTML={{ __html: page.post_body }}
            />
          </motion.div>
        </section>

        {/* Similar Activities Section */}
        {similarPages.length > 0 && (
          <section className="py-24 px-4 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 font-outfit">
                  <span className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">
                    More Activities
                  </span>
                </h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] mx-auto rounded-full"></div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {similarPages.map((similarPage) => (
                  <motion.div
                    key={similarPage.id}
                    className="rounded-xl overflow-hidden bg-white shadow-xl transition-all duration-300 hover:shadow-2xl h-full flex flex-col"
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <Link to={`/teambuilding/${similarPage.slug}`} className="block h-full flex flex-col">
                      <div className="relative h-48 md:h-60 overflow-hidden">
                        <img
                          src={similarPage.thumbnail_image || similarPage.main_image}
                          alt={similarPage.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-gray-900/70 to-transparent w-full h-1/3"></div>
                      </div>
                      
                      <div className="p-6 flex-grow flex flex-col">          
                        <h3 className="text-xl font-medium text-primary mb-3 line-clamp-2 font-outfit">
                          {similarPage.name}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                          {similarPage.small_description}
                        </p>
                        
                        <div className="mt-auto pt-4">
                          <span className="inline-flex items-center text-[rgb(26,54,93)] font-medium group no-underline">
                            Learn More
                            <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-outfit">
                Ready to Partner with Trebound?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Let's create unforgettable team experiences together.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                Get Started
                <FiArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        <NewsletterSection />
        <Footer />
      </PageWrapper>
    </>
  );
};

export default TeamBuildingDetail; 