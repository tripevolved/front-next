import { makeClassName } from "@/helpers/classname.helpers"
import { BoxProps } from "./Box.types"

export const Box = ({ as: Component = "div", children, className, sx, style, ...props }: BoxProps) => {
  const cn = makeClassName(className)(sx, style)
  return <Component className={cn} {...props}>{children}</Component>
}
