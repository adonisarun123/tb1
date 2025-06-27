import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import TeamSection from '../../components/TeamSection';
import ActivitiesSection from '../../components/ActivitiesSection';
import WhyChooseTreboundSection from '../../components/WhyChooseTreboundSection';
import HowItWorksProcessSection from '../../components/HowItWorksProcessSection';
import PageWrapper from '../../components/PageWrapper';

interface Resort {
  id: number;
  name: string;
  stay_image?: string;
  banner_image_url?: string;
  image_url?: string;
  image_1?: string;
  tagline?: string;
  stay_description?: string;
  slug: string;
}

// Resort Card Component
const ResortCard = ({ name, tagline, image, rating = "4.6", slug }: { name: string; tagline: string; image: string; rating?: string; slug: string; }) => {
  const title = `Team Outing at ${name}${name.toLowerCase().includes('bangalore') ? '' : ', Bangalore'}`;
  return (
    <div className="p-5 bg-[#f6f6f6] rounded-[16px]">
      <div className="relative aspect-[386/304] rounded-[16px] overflow-hidden mb-4">
        <img src={image} alt={title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3 bg-white rounded-full px-2 py-1 flex items-center shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF4C39" className="w-4 h-4 mr-1"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path></svg>
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
          <a className="absolute inset-0 w-full h-full flex items-center justify-center gap-2 border border-[#b1b1b1] rounded-[8px] group-hover:border-transparent transition-colors duration-300" href={`/stays/${slug}`} data-discover="true">
            <span className="text-base font-bold font-['DM Sans'] text-[#b1b1b1] group-hover:text-white transition-colors duration-300">Book Now</span>
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#b1b1b1] group-hover:text-white transition-colors duration-300" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
        </div>
      </div>
    </div>
  );
};

// Best Bangalore Stays Section
const BestBangaloreStaysSection = () => {
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchResorts = async () => {
      setLoading(true);
      try {
        // Get total count
        const { count } = await supabase
          .from('stays')
          .select('*', { count: 'exact', head: true })
          .ilike('destination', '%bangalore%');
        setTotalPages(Math.ceil((count || 0) / ITEMS_PER_PAGE));
        // Fetch paginated data
        const { data, error } = await supabase
          .from('stays')
          .select('*')
          .ilike('destination', '%bangalore%')
          .range((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE - 1)
          .order('id', { ascending: true });
        if (error) throw error;
        setResorts(data || []);
      } catch (err) {
        setError('Failed to fetch resorts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchResorts();
  }, [currentPage]);

  const Pagination = () => (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} disabled={currentPage === 1} className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">Previous</button>
      <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
      <button onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">Next</button>
    </div>
  );

  if (loading) return <div className="flex justify-center items-center min-h-[400px]"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4C39]" /></div>;
  if (error) return <div className="text-center text-red-600 py-8">{error}</div>;
  if (!resorts.length) return <div className="text-center text-gray-600 py-8">No stays found for Bangalore.</div>;

  return (
    <section className="py-[64px] bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-24">
        <div className="text-center mb-16">
          <h2 className="text-[40px] font-bold text-[#313131] mb-4">
            Browse <span className="text-[#FF4C39]">Team Outing Places</span> In And Around Bangalore
          </h2>
          <p className="text-lg text-[#636363] max-w-3xl mx-auto">
            Discover the best resorts and stays for your next team outing in Bangalore. All venues are handpicked for their unique experiences, amenities, and proximity to the city.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resorts.map((resort) => (
            <ResortCard
              key={resort.id}
              name={resort.name}
              tagline={resort.tagline || resort.stay_description || 'Experience luxury and comfort in the heart of Bangalore'}
              image={resort.stay_image || resort.banner_image_url || resort.image_url || resort.image_1 || '/placeholder.jpg'}
              slug={resort.slug}
            />
          ))}
        </div>
        {totalPages > 1 && <Pagination />}
      </div>
    </section>
  );
};

const CorporateTeamOutingPlacesBangalore = () => {
  return (
    <PageWrapper className="min-h-screen bg-white">
      <Helmet>
        <title>Corporate Team Outing Places in Bangalore | Best Team Building Venues | Trebound</title>
        <meta name="description" content="Discover the best corporate team outing venues in Bangalore. From luxury resorts to adventure camps, find the perfect location for your next team building event. Book now!" />
        <meta name="keywords" content="corporate team outing bangalore, team building venues bangalore, corporate offsite bangalore, team outing places near bangalore" />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full object-cover"
            style={{
              backgroundImage: "url('/images/bangalore city.jpg')",
              backgroundPosition: 'center 70%',
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
              Where Teams Bond: Best Corporate Team<br />Outing Places In Bangalore
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8"
            >
              Explore Bangalore's Top Destinations for Unforgettable Corporate Team Building Adventures
            </motion.p>
            <a href="#contact" className="inline-block px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300">
              Get a proposal
            </a>
          </motion.div>
        </div>
      </section>

      {/* Browse Team Outing Places In And Around Bangalore */}
      <BestBangaloreStaysSection />

      {/* Explore Latest Games & Activities Section */}
      <section className="py-[64px] bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-24">
          <div className="text-center mb-16">
            <h2 className="text-[40px] font-bold text-[#313131] mb-4">Explore Latest Games & Activities</h2>
            <p className="text-lg text-[#636363] max-w-3xl mx-auto">
              Improve Teamwork and Boost Team Morale With Engaging & Impactful Team Building Activities
            </p>
          </div>
          <ActivitiesSection />
        </div>
      </section>

      {/* Plan your teambuilding session In Bangalore Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-bold text-[#313131] mb-6" style={{ fontSize: '32px' }}>
              Plan your teambuilding session In Bangalore
            </h2>
            <p className="text-gray-600 mb-8" style={{ fontSize: '20px' }}>
              Ready to energize your team and create lasting memories? Let Trebound help you plan a seamless, impactful, and fun team building session in Bangalore. Our expert facilitators, curated activities, and proven process ensure your team returns connected and motivated.
            </p>
            <a href="#contact" className="inline-block px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300">
              Get a Proposal
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Trebound Section */}
      <WhyChooseTreboundSection />

      {/* How It Works Section */}
      <HowItWorksProcessSection />

      {/* Team Section */}
      <TeamSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Section */}
      <div id="contact">
        <ContactSection />
      </div>

      <Footer />
    </PageWrapper>
  );
};

export default CorporateTeamOutingPlacesBangalore; 