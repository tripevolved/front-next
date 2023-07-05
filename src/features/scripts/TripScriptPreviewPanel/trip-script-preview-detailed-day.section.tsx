import { Box, CardHighlight, Picture, SectionBase, Text, FeatureIcon } from "@/ui";
import { TripScriptDayDetail } from "@/core/types";
import { useState } from "react";
import { Link } from "mars-ds";

interface TripScriptPreviewDetailedDayProps {
  details: TripScriptDayDetail;
}

export const TripScriptPreviewDetailedDay = ({ details }: TripScriptPreviewDetailedDayProps) => {
  const [show, setShow] = useState(false);

  return (
    <SectionBase>
      <Link onClick={() => setShow(!show)}>Ver detalhes do dia</Link>
      {show && (
        <>
        {details.periods.map((period, i) => {
          return (
            <>
              <Box className="trip-script-day-section__header">
                <Text size="lg" className="trip-script-day-section__title">
                  {period.title}
                </Text>
              </Box>
              {period.actions.map((action, j) => {
                return (
                  <>
                    <CardHighlight className="trip-detailed-day">
                      <CardHighlight className="trip-script-action" style={{ padding: "17px 10px" }}>
                        <FeatureIcon name={action.iconSlug} />
                        <Box className="trip-script-action__box">
                          <Text size="lg" className="trip-script-action__title">
                            {action.title}
                          </Text>
                          <Text size="md" className="trip-script-action__subtitle">
                            {action.subtitle}
                          </Text>
                        </Box>
                      </CardHighlight>
                      <Text heading size="xs" className="trip-stay-highlight-box__title">
                        {action.tooltip}
                      </Text>
                    </CardHighlight>
                  </>
                )
              })}
            </>
          );
        })}
        </>
      )}
    </SectionBase>
  );
};
