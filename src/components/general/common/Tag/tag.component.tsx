import type { TagProps } from "./tag.types";

import { makeClassName } from "@/helpers/classname.helpers";
import { areChildrenLikeProperty } from "@/helpers/components.helpers";

export function Tag({ className, children, sx, ...props }: TagProps) {
  const cn = makeClassName("tag", className)(sx);

  if (areChildrenLikeProperty(children) && typeof children === 'object') {
    return (
      // @ts-ignore
      <div
        {...props}
        // @ts-ignore
        {...children}
        // @ts-ignore
        className={makeClassName(cn, children.className)(children.sx)}
      />
    );
  }

  return (
    <div className={cn} {...props}>
      {/* @ts-ignore */}
      {children}
    </div>
  );
}
