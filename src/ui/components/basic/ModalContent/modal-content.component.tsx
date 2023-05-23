import type { ModalContentProps } from "./modal-content.types";

import { MediaObject } from "@/ui";
import { css, cx } from "@emotion/css";

export function ModalContent({ image, heading, children, className, sx, text, ...props }: ModalContentProps) {
  const cn = cx("modal-content", className, css(sx));
  return (
    <div className={cn} {...props}>
      <MediaObject image={image} heading={heading} text={text} />
      {children}
    </div>
  );
};
