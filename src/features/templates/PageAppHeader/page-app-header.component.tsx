import { Box, SectionBase, Text } from "@/ui";
import { Avatar, ToggleButton } from "mars-ds";
import type { PageAppHeaderProps } from "./page-app-header.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function PageAppHeader({
  title,
  subtitle,
  backButton,
  href,
  className,
  children,
  sx,
  ...props
}: PageAppHeaderProps) {
  const cn = makeCn("page-app-header", className)(sx);

  return (
    <SectionBase className={cn} container="md" {...props}>
      <Box className="page-app-header__box">
        {backButton ? (
          <ToggleButton
            size="md"
            iconName="arrow-left"
            href={href}
            className="mr-md theme-dark"
            variant="neutral"
          />
        ) : (
          <Avatar
            size="xl"
            thumbnail="/brand/logo-symbol-circle.svg"
            className="page-app-header__box__avatar"
          />
        )}
        <div>
          {title ? (
            <Text heading size="xs">
              {title}
            </Text>
          ) : null}
          {subtitle ? <Text size="lg">{subtitle}</Text> : null}

          {children}
        </div>
      </Box>
    </SectionBase>
  );
}
