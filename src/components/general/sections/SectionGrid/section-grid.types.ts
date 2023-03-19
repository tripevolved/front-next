import { ComponentHTMLProps } from "@/types";
import { ButtonProps, GridProps } from "mars-ds";
import { TextProps } from "../../common/Text";
import { SectionBaseProps } from "../SectionBase";

export interface SectionGridProps extends ComponentHTMLProps {
  container: SectionBaseProps['container'];
  heading?: TextProps;
  text?: TextProps;
  cta?: ButtonProps;
  columns?: GridProps['columns'];
};
