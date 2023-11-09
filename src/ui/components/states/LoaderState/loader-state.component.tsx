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
          <Text heading as="h4" size="xs" className="mb-sm">
            {heading}
          </Text>
        ) : null}
        <Text className="color-text-secondary">{text}</Text>
      </div>
    </section>
  );
}
