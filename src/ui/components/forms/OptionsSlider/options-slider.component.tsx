import { Grid, Slider } from "mars-ds";
import type { OptionsSliderProps } from "./options-slider.types";

import { useEffect, useState } from "react";

export function OptionsSlider({
  min,
  max,
  step,
  formatter,
  className,
  children,
  onSelect,
  disabled,
  defaultValue,
  ...props
}: OptionsSliderProps) {
  const [value, setValue] = useState<number | null>(defaultValue || null);

  useEffect(() => {
    if (defaultValue) setValue(defaultValue)
  }, [defaultValue]);

  const handleSelect = (newValue: number) => {
    setValue(newValue);
    onSelect?.(newValue);
    return;
  };

  return (
    <Grid gap={16} {...props}>
      <Slider
        min={min}
        max={max}
        step={step}
        formatter={formatter}
        className={className}
        onSelect={handleSelect}
        disabled={disabled}
      />
    </Grid>
  );
}
