import {
  SectionTwoColumns,
  SectionTwoColumnsProps,
} from "@/components/commons/section-two-columns";
import { Picture, PictureProps } from "@/ui/picture";
import { CtaBlock, CtaBlockProps } from "../cta-block";

export interface SectionWithImageProps
  extends CtaBlockProps,
    SectionTwoColumnsProps {
  image?: PictureProps;
}

export const SectionWithImage = ({
  heading,
  text,
  cta,
  image,
  ...props
}: SectionWithImageProps) => {
  return (
    <SectionTwoColumns reversed overflowX="hidden" {...props}>
      {image ? (
        <Picture centered {...image} style={{ maxWidth: "100vw" }} />
      ) : null}
      <CtaBlock heading={heading} text={text} cta={cta} />
    </SectionTwoColumns>
  );
};
