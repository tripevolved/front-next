export interface Restaurant {
  id: string;
  imageUrl?: string | null;
  name: string;
  address?: string | null;
  priceRange?: string | null;
  tags: string;
}

export interface RestaurantDetail {
  id: string;
  images: RestaurantDetailImage[];
  name: string;
  tags: string;
  address?: string | null;
  priceRange?: string | null;
  description?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  functioningHoursDetail?: string | null;
}

interface RestaurantDetailImage {
  url: string;
  alt?: string | null;
}

export interface RestaurantParameter {
  answerDate: Date;
  questionId: string;
  possibleAnswerId: string;
}