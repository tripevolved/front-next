import { Box, Text } from "@/ui";
import type { TripConfigurationProps } from "./trip-configuration.types";
import { FeatureIcon } from "@/ui";
import { QuestionDatePicker } from "@/features/questions/QuestionDatePicker";
import { DatePicker, OptionsSlider } from "@/ui";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Link, Grid } from "mars-ds";
import { useEffect } from "react";

export function TripConfiguration({ className, title, dates, onSet, disabled, sx, ...props }: TripConfigurationProps) {
  const cn = makeCn("trip-configuration", className)(sx);

  return (
    <main className="profile-questions__group mb-lg">
      <Grid className="profile-questions-item" gap={24}>
        <div className="mb-lg profile-questions-item__header">
          <Text heading size="xs">
            {title}
          </Text>
        </div>
        <Grid gap={16} className="profile-questions-item__answers">
            <DatePicker
              dates={dates}
              onSet={onSet}
              disabled={disabled}
            />
        </Grid>
      </Grid>
      <Grid className="profile-questions-item" gap={24}>
        <div className="mb-lg profile-questions-item__header">
          <Text heading size="xs">
            {title}
          </Text>
        </div>
        <Grid gap={16} className="profile-questions-item__answers">
          {/* <OptionsSlider
            min={minValue ?? 1}
            max={maxValue ?? 500000}
            formatter={formatSlider}
            step={step}
            defaultValue={defaultValue}
            onSelect={onSet}
            disabled={disabled}
          /> */}
        </Grid>
      </Grid>
    </main>
  );
}
