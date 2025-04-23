import { Text, Picture } from "@/ui";
import type { StayCheckoutModalProps } from "./stay-checkout-modal.types";
import { Card, CardElevations, Divider, Grid } from "mars-ds";
import { toFullDate, toFullDetailedDate } from "@/utils/helpers/dates.helpers";

export function StayCheckoutModal({ details }: StayCheckoutModalProps) {
  return (
    <>
      <Text size="sm" heading className="trip-stay-checkout__header">
        Detalhes da hospedagem
      </Text>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        {details.map((stay, i) => {
          return (
            <>
              <div>
                <Text size="xs" heading className="trip-stay-checkout__title">
                  {`Hospedagem ${i + 1}`}
                </Text>
                <Card elevation={CardElevations.Low} className="trip-stay-checkout" key={i}>
                  <Grid columns={["25%", "auto"]}>
                    <Picture src={stay.coverImageUrl || "/assets/blank-image.png"} />
                    <div>
                      <Text as="h3" size="lg">
                        {stay.name}
                      </Text>
                      <Text style={{ marginTop: 0, color: "var(--color-brand-4)" }}>
                        {stay.tags}
                      </Text>
                    </div>
                  </Grid>
                  <TripStayCheckoutSection
                    title={"Check-in"}
                    text={toFullDetailedDate(stay.checkIn) ?? ""}
                  />
                  <TripStayCheckoutSection
                    title={"Check-out"}
                    text={toFullDetailedDate(stay.checkOut) ?? ""}
                  />
                  {stay.guests && (
                    <TripStayCheckoutSection title={"Hóspedes"} text={`${stay.guests}`} />
                  )}
                  {stay.boardInfo && (
                    <>
                      <TripStayCheckoutSection title={"Quarto"} text={stay.boardInfo.roomName} />
                      {stay.boardInfo.boardChoice && (
                        <TripStayCheckoutSection
                          title={"Incluído"}
                          text={stay.boardInfo.boardChoice}
                        />
                      )}
                    </>
                  )}
                  {stay.rules && stay.rules.length > 0 && (
                    <>
                      <Divider className="trip-stay-checkout__divider" />
                      <div className="trip-stay-checkout__section">
                        <Text size="xl" className="trip-stay-checkout__section__title">
                          <strong>Serviços da acomodação</strong>
                        </Text>
                        {stay.rules.map((rule, i) => {
                          return (
                            <Text size="md" className="trip-stay-checkout__section__text" key={i}>
                              &#x2022; {rule}
                            </Text>
                          );
                        })}
                      </div>
                    </>
                  )}
                </Card>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

const TripStayCheckoutSection = ({ title, text }: { title: string; text: string }) => {
  return (
    <div className="trip-stay-checkout__section">
      <Text size="xl" className="trip-stay-checkout__section__title">
        <strong>{title}</strong>
      </Text>
      <Text size="md" className="trip-stay-checkout__section__text">
        {text}
      </Text>
    </div>
  );
};
