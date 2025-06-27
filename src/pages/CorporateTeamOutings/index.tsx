import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactSection from '../../components/ContactSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import TeamSection from '../../components/TeamSection';
import { TeamBuildingActivitiesSection } from '../../components/TeamBuildingSection';
import PartnersSection from '../../components/PartnersSection';

const styles = {
  textShadow: {
    textShadow: '0 1px 3px rgba(0, 0, 0, 0.7)'
  }
};

const CorporateTeamOutingsPage = () => {
  const [heroRef] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Corporate Team Outings | Trebound</title>
        <meta 
          name="description" 
          content="Transform your team dynamics with Trebound's corporate team outings. Build stronger bonds, enhance collaboration, and create lasting memories through expertly crafted team building activities." 
        />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full object-cover"
            style={{
              backgroundImage: "url('/images/Corporate team outings.jpg')",
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
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base md:text-lg font-bold mb-4 px-3 py-1 inline-block rounded bg-black/30 tracking-wider shadow-lg text-white"
              style={{
                ...styles.textShadow,
                borderLeft: '3px solid #FF5A3C'
              }}
            >
              Transform Your Team's Dynamic
            </motion.h2>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-[64px] font-bold text-white mb-6 font-outfit leading-[74.6px] tracking-tight"
            >
              What Should a Corporate<br />
              Team Outing Be?
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Why Corporate Team Outing Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-8"
            >
              Why Corporate team outing?
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg max-w-none text-gray-600 [&>p]:text-[1.125rem] [&>p]:leading-relaxed [&>p]:mb-6"
            >
              <p>
                A successful corporate team outing helps to solidify bonds between colleagues, and gives them opportunities to communicate and collaborate outside of the workplace. While <Link to="/indoor-team-building-activities" className="text-[#FF5A3C] hover:text-[#FF4C39]">team building activities</Link> can be executed in the office, a team outing eliminates certain communicative boundaries that exist in that space.
              </p>
              <p>
                Trebound can bring the best solutions and conduct lot of fun team building activities for your team outing. Trebound consciously places the focus on overall morale, positivity, and personal growth as a team.
              </p>
              <p>
                Such excursions do not have to be large investments or take up long periods of time. They can be as simple as a <Link to="/one-day-outing-in-bangalore" className="text-[#FF5A3C] hover:text-[#FF4C39]">day trip</Link> or as elaborate as a visit & stay at a resort, but they must be effective. The right team outing builds, for your company, what is known as intellectual capital. Intellectual capital is the idea that creates an upsurge in the overall competency.
              </p>
              <p>
                Are you struggling to get more ideas for work team outings to make them successful? Trebound has the perfect solution which can be customized based on all your requirements.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Building Activities Section */}
      <TeamBuildingActivitiesSection />

      {/* Team Section */}
      <TeamSection />

      {/* Benefits Section */}
      <section className="py-24 bg-[#002B4F]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-white">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] bg-clip-text text-transparent"
            >
              Benefits of Corporate team outing
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg max-w-none prose-invert [&>p]:text-[1.125rem] [&>p]:leading-relaxed [&>p]:mb-6"
            >
              <p>
                A team offsite can increase commitment and can help a person immerse themselves into their work in a community that they can feel truly appreciates and understands the value of what they give.
              </p>
              <p>
                An effective team outing program promotes emotional as well as intellectual intelligence between colleagues. In short, it helps them understand one another better. This level of understanding fuels competency in the workplace and, in general, makes a team much easier to work with.
              </p>
              <p>
                Research from the Harvard Business Review highlighted three essential conditions for a group's effectiveness:
              </p>
              <ul className="space-y-3 text-[1.125rem]">
                <li>Trust among members</li>
                <li>A sense of group identity</li>
                <li>A sense of group efficacy</li>
              </ul>
              <p>
                That identity, depending on the excursion, may or may not end up being partially formed by the chosen outing. It is, without question, that an effective team should build their sense of identity. But that identity, once built, must be renewed over time for it to truly be an asset.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-8">
              Location for Corporate team outing
            </h3>
            <div className="prose prose-lg max-w-none text-gray-600 [&>p]:text-[1.125rem] [&>p]:leading-relaxed [&>p]:mb-6">
              <p>
                Corporate team outings are generally known for taking place in large resorts and spas for rest & relaxation, and maybe a seminar or two, but that's only one of many options that are available to choose. The second most popular are camping trips or hikes, anything that involves nature.
              </p>
              <p>
                <Link to="/corporate-team-outing-places-in-bangalore" className="text-[#FF5A3C] hover:text-[#FF4C39]">Bangalore</Link>, specifically, has several destinations in and around the city that are ideal for corporate team outings. There are resorts, camping grounds, and even more urban sightseeing opportunities that any employer can turn into a trip.
              </p>
              <p>
                The <Link to="/corporate-team-outing-resorts-in-bangalore" className="text-[#FF5A3C] hover:text-[#FF4C39]">Golden Palms Resort</Link> is advertised as one of the best constructed resorts in Bangalore and surrounding cities. Also, there is Clark's Exotica which has appropriate amenities to fit corporate conferences and business meeting requirements.
              </p>
              <p>
                There are so many opportunities in Bangalore to enrich the mind and to rejuvenate. Also, several of the venues in <Link to="/corporate-team-outing-places-in-bangalore" className="text-[#FF5A3C] hover:text-[#FF4C39]">Bangalore</Link> have well-maintained facilities made especially for team building activities.
              </p>
              <p>
                The Signature Resort advertises spacious lawns, conference rooms, a luxurious pool and much more. If a camping trip is the most ideal for your team, many of the campgrounds have walking trails. The Bheemeshwari Camp is lauded for its fishing and for the Bheemeshwari jungle huts and lodges designed for immersion into natural surroundings.
              </p>
              <p>
                Considering the wide variety of opportunities available, it is almost guaranteed that Bangalore will have the perfect destination for any team that will appropriately engage them and promote their emotional intelligence and understanding of one another.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Importance Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-8">
              Importance of Team building activities in a Corporate team outing
            </h3>
            <div className="prose prose-lg max-w-none text-gray-600 [&>p]:text-[1.125rem] [&>p]:leading-relaxed [&>p]:mb-6">
              <p>
                This concept illustrates the importance of team building activities in a team outing. The right activities can be the difference between breaking and creating tension within a team.
              </p>
              <p>
                One question to consider in that regard would be: what is your team's common purpose? A common purpose is, simply, the unifying factor that binds a team to a task at hand.
              </p>
              <p>
                When planning a team outing, the type of team building activity that is chosen is just as important as choosing a <Link to="/corporate-team-outing-places-in-bangalore" className="text-[#FF5A3C] hover:text-[#FF4C39]">right team outing venue</Link>. It's important that team members are able to interact during their outing with these events, but they must be appropriately planned to suit your team and your team's common goals.
              </p>
              <p className="font-semibold">
                So, the questions are:
              </p>
              <ul className="space-y-3 text-[1.125rem]">
                <li>What is your team's common purpose?</li>
                <li>What are your priorities for your corporate team outing, and are they the same priorities as your colleagues'?</li>
                <li>What will engage and attract your team's members while not creating tension and stress?</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final Note Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none text-gray-600 [&>p]:text-[1.125rem] [&>p]:leading-relaxed [&>p]:mb-6">
              <p>
                While a team can perform the motions of cooperation and efficiently achieve tasks, that efficiency level goes up with the confidence and sense of identity that can be gleaned from the right corporate team outing comprised of fitting team building activities.
              </p>
              <p>
                A corporate team offsite can be as elaborate as a three-day excursion to a resort and spa or as simple as a day trip, as long as it is fulfilling and substantive, your team will be more effective and productive for it.
              </p>
              <p className="text-[#FF5A3C] font-semibold">
                Trebound team with 18+ rich experience and a treasure of team outings ideas understands what is expected to achieve success. The happy clients who have reaped huge benefits during team outings have endorsed this capability as well.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Partners Section */}
      <PartnersSection />

      {/* Contact Section */}
      <ContactSection />

      <Footer />
    </div>
  );
};

export default CorporateTeamOutingsPage; 