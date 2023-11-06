import type { ModalContentProps } from "./modal-content.types";

import { MediaObject } from "@/ui";
import { css, cx } from "@emotion/css";
import { Container } from "mars-ds";

export function ModalContent({
  image,
  heading,
  children,
  className,
  sx,
  text,
  container = "sm",
  ...props
}: ModalContentProps) {
  const cn = cx("modal-content", className, css(sx));
  return (
    <div className={cn} {...props}>
      <Container className="modal-content__container" container={container}>
        <MediaObject image={image} heading={heading} text={text} />
        {children}
      </Container>
    </div>
  );
}
