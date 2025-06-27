import React from 'react';

interface ResortCardProps {
  name: string;
  location: string;
  description: string;
  image: string;
  facilities: string[];
  activities: string[];
}

const ResortCard: React.FC<ResortCardProps> = ({
  name,
  location,
  description,
  image,
  facilities,
  activities,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4">{location}</p>
        <p className="text-gray-700 mb-4">{description}</p>
        
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Facilities</h4>
          <ul className="list-disc list-inside text-gray-700">
            {facilities.slice(0, 3).map((facility, index) => (
              <li key={index} className="text-sm">{facility}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">Activities</h4>
          <ul className="list-disc list-inside text-gray-700">
            {activities.slice(0, 3).map((activity, index) => (
              <li key={index} className="text-sm">{activity}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResortCard; 