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
  style,
  ...props
}: EmojiProps) {
  if (!name) return null;

  const classNames = [
    "emoji",
    className,
    {
      [`emoji--${size}`]: size,
      "emoji--animated": animated,
    },
  ];

  const animationDelay = `${Math.random() * 10}s`;

  const cn = makeClassName(classNames)({ animationDelay, justifySelf: align }, style, sx);

  return (
    <div className={cn} {...props}>
      <Picture src={`/emoji/emoji-${name}.png`} />
    </div>
  );
}
