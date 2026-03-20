import { Photo } from "./photo";

export interface DestinationImage {
  url: string;
  shortDescription?: string;
}

export interface PublicDestination {
  id: string;
  uniqueName: string;
  title: string;
  recommendedBy: PublicDestinationExpert;
  photos: DestinationImage[];
  videos: PublicDestinationVideo[];
  posts: Post[];
  features: PublicDestinationFeature[];
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

export interface PublicDestinationFeature {
  title: string;
  description: string;
  type: string; // Lista de nomes para emojis
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
