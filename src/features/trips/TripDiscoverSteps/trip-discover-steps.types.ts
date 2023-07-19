import type { ComponentHTMLProps } from "@/core/types";

export interface TripDiscoverStepsProps extends ComponentHTMLProps {}

export type TripDiscoverStep =
  | "initial"
  | "build-profile"
  | "profile"
  | "register-city"
  | "destinations"
  | "configuration"
  | "trip-goal"
  | "finish";
