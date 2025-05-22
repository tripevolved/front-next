import { Photo } from "./photo";

export interface PublicDestination {
  id: string;
  uniqueName: string;
  title: string;
  recommendedBy: PublicDestinationExpert;
  photos: Photo[];
  videos: PublicDestinationVideo[];
  posts: Post[];
  features: PublicDestinationFeature[];
  tips: PublicDestinationTip[];
  faq: PublicDestinationFaq[];
  travelerProfiles: string[];
  travelType: TravelType;
}

export type TravelType = "PAIRS" | "INDIVIDUALS" | "COUPLES" | "FAMILIES";

export interface TripDestination {
  id: string;
  title: string;
  gastronomicInformation: string;
  description: string;
  recommendedBy: PublicDestinationExpert;
  photos: Photo[];
  features: PublicDestinationFeature[];
  tips: PublicDestinationTip[];
  travelerProfiles: string[] | null;
  travelType: string;
}

export interface PublicDestinationVideo {
  provider: "youtube" | "vimeo" | string;
  source: string;
}

export type FeatureIcon =
  | "culture"
  | "food"
  | "party"
  | "relax"
  | "attractions"
  | "accommodation"
  | "natural-beauty"
  | "uniqueness"
  | "adrenaline";

export type TipeIcon =
  | "climate"
  | "days-to-visit"
  | "daily-cost"
  | "generic"
  | "period"
  | "security";

export interface PublicDestinationFeature {
  title: string;
  description: string;
  type: string; // Lista de nomes para emojis
}

export interface PublicDestinationTip {
  type: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface PublicDestinationExpert {
  name: string;
  photo: string;
  recommendationText: string;
  socialMediaInformation: Social[];
}

interface Social {
  name: string;
  url: string;
}

export interface PublicDestinationFaq {
  answer: string;
  icon?: string;
  question: string;
}

interface Post {
  // TODO: implement rules
}
