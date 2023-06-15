import { Picture, Text, Button } from "@/ui";
import type { NoProfileProps } from "./no-profile.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function NoProfile({ className, children, sx, ...props }: NoProfileProps) {
  const cn = makeCn("no-profile", className)(sx);

  const text =
    "Separamos algumas perguntas para entender o perfil de viagem ideal para você. Responda a seguir e descubra nossas recomendações de destinos.";

  return (
    <div className={cn} {...props}>
      <Picture src="/emoji/target-arrow.png" />

      <Text
        as="h2"
        variant="heading"
        style={{ textAlign: "center", marginBottom: 14, fontWeight: 700 }}
      >
        Perfil do Viajante
      </Text>

      <Text className="no-profile__text" style={{ textAlign: "center", padding: "0 30px" }}>
        {text}
      </Text>

      <Button variant="custom">Descobrir meu perfil de Viajante </Button>
    </div>
  );
}
