import type { DestinationProps } from "./destination-page.types";
import { SectionBase } from "@/components";

interface DestinationVideoSectionProps extends Pick<DestinationProps, "videos"> {}

export const DestinationVideoSection = ({ videos }: DestinationVideoSectionProps) => {
  return <SectionBase>DestinationVideoSection</SectionBase>;
};
