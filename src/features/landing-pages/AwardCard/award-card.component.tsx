import type { AwardCardProps } from "./award-card.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Emoji, Text } from "@/ui";
import { Grid, Label, LabelVariants } from "mars-ds";

export function AwardCard({
  className,
  children,
  sx,
  label,
  heading,
  text,
  emojiName,
  ...props
}: AwardCardProps) {
  const cn = makeCn("award-card", className)(sx);

  return (
    <div className={cn} {...props}>
      <Grid>
        {emojiName ? <Emoji name={emojiName} /> : null}
        {label ? (
          <div>
            <Text as="span" className="award-card__label" size="sm">{label}</Text>
          </div>
        ) : null}
        <div>
          {heading ? (
            <Text size="xxl" as="h3" sx={{ fontSize: emojiName ? "2rem" : undefined }}>
              {heading}
            </Text>
          ) : null}
          {text ? <Text>{text}</Text> : null}
        </div>
      </Grid>
      {children}
    </div>
  );
}
