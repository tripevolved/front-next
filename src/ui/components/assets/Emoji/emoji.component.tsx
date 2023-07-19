import type { EmojiProps } from "./emoji.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Box, Picture } from "@/ui";

export function Emoji({
  align,
  className,
  children,
  name,
  animated,
  size = "md",
  sx,
  style,
  ...props
}: EmojiProps) {
  // DON'T put "animationDelay" into sx, because it's causes a bug
  const animationDelay = animated ? `${Math.floor(Math.random() * 1000)}ms` : undefined;

  const cn = makeCn("emoji", className, {
    [`emoji--${size}`]: Boolean(size),
    "emoji--animated": animated,
  })(sx, { justifySelf: align });

  return (
    <Box className={cn} style={{ animationDelay, ...style }} {...props}>
      <Picture src={`/emoji/emoji-${name}.png`} />
    </Box>
  );
}
