import Image from "next/image";

export const Logo = ({ vertical = false }) => {
  return (
    <div className="logo">
      {vertical ? (
        <Image alt="Trip Evolved" height={56} width={137} src="/brand/logo-principal.svg" />
      ) : (
        <Image alt="Trip Evolved" height={32} width={178} src="/brand/logo-horizontal.svg" />
      )}
    </div>
  );
};
