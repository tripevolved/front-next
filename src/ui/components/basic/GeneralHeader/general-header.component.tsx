import { Button } from "../../buttons/Button";
import { SectionBase } from "../../sections/SectionBase";
import { Box } from "../Box";
import { Text } from "../Text";
import type { GeneralHeaderProps } from "./general-header.types";

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
    <SectionBase className={cn} {...props}>
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
    </SectionBase>
  );
}
