import { ClassNamesArg, css, cx } from "@emotion/css";

type ClassName = ClassNamesArg | ClassNamesArg[]

export const makeCn = (className?: ClassName, sx?: any) => {
  const style = typeof sx === "object" ? css(sx) : undefined
  return cx(className, style);
}
