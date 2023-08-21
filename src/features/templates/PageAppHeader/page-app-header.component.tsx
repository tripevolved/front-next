import { Box, SectionBase, Text } from "@/ui";
import { Button } from "mars-ds";
import type { PageAppHeaderProps } from "./page-app-header.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function PageAppHeader({ title, backButton, href, className, children, sx, ...props }: PageAppHeaderProps) {
  const cn = makeCn("page-app-header", className)(sx);

  return (
    <SectionBase className={cn} container="md" {...props}>
      <Box className="page-app-header__box">
        {backButton && (
          <Button
            size="sm"
            iconName="arrow-left"
            href={href}
            className="page-app-header__box__back-button"
          />
        )}
        <Text heading size="xs" className="page-app-header__box__title">
          {title}
        </Text>
      </Box>
      {children}
    </SectionBase>
  );
};
