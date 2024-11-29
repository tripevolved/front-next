interface Props {
  onClick: () => void;
  checked: boolean;
  label: string;
  checkedColor?: string;
}
export const Checkbox = ({
  checked,
  label,
  onClick,
  checkedColor = "var(--color-brand-2)",
}: Props) => {
  const checkedIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path d="M4.78271 9.13048L8.26098 12.6087L15.2175 5.65222" stroke="white" />
    </svg>
  );

  const uncheckedIcon = (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9.5" cy="9.5" r="9" stroke="currentColor" />
    </svg>
  );
  return (
    <div
      role="checkbox"
      onClick={onClick}
      aria-checked={checked}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        gap: "12px",
        alignItems: "center",
        fontWeight: checked ? "bold" : "normal",
        color: checked ? checkedColor : "var(--color-gray-2)",
      }}
    >
      {checked ? checkedIcon : uncheckedIcon}
      <label style={{ cursor: "pointer" }}>{label}</label>
    </div>
  );
};
