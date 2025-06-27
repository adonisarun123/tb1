import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import TeamSection from '../../components/TeamSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import PartnersSection from '../../components/PartnersSection';
import PageWrapper from '../../components/PageWrapper';
import { supabase } from '../../lib/supabaseClient';

// Constants
const ITEMS_PER_PAGE = 9;

// Custom Resort Card Component
const ResortCard = ({ 
  name, 
  tagline,
  image, 
  rating = "4.6", 
  slug 
}: { 
  name: string;
  tagline: string;
  image: string; 
  rating?: string; 
  slug: string;
}) => {
  // Create title in the format "Team Outing at [Resort Name], Bangalore"
  const title = `Team Outing at ${name}${name.toLowerCase().includes('bangalore') ? '' : ', Bangalore'}`;
  
  return (
    <div className="p-5 bg-[#f6f6f6] rounded-[16px]">
      <div className="relative aspect-[386/304] rounded-[16px] overflow-hidden mb-4">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white rounded-full px-2 py-1 flex items-center shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF4C39" className="w-4 h-4 mr-1">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path>
          </svg>
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>
      <div className="space-y-2 flex-1">
        <h3 className="text-lg font-semibold font-['DM Sans'] text-[#313131]">{title}</h3>
        <p className="text-base font-normal font-['DM Sans'] text-[#636363] line-clamp-2">{tagline}</p>
      </div>
      <div className="mt-4">
        <div className="relative w-full h-[45px] group">
          <div className="absolute inset-0 bg-gradient-to-b from-[#FF4C39] to-[#FFB573] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[8px]"></div>
          <Link 
            className="absolute inset-0 w-full h-full flex items-center justify-center gap-2 border border-[#b1b1b1] rounded-[8px] group-hover:border-transparent transition-colors duration-300" 
            to={`/stays/${slug}`}
            data-discover="true"
          >
            <span className="text-base font-bold font-['DM Sans'] text-[#b1b1b1] group-hover:text-white transition-colors duration-300">Book Now</span>
            <svg 
              stroke="currentColor" 
              fill="none" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-4 h-4 text-[#b1b1b1] group-hover:text-white transition-colors duration-300" 
              height="1em" 
              width="1em" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

interface DisplayResort {
  id: number;
  name: string;
  image: string;
  tagline: string;
  slug: string;
  rating?: string;
}

const CorporateTeamOutingBangalore = () => {
  const [resorts, setResorts] = useState<DisplayResort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [ref] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [resortsRef, resortsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [benefitsRef, benefitsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const benefits = [
    {
      title: "Strategic Location",
      description: "All venues are within 1-2 hours from Bangalore city, making them perfect for day outings and overnight stays."
    },
    {
      title: "Professional Management",
      description: "Expert event coordinators to ensure smooth execution of your corporate team outing."
    },
    {
      title: "Comprehensive Facilities",
      description: "Modern amenities, conference rooms, and activity areas for a complete corporate experience."
    },
    {
      title: "Customizable Packages",
      description: "Flexible packages that can be tailored to your team size, duration, and specific requirements."
    }
  ];

  useEffect(() => {
    const fetchResorts = async () => {
      try {
        setLoading(true);
        console.log('Fetching resorts from Supabase...');
        
        // First get total count
        const { count } = await supabase
          .from('stays')
          .select('*', { count: 'exact', head: true })
          .ilike('destination', '%bangalore%');

        setTotalPages(Math.ceil((count || 0) / ITEMS_PER_PAGE));
        
        // Then fetch paginated data
        const { data, error } = await supabase
          .from('stays')
          .select('*')
          .ilike('destination', '%bangalore%')
          .range((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE - 1)
          .order('id', { ascending: true });

        if (error) {
          console.error('Supabase error details:', error);
          throw error;
        }

        if (!data || data.length === 0) {
          console.log('No resorts found for Bangalore.');
          setResorts([]);
          return;
        }

        // Transform the data to match our display interface
        const transformedResorts: DisplayResort[] = data.map(resort => {
          // Clean HTML content if needed
          const cleanHtmlContent = (html: string) => {
            const div = document.createElement('div');
            div.innerHTML = html;
            return div.textContent || '';
          };

          return {
            id: resort.id,
            name: resort.name || '',
            image: resort.stay_image || resort.banner_image_url || resort.image_url || resort.image_1 || '/placeholder.jpg',
            tagline: resort.tagline || cleanHtmlContent(resort.stay_description || '') || 'Experience luxury and comfort in the heart of Bangalore',
            slug: resort.slug || '',
            rating: "4.6" // Default rating
          };
        });

        setResorts(transformedResorts);
        setLoading(false);
      } catch (err) {
        console.error('Detailed error:', err);
        setError('Failed to fetch resorts. Please try again later.');
        setLoading(false);
      }
    };

    fetchResorts();
  }, [currentPage]); // Add currentPage as dependency

  // Pagination component
  const Pagination = () => {
    return (
      <div className="flex justify-center items-center space-x-2 mt-8">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <PageWrapper className="min-h-screen bg-white">
      <Helmet>
        <title>Corporate Team Outing in Bangalore | Best Team Building Venues | Trebound</title>
        <meta name="description" content="Discover the best corporate team outing venues in Bangalore. From luxury resorts to adventure camps, find the perfect location for your next team building event. Book now!" />
        <meta name="keywords" content="corporate team outing bangalore, team building venues bangalore, corporate offsite bangalore, team outing places near bangalore" />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section ref={ref} className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full object-cover"
            style={{
              backgroundImage: "url('/images/bangalore.jpg')",
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-[64px] font-bold text-white mb-6 font-outfit leading-[74.6px] tracking-tight"
            >
              Corporate Team Outing<br />in Bangalore
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg max-w-none text-gray-600 [&>p]:text-[1.125rem] [&>p]:leading-relaxed [&>p]:mb-6"
            >
              <p>
                In this globally competitive world, the quality of deliverable an organization produces depends on the quality of work each of its teams does. <Link to="/corporate-team-outing-in-bangalore" className="text-[#FF4C39] hover:text-[#FF6B5C]">Team bonding</Link> is the core strength that makes the teams work towards achieving a common goal which can be built through <Link to="/corporate-team-outing-in-bangalore" className="text-[#FF4C39] hover:text-[#FF6B5C]">corporate team outings</Link>. To many members, <Link to="/corporate-team-outing-in-bangalore" className="text-[#FF4C39] hover:text-[#FF6B5C]">corporate team outbound</Link> might be a chance to break the barriers that were holding them back and start with a new beginning.
              </p>
              <p>
                At the very core, the corporate team outings are stress busters, which help the employees to take a break from their routine hectic schedule and connect with their team members on a more personal level. Also, when organizations take such initiatives, it makes their employees feel more valued and respected, so this will ultimately motivate them to make good use of this opportunity to grow both as individuals and as teams.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20" ref={benefitsRef}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#313131] mb-4">
              Why Choose Bangalore for Corporate Outings?
            </h2>
            <p className="text-lg text-[#636363] max-w-2xl mx-auto">
              Bangalore offers the perfect blend of accessibility, infrastructure, and natural beauty for memorable <Link to="/corporate-team-outing-in-bangalore" className="text-[#FF4C39] hover:text-[#FF6B5C]">corporate team outings</Link>.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF4C39" className="w-4 h-4 mr-1">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#313131] mb-2">{benefit.title}</h3>
                <p className="text-[#636363]">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resorts Section */}
      <section className="py-12 bg-gray-50" ref={resortsRef}>
        <div className="max-w-[1440px] mx-auto px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={resortsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2 className="text-[40px] font-bold text-[#FF4C39] mb-4">
              Where You'll Be Staying
            </h2>
            <p className="text-lg text-[#636363] max-w-2xl mx-auto">
              Discover luxurious accommodations and amenities designed to make your team outing memorable and comfortable.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4C39]"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-8">
              {error}
            </div>
          ) : resorts.length === 0 ? (
            <div className="text-center text-gray-600 py-8">
              No resorts found in Bangalore.
            </div>
          ) : (
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resorts.map((resort, index) => (
                <motion.div
                  key={resort.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={resortsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="group"
                >
                    <ResortCard
                      name={resort.name}
                      tagline={resort.tagline}
                      image={resort.image}
                      rating={resort.rating}
                      slug={resort.slug}
                    />
                </motion.div>
              ))}
            </div>
              <Pagination />
            </>
          )}
        </div>
      </section>

      {/* About Bangalore Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-8">
              Corporate Team Outings in Namma Bengaluru
            </h3>
            <div className="prose prose-lg max-w-none text-gray-600 [&>p]:text-[1.125rem] [&>p]:leading-relaxed [&>p]:mb-6">
              <p>
                Bengaluru, popularly known as Bangalore, the capital city of Karnataka is famous for its cool climate and lush greenery, which is why it is known as the 'Garden City of India'. In spite of being a populous city, it is referred to as a peaceful haven. The climate of this city is a perfect mixture of warmth and cold, thus presenting a very welcoming picture to tourists as well as its inhabitants.
              </p>
              <p>
                Now that it is established that corporate team outings are very important, it is time to remember that it is a complex process. First, the need of the organization must be kept in mind, and then the place must be chosen according to the budget of the organization and duration for which they intend to have the outing. It is also important to choose different places for different occasions so that the employees are not bored going to the same place.
              </p>
              <p>
                It takes a huge amount of time and energy to organize a perfect team outing for your employees and we at Trebound dedicate ourselves to do exactly that. We understand the importance and work hard to deliver nothing short of excellent service in planning, organizing and executing your team outings. Make your team happy during <Link to="/corporate-team-outing-in-bangalore" className="text-[#FF4C39] hover:text-[#FF6B5C]">corporate team outings in Bangalore</Link> and let them erase all the worries, anxieties and stress from their routine and hectic job schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Venue Types Section */}
      <section className="py-24 bg-[#002B4F] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">
              Types of Team Outing Venues in Bangalore
            </h3>
            
            <div className="space-y-12">
              <div>
                <h4 className="text-2xl font-semibold mb-4">Resorts as haven for your team</h4>
                <p className="text-lg leading-relaxed">
                  There are several resorts in the city that are just perfect for hosting your corporate team outings. Resorts usually opt as destinations for team outings. They offer several amenities in one place, where the teams can stay together and enjoy their time getting to know each other. Resorts offer perfect combinations of indoor and outdoor activities which your team members can enjoy together. Trebound team aids in picking the best one based on the goal set, the size of the team and activities required.
                </p>
                <p className="text-lg leading-relaxed mt-4">
                  To name a few, The Guhantara underground resort, <Link to="/resorts/windflower-prakruthi-bangalore" className="text-[#FF4C39] hover:text-[#FF6B5C]">Windflower Prakruthi Resort</Link>, Goldfinch Resort are some of the resorts which your employees will definitely enjoy your team outbound in Bangalore.
                </p>
              </div>

              <div>
                <h4 className="text-2xl font-semibold mb-4">Adventure Camps for team bound activities</h4>
                <p className="text-lg leading-relaxed">
                  Adventure camps, as the term rightly says, are the best places to bring out the adventurer in your teams. These are places where you can challenge yourself and push your boundaries in order to experiment with new and exciting adventures. Such adventures activities encourage your teams to measure and manage risks very well. Some of the activities in adventure camps include Trekking, Rock Climbing, River rafting which will truly help you to let go of your inhibitions.
                </p>
              </div>

              <div>
                <h4 className="text-2xl font-semibold mb-4">Theme Parks for an amazing experience</h4>
                <p className="text-lg leading-relaxed">
                  It is very important to have some amount of childishness in you after all that is what is going to help you stay curious and learn new things. The child in us comes out and makes wonders when we are surrounded by people we are comfortable with. Such comfort feel is essential while working as a team which ultimately strengthen the communication and results in overall success.
                </p>
                <p className="text-lg leading-relaxed mt-4">
                  Bangalore is home to several wonderful amusement parks such as <Link to="/resorts/wonderla-bangalore" className="text-[#FF4C39] hover:text-[#FF6B5C]">Wonder La</Link>, GRS Amusement Park, Lumbini water park which will help you become a child once again, let go of all your fears and enjoy every single moment to the fullest. These places rejuvenate your employees so much that they feel refreshed for days to come.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Partners Section */}
      <PartnersSection />

      <ContactSection />
      <Footer />
    </PageWrapper>
  );
};

export default CorporateTeamOutingBangalore; 