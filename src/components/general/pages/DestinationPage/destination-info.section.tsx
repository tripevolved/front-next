import { Box, Picture, SectionBase } from "@/components";
import { DestinationProps } from "./destination-page.types";
import { Grid, Heading, Text } from "mars-ds";
import { toLowerCase } from "@/helpers/strings.helper";

interface DestinationInfoSectionProps
  extends Pick<DestinationProps, "features" | "recommendedBy"> {}

export const DestinationInfoSection = ({
  features,
  recommendedBy,
}: DestinationInfoSectionProps) => {
  return (
    <SectionBase columns={{ md: [2, 1] }} gap={20}>
      <DestinationInfoFeatures features={features} />
      <DestinationInfoRecommendedBy recommendedBy={recommendedBy} />
    </SectionBase>
  );
};

const DestinationInfoFeatures = ({ features }: Pick<DestinationProps, "features">) => {
  return (
    <SectionBase
      sx={{ padding: "24px", border: "1px dashed var(--color-brand-4)", borderRadius: "10px" }}
    >
      <Heading
        level={5}
        size={"md"}
        html={"<strong>Destaques do destino</strong>"}
        className="mb-xl"
      />
      {features &&
        features.map(({ title, description, icon }, key) => (
          <Grid columns={"0.5fr 2.5fr"} gap={1} key={key}>
            {icon ? (
              <Picture>{icon}</Picture>
            ) : (
              <Picture>{"/assets/destino/atracoes-culturais.png"}</Picture>
            )}
            <div className="mb-md">
              <Heading
                size="xxs"
                level="4"
                html={`<strong>${title}</strong>`}
                style={{ color: "var(--color-brand-4)" }}
              />
              <Text className="mt-md" html={description} />
            </div>
          </Grid>
        ))}
    </SectionBase>
  );
};

const DestinationInfoRecommendedBy = ({
  recommendedBy,
}: Pick<DestinationProps, "recommendedBy">) => {
  return (
    <SectionBase>
      <Grid columns={"0.5fr 2.5fr"} gap={23} className="mb-xl">
        {recommendedBy.photo ? (
          <Picture>{recommendedBy.photo}</Picture>
        ) : (
          <Picture>{"/assets/destino/profile.png"}</Picture>
        )}
        <div>
          <Text
            size="md"
            html="<strong>Destino indicado por</strong>"
            style={{ color: "var(--color-brand-1)" }}
          />
          <Text
            size="md"
            html={toLowerCase(`@${recommendedBy.name}`)}
            style={{ color: "var(--color-brand-2)" }}
          />
        </div>
      </Grid>
      <Text size="lg" html={`"${recommendedBy.recommendationText}"`} />
    </SectionBase>
  );
};
