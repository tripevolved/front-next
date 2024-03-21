import { Box, Text, Picture, CardHighlight } from "@/ui";

import { Card, Grid, Icon, Label } from "mars-ds";

import { TripStayServiceItem } from "@/features";
import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { TripStayHighlight, TripStayHighlightFeature, TripStayListCuratedItem } from "@/core/types";

export function CuratedStayListItem({
  curatedStay
}: { curatedStay: TripStayListCuratedItem }) {
  return (
    <Card className="curated-stay-list-item">
      <Grid className="pl-lg">
        <Grid columns={{ sm: 1, md: 2 }}>
          <Box className="curated-stay-list-item__features">
            {curatedStay.features && curatedStay.features.map((feature, index) => <Label key={index}>{feature.title}</Label>)}
          </Box>
          <Box className="curated-stay-list-item__recommendation-header">
            <Text style={{justifySelf: "flex-end"}}>Recomendado pela Trip Evolved</Text>
            <Icon name="check-circle" />
          </Box>
        </Grid>
        <Grid columns={{ sm: 1, md: ["180px", "auto"] }}>
          <Picture className="itinerary-item__content__image">
            {curatedStay.coverImage ? parsePhoto(curatedStay.coverImage) : "/assets/blank-image.png"}
          </Picture>
          <div>
            <div className="w-100 flex-column itinerary-item__content__break">
              <Grid gap={4}>
                <Text as="h3" size="xl">
                  <strong>{curatedStay.name}</strong>
                </Text>                  
                <Text style={{ marginTop: 0, color: "var(--color-brand-4)" }}>{curatedStay.tags}</Text>
                {curatedStay.services && (
                  <div className="trip-stay-details__content__service-list">
                    {curatedStay.services.map((service, i) => {
                      return <TripStayServiceItem {...service} key={i} />
                    })}
                  </div>
                )}
              </Grid>
            </div>
          </div>
        </Grid>
        {curatedStay.highlight ? <HighlightSection highlight={curatedStay.highlight} /> : null}
      </Grid>
    </Card>
  );
}

const DESCRIPTION_MAP: Record<TripStayHighlightFeature, string> = {
  clean: "Essa hospedagem é recomendada por sua limpeza sempre impecável.",
  comfort: "Pode esperar conforto em sua hospedagem!",
  location: "A localização é o ponto alto dessa hospedagem!",
  luxury: "Curte luxo? Essa hospedagem não vai te decepcionar.",
  personnel: "O atendimento por aqui é espetacular!",
  rustic: "Lugar bastante rústico.",
};

const HighlightSection = ({ highlight }: { highlight: TripStayHighlight }) => {
  const description = highlight.type
    ? DESCRIPTION_MAP[highlight.type]
    : highlight.description || "";
  return (
    <Box className="trip-stay-highlight-box">
      <Grid columns={highlight.type ? ["32px", "auto"] : [1]}>
        {highlight.type ? (
          <Picture
            className="trip-stay-highlight-box__content__icon"
            src={`/assets/stays/${highlight.type}.png`}
          />
        ) : null}
        <Text as="h3" heading size="xs">
          {description}
        </Text>
      </Grid>
    </Box>
  );
};