import { Link } from 'react-router-dom';
import { useQuoteModal } from '../../contexts/QuoteModalContext';

const TeamOutingsHeader = () => {
  const { openModal } = useQuoteModal();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="max-w-[1448px] mx-auto px-4 md:px-8 lg:px-16 py-4 flex items-center justify-between">
        <Link to="/" className="block">
          <img
            src="https://cdn.prod.website-files.com/61ead40fcee1ea7e99aa2b1f/66f54b982ce090736e4e4d1c_Tewbound%20Hover.png"
            alt="Trebound"
            className="h-8 w-auto transition-opacity duration-300 hover:opacity-80"
          />
        </Link>
        <button
          onClick={openModal}
          className="px-6 py-2 bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white text-sm font-medium rounded-full hover:opacity-95 transition-all duration-300"
        >
          Get Quote
        </button>
      </div>
    </header>
  );
};

export default TeamOutingsHeader; 