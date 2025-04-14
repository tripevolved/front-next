import { ItemButton } from "mars-ds";
import { MultiSelectBubbleFieldProps } from "./multi-select-field.types";

export function MultiSelectBubbleField({
  label,
  onClick,
  selected,
  disabled,
}: MultiSelectBubbleFieldProps) {
  return (
    <button
      disabled={disabled && !selected}
      className="multi__select__bubble__field__button"
      style={{
        cursor: disabled && !selected ? "default" : "pointer",
        color: selected ? "#fff" : !disabled ? "#000" : "#d7dade",
        backgroundColor: selected ? "#1a365d" : "#fff",
        border: `1px solid ${selected ? "#1a365d" : "#d7dade"}`,
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
