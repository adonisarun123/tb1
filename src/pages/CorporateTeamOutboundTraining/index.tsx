import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiUsers, FiTarget, FiBriefcase, FiArrowDown } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import NewsletterSection from '../../components/NewsletterSection';
import ContactSection from '../../components/ContactSection';
import TeamSection from '../../components/TeamSection';
import TestimonialsSection from '../../components/TestimonialsSection';
import PartnersSection from '../../components/PartnersSection';
import PageWrapper from '../../components/PageWrapper';
import { useActivities } from '../../lib/hooks/useSupabaseData';
import type { Activity } from '../../lib/supabaseClient';

interface ActivityWithRating extends Omit<Activity, 'rating'> {
  rating: string;
}

const ITEMS_PER_PAGE = 9;

const CorporateTeamOutboundTraining: React.FC = () => {
  const { activities, loading: activitiesLoading, error: activitiesError } = useActivities();

  // Filter activities for outbound training
  const outboundActivities: ActivityWithRating[] = React.useMemo(() => {
    return (activities || [])
      .filter((activity): activity is Activity => 
        activity !== null &&
        typeof activity === 'object' &&
        'activity_type' in activity &&
        activity.activity_type === 'Outbound'
      )
      .map(activity => ({
        ...activity,
        rating: '4.9'
      }));
  }, [activities]);

  return (
    <PageWrapper className="min-h-screen bg-white">
      <Helmet>
        <title>Corporate Team Outbound Training | Trebound</title>
        <meta 
          name="description" 
          content="Transform your team with engaging corporate team outbound training. Keep your employees happy, engaged and energized with our diverse range of outbound solutions." 
        />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full object-cover"
            style={{
              backgroundImage: "url('/images/outbound training.jpg')",
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Corporate Team Outbound Training
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-200 mb-8"
          >
            Build stronger teams through outdoor challenges and adventures
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              to="/contact"
              className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white px-8 py-4 rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300"
            >
              Get Started
            </Link>
            {/* <Link  // Temporarily comment out React Router Link
              to="#activities"
              className="bg-white text-[#002B4F] px-8 py-4 rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300"
            >
              View Activities
            </Link> */}
            <a // Use standard HTML anchor tag for testing
              href="#activities"
              className="bg-white text-[#002B4F] px-8 py-4 rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300"
            >
              View Activities
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <FiArrowDown className="text-white text-4xl animate-bounce" />
        </motion.div>
      </section>

      {/* === ADDED MISSING CONTENT SECTIONS === */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <blockquote className="border-l-4 border-[#FF4C39] pl-6 italic text-gray-700 my-8 text-lg">
              "Corporate culture can become a secret weapon that makes all the extraordinary things to happen" - Jon Katzenbach
            </blockquote>
            <p className="text-[18px] leading-relaxed text-gray-600 mb-6">
              The <strong>'Corporate Team Outbound Training'</strong> plays an integral part in advocating the organizational culture among employees. In fact, the team outings provide the best opportunity to identify and bring out the educators, facilitators, quick learners and leaders from your teams. Everyone boasts about building high performing teams in organizations. How can we define a team as a strong one? The high performing team is a group of professionals work under a shared vision, collaborate effectively, utilize the resources optimally, communicate excellently to achieve the goal set. When the team becomes stronger, the responsibilities are handled with clear understanding and in a matured way. Such maturity aids in mitigating the risks associated with the business and helps to accomplish the objectives and so the organizational vision.
            </p>
            <p className="text-[18px] leading-relaxed text-gray-600 mb-6">
              Let us look at what happens when the communication is strategized well among teams during outbound training. The facilitator understands the goals, about the teams, strengths & weaknesses of the individuals in a team and the processes involved in various communication modes. Moreover, the team also understands the risks associated with the whole set-up. There are brainstorming sessions normally help in making and executing such plans in the corporate environment. However, compared to in-room sessions, it is proved that the fun and playful way of training sessions have shown greater results all through these years. Trebound team with extensive experience managing teams, organising <Link to="/corporate-team-outing" className="text-[#FF4C39] hover:text-[#FF6B5C]">team outings</Link>, greatly supports corporates to build strong teams through their well thought out <Link to="/corporate-team-building-activities" className="text-[#FF4C39] hover:text-[#FF6B5C]">group activities</Link> and <Link to="/team-building-games" className="text-[#FF4C39] hover:text-[#FF6B5C]">team building games</Link>. What happens when the teams undergo fun based experiential training sessions. Firstly, the teams feel relaxed and comfortable which ultimately elevates their listening and thinking capability. The observations stay for an extended period in mind so that the teams apply as and when the right situation arises.
            </p>
            <h3 className="text-[#FF4C39] mb-8 font-bold text-2xl">The impact of <strong>Experiential Learning</strong> in team work environment</h3>
            <p className="text-[18px] leading-relaxed text-gray-600 mb-6">
              Whatever be the experience level of the attendees or the size of the groups, the experiential learning method creates wonders in corporate training sessions. As quoted by David Kolb, the Guru of Experiential Learning Method, "Learning is the process whereby knowledge is created through the transformation of experience", Trebound team focuses on building skills in the trainees by transforming the experience into effective learning. The outbound training games are designed based on various skill requirements and after serious brain-storming sessions.
            </p>
            <h3 className="text-[#FF4C39] mb-8 font-bold text-2xl">Through the Experiential Learning model, Trebound team helps the organizations to benefit as below:</h3>
            <ol className="list-decimal pl-5 space-y-2 mb-6">
              <li className="text-[18px] leading-relaxed text-gray-600">Advocates the new perspective among teams through a carefully built activity that becomes the reinterpretation of earlier experience.</li>
              <li className="text-[18px] leading-relaxed text-gray-600">Aids the teams to reflect what they observe by identifying the gaps between the perceptions and experience.</li>
              <li className="text-[18px] leading-relaxed text-gray-600">Encourages the teams to come up with fresher ideas to implement the new learning's and experiences in the forecasted scenarios.</li>
              <li className="text-[18px] leading-relaxed text-gray-600">Reassures the teams to implement the fresh ideas in the real-world scenario through active experimentation.</li>
            </ol>
            <p className="text-[18px] leading-relaxed text-gray-600 mb-6">
              The cycle continues and so the learning through new experience leading to developing fresher ideas.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-[#FF4C39] mb-8 font-bold text-2xl">The Training Techniques of Trebound popularly used in Corporate Team Outbound Training</h3>
            <p className="text-[18px] leading-relaxed text-gray-600 mb-6">
              Even though the corporate teams aim at having fun during team outbound sessions, the main goal is to achieve the vision established. Trebound team, by collaborating with the organizations, understand the common goal set and design the activities after a careful brainstorming to heighten the effectiveness. Apart from the power point based training sessions, the team also uses <strong>Role Plays</strong> to make the teams understand various concepts. The role plays provide the groups a co-operative experience. Every role that the team plays comes with different set of challenges where practicing the learning's in form of various activities support them to mitigate those challenges.
            </p>
            <blockquote className="border-l-4 border-[#FF4C39] pl-6 italic text-gray-700 my-8 text-lg">
              "Practice is the hardest part of learning, and the training is the essence of transformation"
            </blockquote>
            <p className="text-[18px] leading-relaxed text-gray-600 mb-6">
              The role plays are used to provide the first level of understanding where the trainees get an opportunity to understand the concept by experiencing the same through different scenarios. Moreover, the role plays bring in a lot of entertainment factors, and, at the same time, encourages the team to learn how to observe the views of the opponents. The self-awareness and 'being sensitive to others perspective' are two key skills which can be indulged efficiently through role-plays.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-[#FF4C39] mb-8 font-bold text-2xl"><strong>Case Studies</strong> as the imperative tools to inculcate various skills while teams undergo outbound training</h3>
            <p className="text-[18px] leading-relaxed text-gray-600 mb-6">
              The case studies help in exploring various behaviours, thought processes and experiences in-depth so that the teams learn to implement the concepts in the real-time work environment.
            </p>
            <blockquote className="border-l-4 border-[#FF4C39] pl-6 italic text-gray-700 my-8 text-lg">
              "Success is neither magical nor mysterious. Success is the natural consequence of consistently applying the fundamentals," - Jim Rohn
            </blockquote>
            <p className="text-[18px] leading-relaxed text-gray-600 mb-6">
              The case studies, especially the studies of earlier mistakes and issues, give a way to identify the risks and build an ability to solve such risks using pragmatic tools and techniques.
            </p>
            <blockquote className="border-l-4 border-[#FF4C39] pl-6 italic text-gray-700 my-8 text-lg">
              "Being Proactive means being Reactive ahead of time"
            </blockquote>
            <p className="text-[18px] leading-relaxed text-gray-600 mb-6">
              The case studies are the best sources to learn the fundamentals and rapidly implement the learning's in the real time Industry environment. The facts & figures, trends and the process flows one could absorb through case studies make the learning more authentic and so the professionals build an ability to be pro-active than re-active. Such proactive approach helps the individuals to acknowledge the risks and mistakes immediately and so the corrective actions are taken appropriately. Those individuals become accountable for the actions, reactions, and, most importantly, do not wait for an opportunity to knock at the door to get into essential action.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-[#FF4C39] mb-8 font-bold text-2xl"><strong>Group activities</strong> as a part of outbound Training for corporates</h3>
            <blockquote className="border-l-4 border-[#FF4C39] pl-6 italic text-gray-700 my-8 text-lg">
              "The Future belongs to the CURIOUS. The ones who are not afraid to TRY it, EXPLORE it, POKE at it, QUESTION it and TURN things inside out"
            </blockquote>
            <p className="text-[18px] leading-relaxed text-gray-600 mb-6">
              The group activities play a major role in relieving the stress the teams go through day in and day out. While participating in any group activity, the teams benefit by releasing all the stress & anxiety the job might bring in and feel 'inclusive'. The feeling of 'inclusion' aids in triggering the 'curiosity' in people. Such curiosity takes them out of their comfort zone, the teams get to try, explore and question right to get the appropriate answers. The teams build trust among themselves. '<Link to="/trust-walk-team-building-activity" className="text-[#FF4C39] hover:text-[#FF6B5C]">Trust walk</Link>' is one activity being conducted by Trebound team, specifically to install this 'Trust' factor among teams.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-[#FF4C39] mb-8 font-bold text-2xl">Building <strong>leadership skills</strong> becomes easy when the activities are designed with fun elements</h3>
            <blockquote className="border-l-4 border-[#FF4C39] pl-6 italic text-gray-700 my-8 text-lg">
              "Great leaders are also great followers"
            </blockquote>
            <p className="text-[18px] leading-relaxed text-gray-600 mb-6">
              By being the great followers, the leaders demonstrate an ability to identify and differentiate the 'possible' from 'impossible'. The group activities conducted by Trebound during corporate team outbound training lead a way to build a strong leadership pool. Such leaders have proven to have charisma and establish capability to build participative leadership pool in their organization.
            </p>
            <p className="text-[18px] leading-relaxed text-gray-600 mb-6">
              Not only the leaders but also the teams influence the key decisions being implemented in the organizations. The effective follow-ship ability creates a solid top level CXOs, and, ultimately helps in building stronger teams. As we mentioned in the initial section, the strong teams make a greater difference in the way the organizations work, survive, sustain and succeed in the globally competitive scenario. It is imperative to build the team with the essential traits for the roles being played. Trebound teams use the combination of various models in their corporate outbound sessions so that the training is highly effective and the clients reap huge ROI once they are back in action.
            </p>
             <p className="text-[18px] leading-relaxed text-gray-600 mb-6">
               Trebound team with its 18+ years combined expertise in building skill enhancement activities ensures having lot fun element in their training sessions. Instead of sitting and thinking through the problems, moving around and participating in various games make the experiential learning more effective and memorable.
            </p>
            <blockquote className="border-l-4 border-[#FF4C39] pl-6 italic text-gray-700 my-8 text-lg">
              "To build a strong team, one must see the strength of the other team members as a compliment and build a collaborative model to succeed"
            </blockquote>
            <p className="text-[18px] leading-relaxed text-gray-600 mb-6">
              The leadership training programs from Trebound support in building interpersonal capabilities, integrity, effective delegation, better communication ability, decision-making proficiency and, one of the most important and critical skills of all the time, the flexibility. As preferred by the client organizations, Trebound organises the training sessions either in an indoor area or at an outdoor venue. Based on the venue chosen and the goals set for the outbound training, the team designs the activities which can indulge all the necessary skills. Right from developing the vision, venue booking, designing and delivering the activities, games and training sessions, Trebound can be the trusted business partner who will work together to bring huge success to all the stakeholders involved.
            </p>
          </div>
        </div>
      </section>
      {/* === END ADDED CONTENT === */}

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-6">
              Why Choose Our Outbound Training?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our outbound training programs are designed to create lasting impact and meaningful connections within your organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <FiUsers className="text-4xl text-[#FF4C39] mb-6" />
              <h3 className="text-xl font-bold text-[#002B4F] mb-4">Enhanced Team Bonding</h3>
              <p className="text-gray-600">
                Build stronger relationships and trust among team members through shared outdoor experiences.
              </p>
            </div>

            <div className="p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <FiTarget className="text-4xl text-[#FF4C39] mb-6" />
              <h3 className="text-xl font-bold text-[#002B4F] mb-4">Leadership Development</h3>
              <p className="text-gray-600">
                Foster leadership skills through challenging outdoor activities and team exercises.
              </p>
            </div>

            <div className="p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <FiBriefcase className="text-4xl text-[#FF4C39] mb-6" />
              <h3 className="text-xl font-bold text-[#002B4F] mb-4">Problem Solving</h3>
              <p className="text-gray-600">
                Enhance problem-solving abilities through real-world outdoor challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#002B4F] mb-6">
              Our Outbound Training Activities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our range of outdoor activities designed to challenge and inspire your team.
            </p>
          </div>

          {/* Content: No Activities Found */}
          {!activitiesLoading && !activitiesError && outboundActivities.length === 0 && (
            <div className="text-center text-gray-600 py-8">No activities found.</div>
          )}

          {/* Content: Activities Grid */}
          {!activitiesLoading && !activitiesError && outboundActivities.length > 0 && (
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {outboundActivities.slice(0, 9).map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="relative aspect-[16/9]">
                    <img 
                      src={activity.main_image} 
                      alt={activity.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white rounded-full px-2 py-1 flex items-center shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF4C39" className="w-4 h-4 mr-1">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-sm font-medium">{activity.rating}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#313131] mb-2">{activity.name}</h3>
                    <p className="text-[#636363] mb-4 line-clamp-2">{activity.tagline}</p>
                    <div className="flex items-center gap-4 text-sm text-[#636363] mb-4">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        {activity.duration}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        {activity.group_size}
                      </div>
                    </div>
                    <Link 
                      to={`/team-building-activity/${activity.slug}`}
                      className="inline-block w-full text-center py-3 border border-[#b1b1b1] rounded-lg text-[#b1b1b1] font-semibold hover:bg-gradient-to-r hover:from-[#FF4C39] hover:to-[#FFB573] hover:text-white hover:border-transparent transition-all duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
              
              {/* Conditional Button - Place it after the grid div, inside the fragment */}
              {outboundActivities.length > ITEMS_PER_PAGE && (
                <div className="flex justify-center mt-12">
                  <Link 
                    to="/team-building-activity"
                    className="inline-block px-8 py-4 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300"
                  >
                    View More Activities
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Partners Section */}
      <PartnersSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Newsletter Section */}
      <NewsletterSection />

      <Footer />
    </PageWrapper>
  );
};

export default CorporateTeamOutboundTraining; 