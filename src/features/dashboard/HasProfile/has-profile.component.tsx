import type { TravelerProfileType } from "@/core/types";

import { Text, MediaObject } from "@/ui";

export const PROFILE_NAMES: Record<TravelerProfileType, string> = {
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
  return (
    <section className="has-profile">
      <Text className="color-text-secondary mb-lg">Seu perfil de viajante é...</Text>
      <MediaObject
        image={`/assets/perfil/${travelerProfile}.svg`}
        heading={{
          size: "sm",
          as: "h3",
          children: PROFILE_NAMES[travelerProfile],
        }}
      />
    </section>
  );
}
