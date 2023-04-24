import type { OptionFieldProps } from "./option-field.types";

import { makeClassName } from "@/helpers/classname.helpers";
import { generateHash } from "@/helpers/random.helpers";

import { useMemo } from "react";
import { Text } from "@/components";

export function OptionField({
  className,
  children,
  sx,
  checked = false,
  label,
  multiselect,
  onCheck,
  value,
  disabled,
  id: inheritedId,
  ...props
}: OptionFieldProps) {
  const cn = makeClassName("option-field", {
    "option-field--is-multiselect": multiselect,
    "option-field--is-checked": checked,
    "option-field--is-disabled": disabled,
  })(sx);

  const handleClick = () => onCheck?.(value);

  const id = useMemo(() => inheritedId || generateHash("option-field"), [inheritedId]);

  return (
    <div className={cn} {...props}>
      <input
        id={id}
        type="checkbox"
        value={value}
        defaultChecked={checked}
        disabled={disabled}
        onClick={handleClick}
      />
      <label htmlFor={id} className="option-field__label">
        <span className="option-field__state" data-checked={checked} />
        <Text>{label}</Text>
      </label>
    </div>
  );
}
