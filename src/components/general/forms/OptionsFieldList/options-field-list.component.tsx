import { Grid } from "mars-ds";
import type { OptionsFieldListProps } from "./options-field-list.types";

import { makeClassName } from "@/helpers/classname.helpers";
import { useEffect, useState } from "react";
import { OptionField, OptionFieldProps } from "@/components";

export function OptionsFieldList({
  className,
  children,
  sx,
  options = [],
  multiselect,
  onCheck,
  disabled,
  defaultValue,
  ...props
}: OptionsFieldListProps) {
  const [value, setValue] = useState<string | string[] | null>(defaultValue || null);

  useEffect(() => {
    if (defaultValue) setValue(defaultValue)
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

  const cn = makeClassName("options-field-list", className)(sx);

  return (
    <Grid gap={16} className={cn} {...props}>
      {options.map((item) => (
        <OptionField
          key={item.value}
          {...item}
          disabled={disabled}
          checked={isChecked(item)}
          multiselect={multiselect}
          onCheck={handleCheck}
        />
      ))}
    </Grid>
  );
}
