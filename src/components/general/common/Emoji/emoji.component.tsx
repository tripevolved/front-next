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
  if (!name) return null;

  const animationDelay = `${Math.random() * 10}s`;

  const cn = makeClassName("emoji", className, {
    [`emoji--${size}`]: size,
    "emoji--animated": animated,
  })(sx);

  return (
    <Box className={cn} sx={{ animationDelay, justifySelf: align }} {...props}>
      <Picture src={`/emoji/emoji-${name}.png`} />
    </Box>
  );
}
