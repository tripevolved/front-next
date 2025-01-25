import Video from 'next-video';

import { Box } from "@/ui";
import { VerticalVideoProps } from "./vertical-video.types";
import { makeCn } from "@/utils/helpers/css.helpers";

export function VerticalVideo({ src, className, children, sx, ...props }: VerticalVideoProps) {
  const cn = makeCn("vertical-video", className)(sx);
  return (
    <Box className={cn}>
      <Box className="vertical-video__container">
        <Video className="vertical-video__video" src={src} autoPlay loop muted controls={false}>
          {children}
        </Video>
      </Box>
    </Box>
  );
}