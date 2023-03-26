import type { EmojiProps } from "./emoji.types";

import { makeClassName } from "@/helpers/classname.helpers";
import { Picture } from "@/components";

export function Emoji({
  className,
  children,
  name,
  animated,
  size = "md",
  sx,
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

  const style = {
    animationDelay: `${Math.random() * 10}s`,
    ...sx,
  };

  const cn = makeClassName(classNames)(style);

  return (
    <div className={cn} {...props}>
      <Picture src={`/emoji/emoji-${name}.png`} />
    </div>
  );
}
