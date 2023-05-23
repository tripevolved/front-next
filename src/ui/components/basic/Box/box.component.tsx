import { makeCn } from "@/utils/helpers/css.helpers"
import { BoxProps } from "./box.types"

export const Box = ({ as: Component = "div", children, className, sx, ...props }: BoxProps) => {
  const cn = makeCn(className)(sx)
  return <Component className={cn} {...props}>{children}</Component>
}
