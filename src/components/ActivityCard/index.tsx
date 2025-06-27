import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from '../../lib/supabaseClient';

interface ActivityWithRating extends Activity {
  rating: string;
}

interface ActivityCardProps {
  activity: ActivityWithRating;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => (
  <div className="p-5 bg-[#f6f6f6] rounded-[16px]">
    <div className="relative aspect-[386/304] rounded-[16px] overflow-hidden mb-4">
      <img 
        src={activity.main_image} 
        alt={activity.name} 
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-3 left-3 bg-white rounded-full px-2 py-1 flex items-center shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF4C39" className="w-4 h-4 mr-1">
          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path>
        </svg>
        <span className="text-sm font-medium">{activity.rating}</span>
      </div>
    </div>
    <div className="space-y-2 flex-1">
      <h3 className="text-lg font-semibold font-['DM Sans'] text-[#313131]">{activity.name}</h3>
      <p className="text-base font-normal font-['DM Sans'] text-[#636363] line-clamp-2">{activity.tagline}</p>
    </div>
    <div className="mt-4">
      <Link 
        to={`/team-building-activity/${activity.slug}`}
        className="relative w-full h-[45px] group block"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#FF4C39] to-[#FFB573] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[8px]"></div>
        <div className="absolute inset-0 w-full h-full flex items-center justify-center gap-2 border border-[#b1b1b1] rounded-[8px] group-hover:border-transparent transition-colors duration-300">
          <span className="text-base font-bold font-['DM Sans'] text-[#b1b1b1] group-hover:text-white transition-colors duration-300">View Details</span>
        </div>
      </Link>
    </div>
  </div>
); 