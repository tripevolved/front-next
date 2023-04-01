import type { EmojiProps } from "./emoji.types";

import { makeClassName } from "@/helpers/classname.helpers";
import { Box, Picture } from "@/components";

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

  const cn = makeClassName("emoji", className, {
    [`emoji--${size}`]: Boolean(size),
    "emoji--animated": animated,
  })(sx, { justifySelf: align });

  return (
    <Box className={cn} style={{ animationDelay, ...style }} {...props}>
      <Picture src={`/emoji/emoji-${name}.png`} />
    </Box>
  );
}
