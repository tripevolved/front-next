import type { IntroductionCardProps } from "./introduction-card.types";

import { ModalContent, Picture, Text } from "@/components";
import { css, cx } from "@emotion/css";
import { Grid, Icon, Modal } from "mars-ds";

export const IntroductionCard = ({
  className,
  children,
  image,
  heading,
  text,
  social = {},
  sx,
  ...props
}: IntroductionCardProps) => {
  const cn = cx("introduction-card", className, css(sx));

  const IntroductionModal = () => {
    return (
      <ModalContent className="introduction-card__modal">{children}</ModalContent>
    )
  }

  const openModal = () => {
    Modal.open(IntroductionModal, { children })
  }
  return (
    <div className={cn} {...props}>
      <Picture tabIndex={0} onClick={openModal} className="introduction-card__image">{image}</Picture>
      <span className="introduction-card__divider" />
      <Grid className="introduction-card__content">
        <Text variant="heading" size="xs">
          {heading}
        </Text>
        <Text size="sm">{text}</Text>
        <div className="social flex align-items-center gap-md">
          {Object.entries(social).map(([name, href]) => (
            <SocialItem key={name} href={href} name={name} />
          ))}
        </div>
      </Grid>
    </div>
  );
};

interface SocialItemProps {
  href?: string;
  name?: string;
}

const SocialItem = ({ href, name = "" }: SocialItemProps) => {
  return (
    <a href={href} target="_blank" className="social-item" rel="noreferrer">
      <Icon name={name} size="sm" />
    </a>
  );
};
