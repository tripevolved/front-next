import { Button as _Button, ButtonProps as _ButtonProps } from "@chakra-ui/react";
import { useMemo } from "react";

export interface ButtonProps extends _ButtonProps {
  variant?: "primary" | "outline";
}

export const Button = ({ variant, size, ...props }: ButtonProps) => {
  const variantAdapter = useMemo(() => {
    if (variant === "outline") return "outline";
    return "solid";
  }, [variant]);

  const sizeAdapter = useMemo(() => {
    if (size === "sm") return { px: 7, py: 5, size: "xs" };
    return { px: 10, py: 7, size };
  }, [size]);

  return (
    <_Button
      variant={variantAdapter}
      colorScheme="primary"
      {...sizeAdapter}
      borderRadius="full"
      {...props}
    />
  );
};
