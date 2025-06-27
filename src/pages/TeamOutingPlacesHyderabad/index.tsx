import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import PartnersSection from '../../components/PartnersSection';
import { supabase } from '../../lib/supabaseClient';
import { useActivities } from '../../lib/hooks/useSupabaseData';
import WhyChooseTreboundSection from '../../components/WhyChooseTreboundSection';
import HowItWorksProcessSection from '../../components/HowItWorksProcessSection';
import PageWrapper from '../../components/PageWrapper';

// Resort Card (reused)
const ResortCard = ({ name, tagline, image, rating = "4.6", slug }: { name: string; tagline: string; image: string; rating?: string; slug: string; }) => {
  const title = `Team Outing at ${name}${name.toLowerCase().includes('hyderabad') ? '' : ', Hyderabad'}`;
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

const BestHyderabadStaysSection = () => {
  const [resorts, setResorts] = useState<any[]>([]);
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
          .ilike('destination', '%hyderabad%');
        setTotalPages(Math.ceil((count || 0) / ITEMS_PER_PAGE));
        // Fetch paginated data
        const { data, error } = await supabase
          .from('stays')
          .select('*')
          .ilike('destination', '%hyderabad%')
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
  if (!resorts.length) return <div className="text-center text-gray-600 py-8">No stays found for Hyderabad.</div>;

  return (
    <section className="py-[64px] bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-24">
        <div className="text-center mb-16">
          <h2 className="text-[40px] font-bold text-[#313131] mb-4">
            Best <span className="text-[#FF4C39]">Team Outing Places</span> In And Around Hyderabad
          </h2>
          <p className="text-lg text-[#636363] max-w-3xl mx-auto">Discover the best resorts and stays for your next team outing in Hyderabad. All venues are handpicked for their unique experiences, amenities, and proximity to the city.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resorts.map((resort) => (
            <ResortCard
              key={resort.id}
              name={resort.name}
              tagline={resort.tagline || resort.stay_description || 'Experience luxury and comfort in the heart of Hyderabad'}
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

const ExploreGamesActivitiesSection = () => {
  const { activities, loading: activitiesLoading, error: activitiesError } = useActivities();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;
  
  // Use all fetched activities, not filtered
  const paginatedActivities = activities ? activities.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE) : [];
  const totalPages = activities ? Math.ceil(activities.length / ITEMS_PER_PAGE) : 1;
  
  return (
    <>
      {activitiesLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4C39]" />
        </div>
      ) : activitiesError ? (
        <div className="text-center text-red-600 py-8">{activitiesError}</div>
      ) : paginatedActivities.length === 0 ? (
        <div className="text-center text-gray-600 py-8">No activities found.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} disabled={currentPage === 1} className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">Previous</button>
              <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
              <button onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">Next</button>
            </div>
          )}
        </>
      )}
    </>
  );
};

const ActivityCard = ({ activity }: { activity: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg overflow-hidden group shadow-sm hover:shadow-md transition-shadow duration-300"
  >
    <div className="relative aspect-[386/304]">
      <img src={activity.main_image} alt={`${activity.name} Team Building Activity`} className="w-full h-full object-cover" />
      <div className="absolute top-3 left-3 bg-white rounded-full px-2 py-1 flex items-center shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF4C39" className="w-4 h-4 mr-1"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path></svg>
        <span className="text-sm font-medium">{activity.rating}</span>
      </div>
      {activity.activity_type && (
        <div className="absolute top-3 right-3 bg-white/90 rounded-full px-3 py-1">
          <span className="text-sm font-medium text-[#636363]">{activity.activity_type}</span>
        </div>
      )}
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold text-[#313131] mb-2">{activity.name}</h3>
      <p className="text-[#636363] mb-4 line-clamp-2">{activity.tagline}</p>
      <div className="flex items-center gap-4 text-sm text-[#636363] mb-4">
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {activity.duration}
        </div>
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          {activity.group_size}
        </div>
      </div>
      <a href={`/team-building-activity/${activity.slug}`} className="inline-block w-full text-center py-3 border border-[#b1b1b1] rounded-lg text-[#b1b1b1] font-semibold hover:bg-gradient-to-r hover:from-[#FF4C39] hover:to-[#FFB573] hover:text-white hover:border-transparent transition-all duration-300">View Details</a>
    </div>
  </motion.div>
);

export default function TeamOutingPlacesHyderabad() {
  return (
    <PageWrapper className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-full h-full object-cover" style={{ backgroundImage: "url('/images/Hyderabad.jpg')", backgroundPosition: 'center 70%', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} className="text-[64px] font-bold text-white mb-6 font-outfit leading-[74.6px] tracking-tight">Best Team Outing Places in Hyderabad</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">Discover the top team outing destinations, resorts, and adventure places in and around Hyderabad for your next corporate event.</motion.p>
          </motion.div>
        </div>
      </section>
      {/* Best Team Outing Places In And Around Hyderabad */}
      <BestHyderabadStaysSection />

      {/* Activities Intro Section */}
      <section className="bg-white pt-[30px] pb-0">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            We offer various <span className="text-[#FF4C39]">Engaging & Impactful</span><br />
            <span className="text-[#FF4C39]">Team Building</span> Activities in and around Hyderabad
          </h2>
          <p className="text-xl text-[#232323] max-w-2xl mx-auto">
            Engage in innovative team-building activities in Hyderabad's elite resorts. Elevate teamwork and camaraderie through curated experiences, designed specifically to foster collaboration and unity amidst luxurious surroundings.
          </p>
        </div>
      </section>
      {/* SEO Content Section Placeholder */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="prose prose-lg mx-auto custom-seo-prose">
            {/* Paste SEO content here */}
          </div>
        </div>
      </section>

      {/* Explore Latest Games & Activities Section - RESTORED ORIGINAL */}
      <section className="py-[64px] bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-24">
          <div className="text-center mb-16">
            <h2 className="text-[40px] font-bold text-[#313131] mb-4">Explore Latest Games & Activities</h2>
            <p className="text-lg text-[#636363] max-w-3xl mx-auto">Improve Teamwork and Boost Team Morale With Engaging & Impactful Team Building Activities</p>
          </div>
          <ExploreGamesActivitiesSection />
        </div>
      </section>

      {/* Plan Your Teambuilding Session CTA Section (Redesigned) */}
      <section className="relative py-24 bg-[#07375c] text-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 z-0 animate-pulse bg-gradient-to-br from-[#07375c] via-[#0b4473] to-[#FFB573]/10 opacity-80"></div>
        {/* Decorative icon */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-6">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="32" fill="white" fillOpacity="0.18" />
              <path d="M32 18L36.4721 27.5279L46 32L36.4721 36.4721L32 46L27.5279 36.4721L18 32L27.5279 27.5279L32 18Z" fill="white" />
            </svg>
          </div>
          <div className="text-white text-lg mb-2 font-medium tracking-wide uppercase opacity-80">Ready to Energize Your Team?</div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            <span className="text-[#FF4C39]">Plan your teambuilding</span><br />
            <span className="text-white">session In Hyderabad</span>
          </h2>
          <p className="text-xl md:text-2xl text-white font-normal mb-10 max-w-2xl mx-auto opacity-90">
            Experience a fascinating, thrilling, and <span className="text-[#FF4C39] font-semibold">truly FUN</span> team building journey that your team will never forget!
          </p>
          <a href="#cta-form" className="inline-block bg-[#FF4C39] hover:bg-[#FF9B53] text-white font-bold text-lg px-10 py-4 rounded-xl shadow-lg transition-all duration-300 focus:outline-none animate-pulse">
            Get Proposal
          </a>
        </div>
      </section>

      {/* Why Us Section */}
      <WhyChooseTreboundSection />

      {/* How It Works Section */}
      <HowItWorksProcessSection />

      {/* Other Sections */}
      <TestimonialsSection />
      <PartnersSection />
      <ContactSection />
      <Footer />
    </PageWrapper>
  );
} 