import { MediaObject } from "@/components";
import classNames from "classnames";
import { Grid, Image, SectionBase } from "mars-ds";
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
      <Image
        alt="imagem da home"
        {...mobileImage}
        className="home-section-hero__image home-section-hero__image--mobile"
      />
      <Image
        alt="emoji"
        {...emoji}
        className="home-section-hero__image--desktop home-section-hero__image--emoji"
      />
      <Grid columns={{ md: [2, 3, 2] }} className="home-section-hero__content align-items-center">
        <Image
          alt="imagem à esquerda"
          {...leftImage}
          className="home-section-hero__image--desktop home-section-hero__image--left"
        />
        <MediaObject {...content} />
        <Image
          alt="imagem à direita"
          {...rightImage}
          className="home-section-hero__image--desktop home-section-hero__image--right"
        />
      </Grid>
    </SectionBase>
  );
};
