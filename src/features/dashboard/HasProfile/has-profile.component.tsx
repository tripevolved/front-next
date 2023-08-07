import type { TravelerProfileType } from "@/core/types";

import { Text, MediaObject } from "@/ui";

export const PROFILE_NAMES: Record<TravelerProfileType, string> = {
  "musicalidade": "Musicalidade",
  "agitador": "Agitador",
  "alternativo": "Alternativo",
  "automatico": "Automático",
  "aventureiro": "Aventureiro",
  "colecionador-de-pulseirinha": "Colecionador de Pulseirinha",
  "dinamico": "Dinamico",
  "espiritual": "Espiritual",
  "fa-da-rotina": "Fã da Rotina",
  "garantido": "Garantido",
  "gastronomico": "Gastronômico",
  "insaciavel": "Insaciável",
  "intelectual": "Intelectual",
  "negocios": "Negócios",
  "relax": "Relax",
  "so-se-vive-uma-vez": "Só se vive uma vez",
};

export function HasProfile({ travelerProfile }: { travelerProfile: TravelerProfileType }) {
  // This line ensure not break traveler profiler if new type added
  const key: TravelerProfileType = PROFILE_NAMES[travelerProfile] ? travelerProfile : "relax";
  return (
    <section className="has-profile">
      <Text className="color-text-secondary mb-lg">Seu perfil de viajante é...</Text>
      <MediaObject
        image={`/assets/perfil/${key}.svg`}
        heading={{
          size: "sm",
          as: "h3",
          children: PROFILE_NAMES[key],
        }}
      />
    </section>
  );
}
