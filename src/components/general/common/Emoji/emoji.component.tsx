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
  ...props
}: EmojiProps) {
  const animationDelay = `${Math.floor(Math.random() * 1000)}ms`;

  const cn = makeClassName("emoji", className, {
    [`emoji--${size}`]: Boolean(size),
    "emoji--animated": animated,
  })(sx, { justifySelf: align });

  return (
    <Box className={cn} style={{ animationDelay }} {...props}>
      <Picture src={`/emoji/emoji-${name}.png`} />
    </Box>
  );
}
