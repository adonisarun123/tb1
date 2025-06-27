export interface Activity {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  type: string;
  rating: number;
  participants: string;
  duration: string;
  difficulty?: string;
} 