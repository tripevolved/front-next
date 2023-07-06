import { Box, Picture, Text, DashedDivider, Button } from "@/ui";
import type { HasProfileProps } from "./has-profile.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { DestinationsCarousel } from "@/features";

export function HasProfile({ className, children, sx, profileType, ...props }: HasProfileProps) {
  const cn = makeCn("has-profile", className)(sx);

  return (
    <Box className={cn} {...props}>
      <Text className="has-profile__text-title">Seu perfil de viajante é...</Text>
      <Box className="has-profile__image-container">
        <Box className="has-profile__image-container__image-circle">
          <Picture src={`/assets/perfil/${profileType}.svg`} />
        </Box>
      </Box>
      <Text variant="heading" className="has-profile__text-profile">
        {profileType == "agitador" && "Agitador"}
        {profileType == "alternativo" && "Alternativo"}
        {profileType == "automatico" && "Automático"}
        {profileType == "aventureiro" && "Aventureiro"}
        {profileType == "colecionador-de-pulseirinha" && "Colecionador de Pulseirinha"}
        {profileType == "dinamico" && "Dinamico"}
        {profileType == "espiritual" && "Espiritual"}
        {profileType == "fa-da-rotina" && "Fã da Rotina"}
        {profileType == "garantido" && "Garantido"}
        {profileType == "gastronomico" && "Gastronômico"}
        {profileType == "insaciavel" && "Insaciável"}
        {profileType == "intelectual" && "Intelectual"}
        {profileType == "negocios" && "Negócios"}
        {profileType == "relax" && "Relax"}
        {profileType == "so-se-vive-uma-vez" && "Só se vive uma vez"}
      </Text>
      <DashedDivider />
      <Button className="has-profile__cta">Descobrir minha trip</Button>
      <DestinationsCarousel recommendedDestinations={[]} title="Destinos que você pode gostar:" />
    </Box>
  );
}
