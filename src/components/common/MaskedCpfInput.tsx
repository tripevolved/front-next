"use client";

/**
 * CPF input: only numbers are stored/edited; dots and hyphen are display mask (000.000.000-00).
 * Value and onChange use digits only (max 11).
 */
function formatCpfDisplay(digits: string): string {
  const d = digits.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

export interface MaskedCpfInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: string;
  onChange: (digits: string) => void;
}

export function MaskedCpfInput({
  value,
  onChange,
  className,
  placeholder = "000.000.000-00",
  ...rest
}: MaskedCpfInputProps) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const display = formatCpfDisplay(digits);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const next = raw.replace(/\D/g, "").slice(0, 11);
    onChange(next);
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      autoComplete="off"
      value={display}
      onChange={handleChange}
      className={className}
      placeholder={placeholder}
      maxLength={14}
      {...rest}
    />
  );
}
