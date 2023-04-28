import type { DestinationProps } from "./destination-page.types";
import { SectionBase } from "@/components";

interface DestinationTipsSectionProps extends Pick<DestinationProps, "tips"> {}

export const DestinationTipsSection = ({ tips }: DestinationTipsSectionProps) => {
  return <SectionBase>DestinationTipsSection</SectionBase>;
};
