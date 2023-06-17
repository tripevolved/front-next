import { Box, Text } from "@/ui";
import type { HasProfileProps } from "./has-profile.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function HasProfile({ className, children, sx, ...props }: HasProfileProps) {
  const cn = makeCn("has-profile", className)(sx);

  return (
    <Box className={cn} {...props}>
      <Text>Seu perfil de viajante é...</Text>
      {children}
    </Box>
  );
}
