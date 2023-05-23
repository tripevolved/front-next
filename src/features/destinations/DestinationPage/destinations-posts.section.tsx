import type { DestinationProps } from "./destination-page.types";
import { SectionBase } from "@/ui";

interface DestinationPostsSectionProps extends Pick<DestinationProps, "posts"> {}

export const DestinationPostsSection = ({ posts }: DestinationPostsSectionProps) => {
  return <SectionBase>DestinationPostsSection</SectionBase>;
};
