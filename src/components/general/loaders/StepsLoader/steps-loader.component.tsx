import type { StepsLoaderProps } from "./steps-loader.types";

import { makeClassName } from "@/helpers/classname.helpers";

export function StepsLoader({ className, children, sx, timeout, texts, ...props }: StepsLoaderProps) {
  const cn = makeClassName("steps-loader", className)(sx);

  return (
    <div className={cn} {...props}>
      StepsLoader
      {children}
    </div>
  );
};
