import type { ThumbnailCarouselProps } from "./thumbnail-carousel.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function ThumbnailCarousel({ className, children, sx, ...props }: ThumbnailCarouselProps) {
  const cn = makeCn("thumbnail-carousel", className)(sx);

  return (
    <div className={cn} {...props}>
      {children}
    </div>
  );
};
