import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import ActivitiesSection from '../../components/ActivitiesSection';
import PageWrapper from '../../components/PageWrapper';
import { supabase } from '../../lib/supabaseClient';
import HowItWorksProcessSection from '../../components/HowItWorksProcessSection';

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

// Resort Card (reused)
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

const BestOvernightStaysSection = () => {
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
            Best <span className="text-[#FF4C39]">Overnight Team Outing Places</span> Near Bangalore
          </h2>
          <p className="text-lg text-[#636363] max-w-3xl mx-auto">Discover the best resorts and stays for your next overnight team outing near Bangalore. All venues are handpicked for their unique experiences, amenities, and proximity to the city.</p>
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

export default function OvernightTeamOutingNearBangalore() {
  return (
    <PageWrapper className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-full h-full object-cover" style={{ backgroundImage: "url('/images/bangalore city.jpg')", backgroundPosition: 'center 70%', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} className="text-[64px] font-bold text-white mb-6 font-outfit leading-[74.6px] tracking-tight">Overnight Corporate Team Outing Near Bangalore</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">Engage Your Employees With a Fun Team Night Outing Near Bangalore</motion.p>
            <a href="#contact" className="inline-block px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300">Get a proposal</a>
          </motion.div>
        </div>
      </section>
      {/* Best Overnight Team Outing Places Near Bangalore */}
      <BestOvernightStaysSection />
      {/* Why Choose An Overnight Outing For Your Team? */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-12 text-center">Why Choose An Overnight Outing For Your Team?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Bonding */}
            <div className="bg-white rounded-xl shadow-md p-8 flex items-start gap-4">
              <div className="flex-shrink-0">
                {/* Icon: People/Group for Bonding */}
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="20" cy="20" r="20" fill="#FF4C39" fillOpacity="0.12"/><path d="M7 20v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2" stroke="#FF4C39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="10" r="4" stroke="#FF4C39" strokeWidth="2"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-[#FF4C39]">Dedicated time for bonding</h3>
                <p className="text-gray-700">An overnight trip allows for quality time outside of work for conversations, team activities, and interactions in an informal environment. This strengthens relationships within the team.</p>
              </div>
            </div>
            {/* Card 2: Stress Relief */}
            <div className="bg-white rounded-xl shadow-md p-8 flex items-start gap-4">
              <div className="flex-shrink-0">
                {/* Icon: Relax/Leaf for Stress Relief */}
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="20" cy="20" r="20" fill="#FF4C39" fillOpacity="0.12"/><path d="M12 2C7 7 2 12 12 22c10-10 5-15 0-20z" stroke="#FF4C39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 8v4l3 3" stroke="#FF4C39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-[#FF4C39]">Escape from daily stresses</h3>
                <p className="text-gray-700">Change of environment and pace from the daily office commute and routine is refreshing for the mind and body. This boosts morale and energy levels.</p>
              </div>
            </div>
            {/* Card 3: Learning */}
            <div className="bg-white rounded-xl shadow-md p-8 flex items-start gap-4">
              <div className="flex-shrink-0">
                {/* Icon: Lightbulb for Learning */}
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="20" cy="20" r="20" fill="#FF4C39" fillOpacity="0.12"/><path d="M12 2a7 7 0 0 0-7 7c0 2.386 1.34 4.435 3.3 5.5A2.5 2.5 0 0 0 10 17h4a2.5 2.5 0 0 0 1.7-2.5C17.66 13.435 19 11.386 19 9a7 7 0 0 0-7-7z" stroke="#FF4C39" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 21h6" stroke="#FF4C39" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-[#FF4C39]">Learning opportunities</h3>
                <p className="text-gray-700">Fun team-building activities, competitions, and challenges at the outing lead to new experiences. Games requiring collaboration and problem solving also build work-related skills.</p>
              </div>
            </div>
            {/* Card 4: Engagement */}
            <div className="bg-white rounded-xl shadow-md p-8 flex items-start gap-4">
              <div className="flex-shrink-0">
                {/* Icon: Chat Bubbles for Engagement */}
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="20" cy="20" r="20" fill="#FF4C39" fillOpacity="0.12"/><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#FF4C39" strokeWidth="2" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-[#FF4C39]">Deeper engagement</h3>
                <p className="text-gray-700">Away from distractions at work and home, the team interacts more freely. Barriers are broken, and insights are gained about each other's personalities.</p>
              </div>
            </div>
            {/* Card 5: Productivity */}
            <div className="bg-white rounded-xl shadow-md p-8 flex items-start gap-4 md:col-span-2">
              <div className="flex-shrink-0">
                {/* Icon: Rocket for Productivity */}
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="20" cy="20" r="20" fill="#FF4C39" fillOpacity="0.12"/><path d="M4 20l5-5c.5-.5 1.5-1 2-1.5l7-7c.5-.5 1.5-1 2-1.5l-7 7c-.5.5-1 1.5-1.5 2l-5 5z" stroke="#FF4C39" strokeWidth="2" strokeLinejoin="round"/><path d="M15 9l2 2" stroke="#FF4C39" strokeWidth="2" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-[#FF4C39]">Enhanced productivity</h3>
                <p className="text-gray-700">Taking a break from a demanding workload enables the team to recharge. They return energized and focused, leading to better performance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Explore Latest Games & Activities Section */}
      <section className="py-[64px] bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-24">
          <div className="text-center mb-16">
            <h2 className="text-[40px] font-bold text-[#313131] mb-4">Explore Latest Games & Activities</h2>
            <p className="text-lg text-[#636363] max-w-3xl mx-auto">We offer various Engaging & Impactful Team Building Activities in and around Bangalore</p>
          </div>
          <ActivitiesSection />
        </div>
      </section>
      {/* Plan your teambuilding session In Bangalore Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-bold text-[#313131] mb-6" style={{ fontSize: '32px' }}>Plan your teambuilding session In Bangalore</h2>
            <p className="text-gray-600 mb-8" style={{ fontSize: '20px' }}>Ready to energize your team and create lasting memories? Let Trebound help you plan a seamless, impactful, and fun team building session in Bangalore. Our expert facilitators, curated activities, and proven process ensure your team returns connected and motivated.</p>
            <a href="#contact" className="inline-block px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300">Get a Proposal</a>
          </div>
        </div>
      </section>
      {/* Why Us Section */}
      <section className="py-20 bg-[#002B4F] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent">Why Choose Trebound?</h2>
            <p className="text-lg text-gray-300 mb-8">Our team is playful, engaging, highly energetic and believes in teamwork. With 30+ years of combined experience, we help companies improve employee engagement and deliver exceptional support at every stage of your team building plan.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2 text-white">30+ Years of Experience</h3>
                <p className="text-gray-200">Our facilitators bring decades of expertise to ensure your offsite is a success.</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2 text-white">Engagement & Creativity</h3>
                <p className="text-gray-200">We break down barriers, inspire, and promote creativity through our activities.</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2 text-white">Great Support</h3>
                <p className="text-gray-200">Expect professional and personalized support from our team at all stages.</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2 text-white">Fun & Intense Adventures</h3>
                <p className="text-gray-200">Increase participation, build trust, and have fun with unique team building activities.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <HowItWorksProcessSection />
      {/* Testimonials Section */}
      <TestimonialsSection />
      {/* Contact Section */}
      <div id="contact">
        <ContactSection />
      </div>
      <Footer />
    </PageWrapper>
  );
} 