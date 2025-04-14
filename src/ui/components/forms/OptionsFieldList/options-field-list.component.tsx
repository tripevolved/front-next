import { Grid } from "mars-ds";
import type { OptionsFieldListProps } from "./options-field-list.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { useEffect, useState } from "react";
import { OptionField, OptionFieldProps } from "@/ui";
import { MultiSelectBubbleField } from "../MultiSelectField/multi-select-field.component";

export function OptionsFieldList({
  className,
  children,
  sx,
  multiselect,
  onCheck,
  options = [],
  disabled,
  defaultValue,
  title,
  ...props
}: OptionsFieldListProps) {
  const [value, setValue] = useState<string | string[] | null>(defaultValue || null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
  }, [defaultValue]);

  const handleCheck = (newValue: string) => {
    if (!multiselect) {
      setValue(newValue);
      onCheck?.(newValue);
      return;
    }

    const currentValue = Array.isArray(value) ? value : [];
    const hasValue = currentValue.includes(newValue);

    const nextValue = hasValue
      ? currentValue.filter((item) => item !== newValue)
      : currentValue.concat(newValue);

    setValue(nextValue);
    onCheck?.(nextValue);
  };

  const isChecked = (item: OptionFieldProps) => {
    if (!multiselect) return item.value === value;
    return Array.isArray(value) && value.includes(item.value);
  };

  const toggleFilter = (category: OptionFieldProps) => {
    const label = category.label as string;
    setSelectedFilters((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
    handleCheck(category.value);
  };

  const isObjectiveFlightQuestions = title?.includes("objetivo");

  const cn = makeCn("options-field-list", className)(sx);

  return (
    <Grid gap={16} className={cn} {...props}>
      {!isObjectiveFlightQuestions &&
        options.map((item) => (
          <OptionField
            key={item.value}
            {...item}
            disabled={disabled}
            checked={isChecked(item)}
            multiselect={multiselect}
            onCheck={handleCheck}
          />
        ))}
      {isObjectiveFlightQuestions && (
        <div
          style={{
            display: "flex",
            gap: 19,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {options.map((item) => {
            const label = item.label as string;
            const isSelected = selectedFilters.includes(label);
            return (
              <MultiSelectBubbleField
                key={item.value}
                disabled={selectedFilters.length >= 5}
                selected={isSelected}
                onClick={() => toggleFilter(item)}
                label={label}
              />
            );
          })}
        </div>
      )}
    </Grid>
  );
}
