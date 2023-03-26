import { ArrayClassNamesArg, ArrayCSSInterpolation, css, cx } from "@emotion/css";

export const makeClassName = (...className: any) => (...sx: ArrayCSSInterpolation) => {
  const style = typeof sx === "object" ? css(sx) : undefined
  return cx(className, style);
}
