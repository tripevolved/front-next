import type { PriceProps, PricingProps } from "./pricing.types";

import { makeCn } from "@/utils/helpers/css.helpers";

import { Emoji, Picture, Tag, Text } from "@/ui";
import { Button, Grid, Icon } from "mars-ds";

export function Pricing({
  className,
  children,
  sx,
  heading,
  emojiName,
  image,
  features,
  cta,
  highlight,
  price,
  label,
  ...props
}: PricingProps) {
  const cn = makeCn("pricing", className, { "pricing--highlight": Boolean(highlight) })(sx);
  return (
    <div className={cn} {...props}>
      {label ? <Tag className="pricing__label">{label}</Tag> : null}
      {image ? <Picture className="pricing__image">{image}</Picture> : null}
      {emojiName ? (
        <div>
          <Emoji name={emojiName} />
        </div>
      ) : null}
      <Text className="pricing__heading" variant="heading" size="lg">
        {heading}
      </Text>
      <Grid className="pricing__features">
        {features?.map((feature, key) => (
          <div key={key} className="pricing__features__item">
            <Icon name="check-circle" />
            <Text>{feature}</Text>
          </div>
        ))}
      </Grid>
      {price ? <Price {...price} /> : null}
      {children}
      {cta ? <Button {...cta} /> : null}
    </div>
  );
}

const Price = ({ current, old, description, className, children, sx, ...props }: PriceProps) => {
  const cn = makeCn("price", className)(sx);

  return (
    <Grid gap={8} className={cn} {...props}>
      <Text as="del">{old}</Text>
      <Text as="div" variant="heading" size="lg">
        {current}
      </Text>
      <Text as="div" size="lg">
        {description}
      </Text>
      {children}
    </Grid>
  );
};
