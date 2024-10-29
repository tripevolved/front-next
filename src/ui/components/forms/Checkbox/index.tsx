import { Picture } from "../../basic/Picture";

interface Props {
  onClick: () => void;
  checked: boolean;
  label: string;
}
export const Checkbox = ({ checked, label, onClick }: Props) => {
  const checkedIcon = <Picture src="/assets/checkbox/checked.svg" />;
  const uncheckedIcon = <Picture src="/assets/checkbox/unchecked.svg" />;
  return (
    <div
      role="checkbox"
      onClick={onClick}
      aria-checked={checked}
      style={{
        cursor: "hover",
        display: "flex",
        flexDirection: "row",
        gap: "12px",
        alignItems: "center",
        fontWeight: checked ? "bold" : "normal",
        color: checked ? "var(--color-brand-2)" : "var(--color-gray-2)",
      }}
    >
      {checked ? checkedIcon : uncheckedIcon}
      <label>{label}</label>
    </div>
  );
};
