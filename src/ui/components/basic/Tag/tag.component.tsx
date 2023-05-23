import type { TagProps } from "./tag.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { areChildrenLikeProperty } from "@/utils/helpers/components.helpers";

export function Tag({ className, children, sx, ...props }: TagProps) {
  const cn = makeCn("tag", className)(sx);

  if (areChildrenLikeProperty(children) && typeof children === 'object') {
    return (
      // @ts-ignore
      <div
        {...props}
        // @ts-ignore
        {...children}
        // @ts-ignore
        className={makeCn(cn, children.className)(children.sx)}
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
