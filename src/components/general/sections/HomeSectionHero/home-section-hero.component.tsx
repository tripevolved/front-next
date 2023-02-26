import { MediaObject, Picture } from "@/components";
import classNames from "classnames";
import { Grid, SectionBase } from "mars-ds";
import { HomeSectionHeroProps } from "./home-section-hero.types";

export const HomeSectionHero = ({
  image,
  heading,
  text,
  children,
  cta,
  className,
  mobileImage,
  leftImage,
  rightImage,
  emoji,
  ...props
}: HomeSectionHeroProps) => {
  const content = { image, heading, text, cta, children };
  return (
    <SectionBase className={classNames("home-section-hero", className)} {...props}>
      <Picture className="home-section-hero__image home-section-hero__image--mobile">
        {mobileImage}
      </Picture>
      <Picture className="home-section-hero__image--desktop home-section-hero__image--emoji">
        {emoji}
      </Picture>
      <Grid columns={{ md: [2, 3, 2] }} className="home-section-hero__content align-items-center">
        <Picture className="home-section-hero__image--desktop home-section-hero__image--left">
          {leftImage}
        </Picture>
        <MediaObject {...content} />
        <Picture className="home-section-hero__image--desktop home-section-hero__image--right">
          {rightImage}
        </Picture>
      </Grid>
    </SectionBase>
  );
};
