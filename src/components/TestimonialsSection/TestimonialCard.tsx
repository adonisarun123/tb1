import { motion } from 'framer-motion';

interface TestimonialCardProps {
  rating: number;
  review: string;
  author: {
    name: string;
    position: string;
    company: string;
    image: string;
  };
  companyLogo: string;
  isActive?: boolean;
}

const TestimonialCard = ({ rating, review, author, companyLogo, isActive = false }: TestimonialCardProps) => {
  return (
    <motion.div
      className={`w-[840px] min-h-[480px] rounded-2xl relative ${
        isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-50'
      } transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`}
    >
      <div className="absolute inset-0 bg-gradient-primary rounded-2xl p-[1px]">
        <div className="w-full h-full bg-white rounded-2xl p-12 shadow-card">
          {/* Rating */}
          <div className="flex space-x-2">
            {Array.from({ length: rating }).map((_, i) => (
              <svg
                key={i}
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                  className="text-primary w-6 h-6"
              >
                <path
                  d="M16 1l4.326 8.804L30 11.392l-7 6.804 1.652 9.628L16 23.672l-8.652 4.152L9 18.196 2 11.392l9.674-1.588L16 1z"
                  fill="currentColor"
                />
              </svg>
            ))}
          </div>

          {/* Review Text */}
          <p className="mt-10 text-2xl font-medium font-['DM Sans'] text-neutral-900 leading-relaxed">
            {review}
          </p>

          {/* Author Info */}
          <div className="mt-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={author.image}
                alt={author.name}
                className="w-16 h-16 rounded-full object-cover shadow-sm"
              />
              <div>
                <h4 className="text-2xl font-bold font-outfit text-neutral-900">
                  {author.name}
                </h4>
                <p className="text-base font-medium font-['DM Sans'] text-neutral-600">
                  {author.position} at {author.company}
                </p>
              </div>
            </div>

            {/* Company Logo */}
            <img
              src={companyLogo}
              alt={author.company}
              className="h-16 opacity-70"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
