import { makeClassName } from "@/helpers/classname.helpers";
import { areChildrenLikeProperty } from "@/helpers/components.helpers";
import { ComponentHTMLProps } from "@/types";
import { Heading, Text as MarsText, TextProps as MarsTextProps } from "mars-ds";

export interface TextProps extends MarsTextProps, Pick<ComponentHTMLProps, "sx"> {
  variant?: "heading" | "default";
  heading?: boolean;
  text?: string | number | null;
}

const areChildrenNode = (children: any) =>
  !areChildrenLikeProperty(children, "html", "children", "text");

export function Text({ children = null, text, variant, sx, className, heading, ...props }: TextProps) {
  const cn = makeClassName(className)(sx);

  const Component = variant === "heading" || heading ? Heading : MarsText;

  if (areChildrenNode(children)) {
    return (
      <Component {...props} className={cn}>
        {children || text}
      </Component>
    );
  }

  const cnProp = makeClassName(className, children.className)({ ...sx, ...children.sx });
  const {
    children: c = null,
    text: t = null,
    ...allProps
  } = { text, ...props, ...children, className: cnProp };
  return <Component {...allProps}>{c || t}</Component>;
}
