import { Picture } from "@/components";
import { css, cx } from "@emotion/css";
import { LogoProps } from "./logo.types";

export function Logo({ vertical, className, sx, ...props }: LogoProps) {
  const cn = cx("logo", className, css(sx));
  return (
    <div className={cn} {...props}>
      {vertical ? (
        <Picture alt="Trip Evolved" height={56} width={137} src="/brand/logo-principal.svg" />
      ) : (
        <Picture alt="Trip Evolved" height={32} width={178} src="/brand/logo-horizontal.svg" />
      )}
    </div>
  );
}
