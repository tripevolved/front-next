import { ComponentHTMLProps } from "@/types";
import { ButtonProps } from "mars-ds";
import { MediaObjectProps } from "../../common/MediaObject";

type PickedMediaObjectProps = "heading" | "image" | "text";

export interface ShareButtonProps
  extends ButtonProps,
    Pick<ComponentHTMLProps, "sx" | "children">,
    SocialSharingModalProps {}

export interface SocialSharingModalProps extends Pick<MediaObjectProps, PickedMediaObjectProps> {
  link: string;
  message: string;
}
