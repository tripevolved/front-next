import { CardProps, TextProps } from "mars-ds";

export interface HomeNumberedCardProps extends CardProps {
  bullet?: number | string | TextProps;
  heading?: string | TextProps;
  subtitle?: string | TextProps;
  text?: string | TextProps;
};
