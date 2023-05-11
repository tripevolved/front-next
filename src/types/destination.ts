import { Photo } from "./photo";

export interface PublicDestination {
  title: string;
  recommendedBy: PublicDestinationUser;
  photos: Photo[];
  videos: PublicDestinationVideo[];
  posts: string[];
  features: PublicDestinationFeature[];
  tips: PublicDestinationTip[];
  faq: PublicDestinationFaq[];
}

export interface PublicDestinationVideo {
  provider: string;
  source: string;
}

export interface PublicDestinationFeature {
  title: string;
  description: string;
  icon: string;
}

export interface PublicDestinationTip {
  title: string;
  icon: string;
  mainText: string;
  toolTip: string;
}

export interface PublicDestinationUser {
  name: string;
  photo: string;
  instagram: string;
  tikTok: string;
  blog: string;
  recommendationText: string;
}

export interface PublicDestinationFaq {
  answer: string;
  icon?: string;
  question: string;
}
