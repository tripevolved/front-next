import type { MediaObjectProps, PictureProps } from "@/components";
import { SectionBaseProps } from "mars-ds";

export type HomeSectionHeroProps = MediaObjectProps &
  SectionBaseProps & {
    mobileImage?: PictureProps;
    leftImage?: PictureProps;
    rightImage?: PictureProps;
    emoji?: PictureProps;
  };
