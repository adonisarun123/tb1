export const images = {
  hero: {
    background: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
  },
  services: {
    teamBuilding: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
    shortExperiences: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd',
    musicBased: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329',
  },
  destinations: {
    paris: 'https://images.unsplash.com/photo-1431274172761-fca41d930114',
    tokyo: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc',
    newYork: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee',
    london: 'https://images.unsplash.com/photo-1520544723208-7862307cb106',
    sydney: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9',
    dubai: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
  },
  experiences: {
    outbound: {
      adventure: 'https://images.unsplash.com/photo-1606768666853-403c90a981ad',
      cultural: 'https://images.unsplash.com/photo-1577553696785-6d9626c75400',
      wellness: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef',
    },
    inbound: {
      corporate: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
      retreat: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      workshop: 'https://images.unsplash.com/photo-1560523159-6b681a1f7411',
    },
  },
  testimonials: {
    avatar1: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    avatar2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    avatar3: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
  },
  partners: {
    logo1: '/src/assets/images/partner1.svg',
    logo2: '/src/assets/images/partner2.svg',
    logo3: '/src/assets/images/partner3.svg',
    logo4: '/src/assets/images/partner4.svg',
    logo5: '/src/assets/images/partner5.svg',
  },
} as const;

// Type-safe image paths
export type ImagePath = typeof images[keyof typeof images];
