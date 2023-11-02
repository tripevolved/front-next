import type { StateTemplateProps } from "@/ui";
import { StateTemplate } from "@/ui";

const DEFAULT_IMAGE = "/assets/states/success-state.svg";

export function SuccessState(props: StateTemplateProps) {
  return (
    <StateTemplate image={DEFAULT_IMAGE} text="Tudo certo!" {...props} />
  );
}
