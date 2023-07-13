import type { StateTemplateProps } from "@/ui";
import { StateTemplate } from "@/ui";

const DEFAULT_TEXT = "Este conteúdo não foi encontrado :(";
const DEFAULT_IMAGE = "/assets/states/empty-state.svg";

export function EmptyState(props: StateTemplateProps) {
  return (
    <StateTemplate image={DEFAULT_IMAGE} text={DEFAULT_TEXT} {...props} />
  );
}
