import { MediaObject } from "@/ui";

export function NoProfile() {
  return (
    <MediaObject
      className="no-profile"
      image="/emoji/target-arrow.png"
      heading="Perfil do viajante"
      text="Separamos algumas perguntas para entender o perfil de viagem ideal para você. Responda a seguir e descubra nossas recomendações de destinos."
      cta={{
        label: "Descobrir meu perfil de Viajante",
        href: "/perfil/perguntas",
        backgroundColor: "var(--color-brand-2)",
        color: "white",
      }}
    />
  );
}
