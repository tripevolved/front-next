import { Button } from "mars-ds";
import type { WhatsappButtonProps } from "./whatsapp-button.types";

import { makeClassName } from "@/helpers/classname.helpers";
import { useMemo } from "react";
import { getWhatsappLink } from "@/helpers/whatsapp.helpers";

export function WhatsappButton({
  className,
  sx,
  message,
  phone,
  hideIcon,
  ...props
}: WhatsappButtonProps) {
  const cn = makeClassName("whatsapp-button", className)(sx);

  const href = useMemo(() => getWhatsappLink(message, phone), [message, phone]);
  const iconName = useMemo(() => (hideIcon ? undefined : "whatsapp"), [hideIcon]);

  return <Button className={cn} iconName={iconName} {...props} href={href} target="_blank" />;
}
