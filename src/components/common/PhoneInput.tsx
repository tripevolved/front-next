"use client";

/**
 * Phone input with Brazilian mask (XX) XXXXX-XXXX. Only numbers are stored; parentheses, space and hyphen are display mask.
 * Value and onChange use digits only (max 11 for Brazilian number).
 * Optional country code selector (same as LeadForm).
 */

export const PHONE_COUNTRY_CODES = [
  { code: "+55", country: "Brasil", flag: "🇧🇷" },
  { code: "+1", country: "Estados Unidos", flag: "🇺🇸" },
  { code: "+1", country: "Canadá", flag: "🇨🇦" },
  { code: "+351", country: "Portugal", flag: "🇵🇹" },
  { code: "+34", country: "Espanha", flag: "🇪🇸" },
  { code: "+33", country: "França", flag: "🇫🇷" },
  { code: "+39", country: "Itália", flag: "🇮🇹" },
  { code: "+49", country: "Alemanha", flag: "🇩🇪" },
  { code: "+44", country: "Reino Unido", flag: "🇬🇧" },
  { code: "+54", country: "Argentina", flag: "🇦🇷" },
  { code: "+56", country: "Chile", flag: "🇨🇱" },
  { code: "+57", country: "Colômbia", flag: "🇨🇴" },
  { code: "+58", country: "Venezuela", flag: "🇻🇪" },
  { code: "+51", country: "Peru", flag: "🇵🇪" },
  { code: "+593", country: "Equador", flag: "🇪🇨" },
  { code: "+52", country: "México", flag: "🇲🇽" },
  { code: "+81", country: "Japão", flag: "🇯🇵" },
  { code: "+82", country: "Coreia do Sul", flag: "🇰🇷" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+91", country: "Índia", flag: "🇮🇳" },
  { code: "+61", country: "Austrália", flag: "🇦🇺" },
  { code: "+64", country: "Nova Zelândia", flag: "🇳🇿" },
];

function formatPhoneDisplay(digits: string): string {
  const numbers = digits.replace(/\D/g, "").slice(0, 11);
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
}

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  /** Digits only (max 11 for Brazilian). */
  value: string;
  onChange: (digits: string) => void;
  /** Show country code dropdown like LeadForm. */
  showCountryCode?: boolean;
  countryCode?: string;
  onCountryCodeChange?: (code: string) => void;
}

export function PhoneInput({
  value,
  onChange,
  showCountryCode = false,
  countryCode = "+55",
  onCountryCodeChange,
  className,
  id = "phone",
  placeholder = "(00) 00000-0000",
  ...rest
}: PhoneInputProps) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const display = formatPhoneDisplay(digits);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value.replace(/\D/g, "").slice(0, 11);
    onChange(next);
  };

  const inputClassName = showCountryCode ? `flex-1 ${className ?? ""}`.trim() : className;

  const inputEl = (
    <input
      type="tel"
      id={id}
      inputMode="numeric"
      value={display}
      onChange={handleChange}
      className={inputClassName}
      placeholder={placeholder}
      maxLength={15}
      {...rest}
    />
  );

  if (showCountryCode) {
    return (
      <div className="flex gap-2">
        <select
          name="countryCode"
          aria-label="Código do país"
          value={countryCode}
          onChange={(e) => onCountryCodeChange?.(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
          style={{ minWidth: "120px" }}
        >
          {PHONE_COUNTRY_CODES.map((c, i) => (
            <option key={`${c.code}-${i}`} value={c.code}>
              {c.flag} {c.code}
            </option>
          ))}
        </select>
        {inputEl}
      </div>
    );
  }

  return inputEl;
}
