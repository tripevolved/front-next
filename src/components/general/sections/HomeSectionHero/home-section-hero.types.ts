import type { MediaObjectProps } from "@/components";
import { ImageProps, SectionBaseProps } from "mars-ds";

export type HomeSectionHeroProps = MediaObjectProps &
  SectionBaseProps & {
    mobileImage?: ImageProps;
    leftImage?: ImageProps;
    rightImage?: ImageProps;
    emoji?: ImageProps;
  };
