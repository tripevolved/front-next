import { jsonToString, toJson } from "@/utils/helpers/json.helpers";
import { useLocalStorage } from "@/utils/hooks/local-storage.hooks";
import { useState, useEffect } from "react";

import { CreateTripDto } from "@/services/api/trip/create";
import {
  QuestionDatePicker,
  QuestionSlider,
} from "@/features";
import { TripConfigurationProps } from "./trip-configuration.types";
import { SectionBase, Picture, DashedDivider, Button } from "@/ui";
import { Card } from "mars-ds";

export const TripConfigurationSet = ({ onSubmit, ...props }: TripConfigurationProps) => {
  const [localCreateTrip, setLocalCreateTrip] = useLocalStorage("create-trip");
  const [createTrip, setCreateTrip] = useState<CreateTripDto>({
    tripBehavior: {},
  } as CreateTripDto);

  const handleSlider = (dataType: "CURRENCY" | "DAYS" | undefined) => (value: number) => {
    setCreateTrip((state: any) => {
      const tripInfo = state as CreateTripDto;

      if (dataType === undefined) return tripInfo;

      if (dataType === "CURRENCY") createTrip.maxBudget = value;
      else createTrip.days = value;

      setLocalCreateTrip(jsonToString(tripInfo));
      return tripInfo;
    });
  };

  const handleDateChange = () => (value: [Date, Date]) => {
    setCreateTrip((state: any) => {
      const tripInfo = state as CreateTripDto;
    
      tripInfo.dates = value;

      setLocalCreateTrip(jsonToString(tripInfo));
      return tripInfo;
    });
  };

  useEffect(() => {
    const initialCreateTrip = toJson(localCreateTrip);
    if (initialCreateTrip) setCreateTrip(initialCreateTrip as CreateTripDto);
    else {
      var tripInfo = {} as CreateTripDto;
      setLocalCreateTrip(jsonToString(tripInfo));
      setCreateTrip(tripInfo);
    }
  }, [localCreateTrip]);

  return (
    <SectionBase className="profile-questions" container={"xs" as any} {...props}>
      <Picture
        className="profile-questions__brand"
        height={60}
        width={60}
        src="/brand/logo-symbol.svg"
      />
      <Card className="profile-questions__card">
        <QuestionDatePicker
          title="Em qual período pode viajar?"
          disabled={false}
          dates={createTrip.dates}
          onSet={handleDateChange()}
        />
        <DashedDivider />
        <QuestionSlider
          title="Quanto tempo pretende ficar no destino?"
          disabled={false}
          minValue={1}
          maxValue={15}
          step={1}
          dataType={"DAYS"}
          defaultValue={createTrip.days ? createTrip.days : 3}
          onSet={handleSlider("DAYS")}
        />
        <DashedDivider />
        <QuestionSlider
          title="Até quanto pode gastar ao total?"
          disabled={false}
          minValue={500}
          maxValue={10000}
          step={100}
          dataType={"CURRENCY"}
          defaultValue={createTrip.maxBudget ? createTrip.maxBudget : 4000}
          onSet={handleSlider("CURRENCY")}
        />
        <DashedDivider />
        <Button onClick={onSubmit}>Próxima</Button>
      </Card>
    </SectionBase>
  );
};
