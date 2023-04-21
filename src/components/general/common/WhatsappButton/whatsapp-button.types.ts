import { ComponentHTMLProps } from "@/types";
import { ButtonProps } from "mars-ds";

export interface WhatsappButtonProps extends ButtonProps, Pick<ComponentHTMLProps, "sx"> {
  message?: string;
  phone?: string;
  hideIcon?: boolean;
}
