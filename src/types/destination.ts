import { Photo } from "./photo";

export interface PublicDestination {
  title: string;
  recommendedBy: User;
  photos: Photo[];
  videos: string[];
  posts: string[];
  features: Feature[];
  tips: Tip[];
  faq: Faq[];
}

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface Tip {
  title: string;
  icon: string;
  mainText: string;
  toolTip: string;
}

interface User {
  name: string;
  photo: string;
  instagram: string;
  tikTok: string;
  blog: string;
  recommendationText: string;
}

interface Faq{
  answer: string;
  icon?: string;
  question: string;
}
