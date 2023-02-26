import { Picture } from "@/components";
import { LogoProps } from "./logo.types";

export function Logo({ vertical }: LogoProps) {
  return (
    <div className="logo">
      {vertical ? (
        <Picture alt="Trip Evolved" height={56} width={137} src="/brand/logo-principal.svg" />
      ) : (
        <Picture alt="Trip Evolved" height={32} width={178} src="/brand/logo-horizontal.svg" />
      )}
    </div>
  );
}
