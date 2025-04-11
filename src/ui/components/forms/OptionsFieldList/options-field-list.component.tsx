import { Grid } from "mars-ds";
import type { OptionsFieldListProps } from "./options-field-list.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { useEffect, useState } from "react";
import { OptionField, OptionFieldProps } from "@/ui";
import { OptionFieldTwo } from "../OptionField2";

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

  const options2 = [
    "Bom hotel",
    "Comida local",
    "Aventura",
    "Natureza",
    "Pontos turísticos",
    "Festa",
    "Cultura local",
    "Descanso",
    "Trilha",
    "Restaurantes",
    "Piscina",
    "Cultura",
  ];

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

  const toggleFilter = (category: string) => {
    setSelectedFilters((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
    );
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
            gap: 16,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {options2.map((item) => (
            <button
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: disabled ? "not-allowed" : "pointer",

                padding: "10px",
                borderRadius: 50,
                justifyContent: "center",
                background: "none",
                color: selectedFilters.includes(item) ? "#fff" : "#000",
                backgroundColor: selectedFilters.includes(item) ? "#1a365d" : "#fff",
                border: `1px solid ${selectedFilters.includes(item) ? "#1a365d" : "#d7dade"}`,
              }}
              onClick={() => toggleFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </Grid>
  );
}
