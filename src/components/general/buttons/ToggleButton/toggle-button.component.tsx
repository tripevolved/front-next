import { ToggleButton as MarsToggleButton, ToggleButtonProps } from "mars-ds";
import NextLink from "next/link";

const ToggleButton = ({ href, ...props }: ToggleButtonProps) => {
  if (!href) {
    return <MarsToggleButton href={href} {...props} />;
  }
  return (
    <NextLink href={href}>
      <MarsToggleButton as={"a"} href={href} {...props} />
    </NextLink>
  );
};

export default ToggleButton;
