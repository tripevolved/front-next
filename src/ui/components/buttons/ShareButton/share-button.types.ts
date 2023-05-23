import type { ComponentHTMLProps } from "@/core/types";
import type { ButtonProps } from "mars-ds";
import type { MediaObjectProps } from "@/ui";

type PickedMediaObjectProps = "heading" | "image" | "text";

export interface ShareButtonProps
  extends ButtonProps,
    Pick<ComponentHTMLProps, "sx" | "children">,
    SocialSharingModalProps {}

export interface SocialSharingModalProps extends Pick<MediaObjectProps, PickedMediaObjectProps> {
  link: string;
  message: string;
}
