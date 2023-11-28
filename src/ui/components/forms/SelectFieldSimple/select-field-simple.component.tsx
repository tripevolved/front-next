import { makeCn } from "@/utils/helpers/css.helpers";
import type { SelectFieldSimpleProps } from "../SelectFieldSimple/select-field-simple.types";
import { Icon } from "mars-ds";
import { useRef } from "react";

export const SelectFieldSimple = ({
  onChange,
  onValueChange,
  value: inheritedValue,
  defaultValue: inheritedDefaultValue,
  options = [],
  label,
  ...props
}: SelectFieldSimpleProps) => {
  const fieldSetRef = useRef<HTMLFieldSetElement>(null);
  const defaultValue = String(inheritedValue || inheritedDefaultValue) || "";
  const validDefaultValue = options.find((option) => option.value === defaultValue);

  const cn = makeCn("select-field-simple", {
    "select-field-simple--filled": !!validDefaultValue,
  })();

  const setFilled = (remove = false) => {
    if (!fieldSetRef.current) return;
    fieldSetRef.current.classList[remove ? "remove" : "add"]("select-field-simple--filled");
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(event);
    onValueChange?.(event.target.value);
    setFilled();
  };

  return (
    <fieldset ref={fieldSetRef} className={cn}>
      <legend className="select-field-simple__legend">{label}</legend>
      <Icon name="chevron-down" />
      <select {...props} defaultValue={defaultValue} onChange={handleChange}>
        <option hidden value="">
          {label}
        </option>
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </fieldset>
  );
};
