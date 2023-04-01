import { makeClassName } from "@/helpers/classname.helpers"
import { BoxProps } from "./box.types"

export const Box = ({ as: Component = "div", children, className, sx, ...props }: BoxProps) => {
  const cn = makeClassName(className)(sx)
  return <Component className={cn} {...props}>{children}</Component>
}
