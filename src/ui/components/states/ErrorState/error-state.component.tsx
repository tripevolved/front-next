import type { StateTemplateProps } from "@/ui";
import { StateTemplate } from "@/ui";

const DEFAULT_IMAGE = "/assets/states/error-state.svg";

export function ErrorState(props: StateTemplateProps) {
  return (
    <StateTemplate image={DEFAULT_IMAGE} {...props} />
  );
}
