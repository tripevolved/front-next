import type { DestinationProps } from "./destination-page.types";
import { SectionBase } from "@/components";

interface DestinationPostsSectionProps extends Pick<DestinationProps, "posts"> {}

export const DestinationPostsSection = ({ posts }: DestinationPostsSectionProps) => {
  return <SectionBase>DestinationPostsSection</SectionBase>;
};
