import { Section, SectionProps } from "@/ui/section";
import { Picture, PictureProps } from "@/ui/picture";

export interface SectionImageProps extends SectionProps {
  image: PictureProps;
}

export const SectionImage = ({ image, ...props }: SectionImageProps) => {
  return (
    <Section {...props}>
      <Picture {...image} />
    </Section>
  );
};
