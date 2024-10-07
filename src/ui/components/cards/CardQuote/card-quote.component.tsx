import type { CardQuoteProps } from "./card-quote.types";

import { makeCn } from "@/utils/helpers/css.helpers";

import { Avatar, Card, Grid } from "mars-ds";
import { Picture, Text } from "@/ui";

export function CardQuote({
  className,
  cta,
  footer,
  footerSub,
  text,
  avatar,
  sx,
  ...props
}: CardQuoteProps) {
  const cn = makeCn("card-quote", className)(sx);
  return (
    <Card className={cn} {...props}>
      <Grid>
        <Picture src="/assets/home/quote.png" />
        <Text className="card-quote__text" size="lg">
          {`${text}"`}
        </Text>
        <div className="card-quote__footer">
          {avatar && <Avatar size="xl" thumbnail={avatar} />}
          <div>
            <Text as="strong" size="lg" className="my-0 color-primary">
              {footer}
            </Text>
            <Text className="my-0 card-quote__footer__sub" size="sm">
              {footerSub}
            </Text>
          </div>
        </div>
      </Grid>
    </Card>
  );
}
