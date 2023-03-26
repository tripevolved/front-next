import type { AwardCardProps } from "./award-card.types";

import { makeClassName } from "@/helpers/classname.helpers";
import { Emoji, Text } from "@/components";
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
  const cn = makeClassName("award-card", className)(sx);

  return (
    <div className={cn} {...props}>
      <Grid>
        <Emoji name={emojiName} />
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
