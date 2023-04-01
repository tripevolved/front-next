import type { EmojiProps } from "./emoji.types";

import { makeClassName } from "@/helpers/classname.helpers";
import { Picture } from "@/components";

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
  })({ animationDelay, justifySelf: align, ...sx });

  return (
    <div className={cn} {...props}>
      <Picture src={`/emoji/emoji-${name}.png`} />
    </div>
  );
}
