import { ArrayCSSInterpolation, ClassNamesArg, css, cx } from "@emotion/css";

export const makeClassName = (...className: ClassNamesArg[]) => {
  return (...sx: ArrayCSSInterpolation) => {
    return cx(className, css(sx));
  };
};
