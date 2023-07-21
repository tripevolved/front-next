import type { GeneralHeaderProps } from "./general-header.types";

import { Button } from "mars-ds";
import { Box, SectionBase, Text } from "@/ui";

import { makeCn } from "@/utils/helpers/css.helpers";

export function GeneralHeader({
  className,
  children,
  title,
  backButton,
  href,
  sx,
  ...props
}: GeneralHeaderProps) {
  const cn = makeCn("general-header", className)(sx);

  return (
    <div className={cn} {...props}>
      <Box className="general-header__box">
        {backButton && (
          <Button
            size="sm"
            iconName="arrow-left"
            href={href}
            className="general-header__box__back-button"
          />
        )}
        <Text heading size="xs" className="general-header__box__title">
          {title}
        </Text>
      </Box>
    </div>
  );
}
