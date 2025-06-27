import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Jemcy",
    role: "Innovator at Heart",
    image: "/images/Team hover 1.png"
  },
  {
    id: 2,
    name: "Vaishnavi",
    role: "Nature Enthusiast",
    image: "/images/team hover 2.png"
  },
  {
    id: 3,
    name: "Raj Lakshmi",
    role: "Cultural Explorer",
    image: "/images/team hover 3.png"
  }
];

const TeamSection: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-[#002B4F] mb-4"
          >
            Our Teambuilding Subject Matter Experts
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {TEAM_MEMBERS.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 * member.id }}
              className="relative rounded-3xl overflow-hidden shadow-lg group"
            >
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white text-3xl font-bold mb-2">{member.name}</h3>
                <p className="text-white text-lg transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection; 