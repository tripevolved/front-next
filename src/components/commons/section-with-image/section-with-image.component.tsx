import {
  SectionTwoColumns,
  SectionTwoColumnsProps,
} from "@/components/commons/section-two-columns";
import { Picture, PictureProps } from "@/ui/picture";
import { BoxProps } from "@chakra-ui/react";
import { CtaBlock, CtaBlockProps } from "../cta-block";

export interface SectionWithImageProps extends CtaBlockProps, SectionTwoColumnsProps {
  image?: PictureProps;
  containerProps?: BoxProps;
}

export const SectionWithImage = ({
  heading,
  text,
  cta,
  image,
  containerProps,
  ...props
}: SectionWithImageProps) => {
  return (
    <SectionTwoColumns reversed overflowX="hidden" {...props}>
      {image ? <Picture centered {...image} style={{ maxWidth: "100vw" }} /> : null}
      <CtaBlock heading={heading} text={text} cta={cta} {...containerProps} />
    </SectionTwoColumns>
  );
};
