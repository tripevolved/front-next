import { css, cx } from "@emotion/css";
import { CSSInterpolation } from "@emotion/serialize";
import type { ClassNamesArg } from "node_modules/@emotion/css/dist/declarations/src/create-instance";

export const makeCn = (...className: ClassNamesArg[]) => {
  return (...sx: CSSInterpolation[]) => {
    if (sx.length === 0) return cx(className);
    return cx(className, css(sx));
  };
};

export const parseNumericValue = (value?: string | number) => {
  const isNumber = !Number.isNaN(Number(value));
  return isNumber ? `${value}px` : value;
};
