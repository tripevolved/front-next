import { Box, Picture, Text } from "@/ui";
import { TripScriptDayDetail } from "@/core/types";
import { Link, Modal } from "mars-ds";

interface TripScriptPreviewDetailedDayProps {
  details: TripScriptDayDetail;
}

export const TripScriptDetailedDay = ({ details }: TripScriptPreviewDetailedDayProps) => {
  const handleClick = () => {
    Modal.open(
      () => (
        <Box className="trip-script-preview-detailed-day__modal">
          <div className="trip-script-preview-detailed-day__modal__container">
            {details.periods.map((period, i) => {
              return (
                <div className="trip-script-preview-detailed-day__modal__container__item" key={i}>
                  <Text
                    size="lg"
                    className="trip-script-preview-detailed-day__modal__container__item__title"
                  >
                    <span style={{ fontSize: 22, color: "var(--color-brand-1)" }}>&#x2022;</span>{" "}
                    {period.title}
                  </Text>
                  {period.actions.map((action, j) => {
                    return (
                      action.isSelected && (
                        <Box
                          className="trip-script-preview-detailed-day__modal__container__item__action"
                          key={j}
                        >
                          <Box className="trip-script-preview-detailed-day__modal__container__item__action__header">
                            <Picture
                              className="trip-script-preview-detailed-day__modal__container__item__action__header__icon"
                              src={`/assets/script/${action.iconSlug}.svg`}
                            />
                            <Box className="trip-script-preview-detailed-day__modal__container__item__action__header__content">
                              <Text
                                size="md"
                                className="trip-script-preview-detailed-day__modal__container__item__action__header__content__title"
                              >
                                {action.title}
                              </Text>
                              <Text
                                size="xs"
                                className="trip-script-preview-detailed-day__modal__container__item__action__header__content__subtitle"
                              >
                                {action.subtitle}
                              </Text>
                            </Box>
                          </Box>
                          <Text
                            size="xs"
                            className="trip-script-preview-detailed-day__modal__container__item__action__description"
                          >
                            {action.tooltip}
                          </Text>
                        </Box>
                      )
                    );
                  })}
                </div>
              );
            })}
          </div>
        </Box>
      ),
      {
        size: "sm",
        closable: true,
      }
    );
  };

  return <Link onClick={() => handleClick()}>Ver detalhes do dia</Link>;
};
