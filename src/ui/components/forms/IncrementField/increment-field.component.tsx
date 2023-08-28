import { Grid, ToggleButton } from "mars-ds";
import { Text } from "@/ui";
import { useEffect, useMemo, useState } from "react";
import { makeCn } from "@/utils/helpers/css.helpers";
import { IncrementFieldProps } from "./increment-field.types";

export const IncrementField = ({
  step = 1,
  min = 1,
  max = 4,
  defaultValue = 2,
  value: inheritedValue,
  onSelect,
  name,
  disabled,
  className,
  formatter,
}: IncrementFieldProps) => {
  const [value, setValue] = useState(inheritedValue || defaultValue);
  const cn = makeCn("text-center align-items-center", className)();

  const increment = () => {
    const nextValue = value + step;
    if (nextValue <= max) {
      setValue(nextValue);
      onSelect?.(nextValue);
    }
  };

  const decrease = () => {
    const nextValue = value - step;
    if (nextValue >= min) {
      setValue(nextValue);
      onSelect?.(nextValue);
    }
  };

  useEffect(() => {
    if (typeof inheritedValue === "number") {
      const nextValue = inheritedValue > max ? max : inheritedValue < min ? min : inheritedValue;
      if (nextValue !== value) setValue(nextValue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inheritedValue]);

  const computedValue = useMemo(() => {
    if (typeof formatter !== "function") return value;
    return formatter(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Grid columns="48px 1fr 48px" className={cn}>
      <ToggleButton iconName="minus" onClick={decrease} disabled={disabled || value === min} />
      <Text className="color-primary" size="xl">
        {computedValue}
      </Text>
      <ToggleButton iconName="plus" onClick={increment} disabled={disabled || value === max} />
      <input type="hidden" name={name} value={value} />
    </Grid>
  );
};
