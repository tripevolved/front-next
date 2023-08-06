export const formatByDataType = (num: number, dataType: "CURRENCY" | "DAYS" | undefined) => {
  if (num === undefined) return "";

  if (dataType === "CURRENCY")
    return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  if (dataType === "DAYS") return num > 1 ? num + " dias" : num + " dia";
  return num.toString();
};

export const formatToDayBR = (num: number) => `${num} dia${num > 1 ? "s" : ""}`;

export const formatToCurrencyBR = (num: number) =>
  num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const formatToPercentage = (num: number) =>
  num.toLocaleString("pt-BR", { style: "percent", minimumFractionDigits: 2 });
