import type { StepComponentProps } from "@/features";

import { Text } from "@/ui";
import { Button, Grid, Image, Slider } from "mars-ds";

import { useState } from "react";

const SCRIPT_BUILDER_TRIP_TYPE = {
  title: "Para começar, que tipo de viagem você quer?",
  subtitle:
    "Essa informação nos ajuda a entender se seus dias serão mais cheios e também que tipo de experiências você precisa.",
};

export function TripTypeStep({ onNext }: StepComponentProps) {
  const { title, subtitle } = SCRIPT_BUILDER_TRIP_TYPE;
  const [relaxPartyLevel, setRelaxPartyLevel] = useState(0);

  const handleRelaxPartyLevel = (value: number) => {
    setRelaxPartyLevel(value);
  };

  return (
    <Grid className="trip-script-builder-step">
      <Image src={"/assets/script/trip-type.svg"} alt="target" width={185} height={172} className="trip-script-builder-step__image"/>
      <Text heading size="sm" className="trip-script-builder-step__item">
        {title}
      </Text>
      <div className="trip-script-builder-slider">
        <Slider
          name="relaxPartyLevel"
          formatter={() => ""}
          min={-1}
          max={1}
          value={relaxPartyLevel}
          defaultValue={relaxPartyLevel}
          onSelect={handleRelaxPartyLevel}
          step={0.01}
        />
        <div className="trip-script-builder-slider__text">
          <span className="trip-script-builder-slider__text__left">+Relax</span>
          <span className="trip-script-builder-slider__text__right">+Agito</span>
        </div>
      </div>
      <Text className="trip-script-builder-step__item">{subtitle}</Text>
      <Button className="trip-script-builder-step__item" onClick={() => onNext({ relaxPartyLevel })}>Avançar</Button>
    </Grid>
  );
}
