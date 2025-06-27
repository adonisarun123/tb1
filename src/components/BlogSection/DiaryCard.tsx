import { motion } from 'framer-motion';

interface DiaryCardProps {
  image: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    image: string;
  };
  date: string;
  readTime: string;
}

const DiaryCard = ({ image, title, excerpt, author, date, readTime }: DiaryCardProps) => {
  return (
    <motion.div
      className="w-[400px] rounded-2xl bg-white shadow-card overflow-hidden group cursor-pointer"
      whileHover="hover"
    >
      {/* Image Container */}
      <div className="relative w-full h-[260px] overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          variants={{
            hover: {
              scale: 1.05,
              transition: { duration: 0.4 }
            }
          }}
        />
        {/* Category Tag */}
        <div className="absolute top-6 left-6">
          <div className="bg-white/15 backdrop-blur-md rounded-full px-5 py-1.5">
            <span className="text-base font-medium font-outfit text-white">
              Team Building
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <motion.div
          className="space-y-4"
          variants={{
            hover: {
              y: -5,
              transition: { duration: 0.3 }
            }
          }}
        >
          <h3 className="text-2xl font-bold font-outfit text-neutral-900 line-clamp-2">
            {title}
          </h3>
          <p className="text-base font-medium font-['DM Sans'] text-neutral-600 line-clamp-2">
            {excerpt}
          </p>

          {/* Author Info & Meta */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-3">
              <img
                src={author.image}
                alt={author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-base font-medium font-outfit text-neutral-900">
                  {author.name}
                </p>
                <p className="text-sm font-medium font-['DM Sans'] text-neutral-500">
                  {date}
                </p>
              </div>
            </div>
            <div className="bg-neutral-100 rounded-full px-4 py-2">
              <span className="text-base font-medium font-['DM Sans'] text-neutral-600">
                {readTime}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Read More Link */}
        <motion.div
          className="mt-8 flex items-center space-x-2 text-primary"
          variants={{
            hover: {
              x: 5,
              transition: { duration: 0.3 }
            }
          }}
        >
          <span className="text-lg font-semibold font-['DM Sans']">
            Read More
          </span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DiaryCard;
