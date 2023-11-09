import { clamp } from "@/utils/helpers/math.helpers";
import { formatByDataType } from "@/utils/helpers/number.helpers";
import { MAX_INSTALLMENTS, MIN_PAYMENT } from "./trip-purchase.constants";

export const calcInstallmentsOptions = (total: number) => {
  const maxInstallments = clamp(Math.floor(total / MIN_PAYMENT), 0, MAX_INSTALLMENTS);
  const options = [];
  for (let i = 1; i <= maxInstallments; i++) {
    options.push({
      label: `${i}x de ${formatByDataType(total / i, "CURRENCY")}`,
      value: i.toString(),
    });
  }
  return options;
}
