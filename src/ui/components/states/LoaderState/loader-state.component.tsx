import type { StateTemplateProps } from "@/ui";
import { GlobalLoader, Text } from "@/ui";

export function LoaderState({
  heading,
  text = "Carregando...",
}: Pick<StateTemplateProps, "heading" | "text">) {
  return (
    <section className="state-template">
      <div>
        <GlobalLoader inline />
        {heading ? (
          <Text heading as="h4" size="xs">
            {heading}
          </Text>
        ) : null}
        <Text>{text}</Text>
      </div>
    </section>
  );
}
