export const formatByDataType = (num: number, dataType: "CURRENCY" | "DAYS" | undefined) => {
  if (num === undefined) return "";
  if (dataType === "CURRENCY") return formatToCurrencyBR(num);
  if (dataType === "DAYS") return formatToPlural("dia", "dias")(num);
  return num.toString();
};

export const formatToPlural = (singular: string, plural: string) => (num: number) =>
  `${num} ${num === 1 ? singular : plural}`;

export const formatToCurrencyBR = (num: number) =>
  num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const formatToPercentage = (num: number) =>
  num.toLocaleString("pt-BR", { style: "percent", minimumFractionDigits: 2 });

export const setBRLCurrencyValue = (value: number, currency = "BRL") => {
  return currency == "BRL" ? formatByDataType(value, "CURRENCY") : `$ ${value}`
}
