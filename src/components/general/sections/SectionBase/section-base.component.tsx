import { makeClassName } from "@/helpers/classname.helpers";

import { SectionBase as MarsSectionBase } from "mars-ds";
import { SectionBaseProps } from "./section-base.types";

export function SectionBase({ className, sx, ...props }: SectionBaseProps) {
  return <MarsSectionBase className={makeClassName(className)(sx)} {...props} />;
}
