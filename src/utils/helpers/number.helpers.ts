export const formatByDataType = (num: number, dataType: "CURRENCY" | "DAYS" | undefined) => {
  if (num === undefined) return "";

  if (dataType === "CURRENCY")
    return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  if (dataType === "DAYS") return num > 1 ? num + " dias" : num + " dia";
  return num.toString();
};
