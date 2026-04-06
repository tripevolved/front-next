"use client";

import Image from "next/image";
import { PublicAccommodationRoomRate } from "@/core/types/accommodations";

const BREAKFAST_ICON = "/assets/amenities/breakfast.svg";

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency || "BRL",
  }).format(amount);
}

interface RoomAvailabilityPriceProps {
  rate: PublicAccommodationRoomRate;
  size?: "card" | "modal";
}

export function RoomAvailabilityPrice({ rate, size = "card" }: RoomAvailabilityPriceProps) {
  const currency = rate.currency || "BRL";
  const showOriginal = rate.originalPrice != null && rate.originalPrice > rate.price;

  const priceClass = size === "modal" ? "text-4xl" : "text-3xl";
  const originalClass = size === "modal" ? "text-2xl" : "text-xl";

  const visibleTaxes = (rate.taxes ?? []).filter((t) => t.amount !== 0);

  const taxTextClass = size === "modal" ? "text-sm" : "text-xs";

  const mealPlanTextClass = size === "modal" ? "text-base font-semibold" : "text-sm font-semibold";
  const mealPlanIconSize = size === "modal" ? 26 : 22;

  const mealPlanLabel = rate.isAllInclusive
    ? "All inclusive"
    : rate.hasFullBoard
    ? "Pensão completa"
    : rate.hasHalfBoard
    ? "Meia pensão"
    : rate.hasBreakfast
    ? "Café da manhã incluído"
    : "Sem café da manhã";

  const mealPlanHighlighted = Boolean(
    rate.isAllInclusive || rate.hasFullBoard || rate.hasHalfBoard || rate.hasBreakfast
  );

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        {showOriginal && (
          <span className={`${originalClass} font-medium text-gray-400 line-through`}>
            {formatCurrency(rate.originalPrice!, currency)}
          </span>
        )}
        <span className={`${priceClass} font-bold text-primary-600`}>
          {formatCurrency(rate.price, currency)}
        </span>
        <span className={size === "modal" ? "text-lg text-gray-600" : "text-sm text-gray-600"}>
          total da estadia
        </span>
      </div>

      <div
        className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 border ${
          mealPlanHighlighted
            ? "border-primary-300 bg-primary-50 shadow-sm"
            : "border-gray-200 bg-gray-50"
        }`}
      >
        <div
          className={`flex-shrink-0 ${mealPlanHighlighted ? "text-primary-600" : "text-gray-400"}`}
          style={{ width: mealPlanIconSize, height: mealPlanIconSize }}
        >
          <Image
            src={BREAKFAST_ICON}
            alt={mealPlanLabel}
            width={mealPlanIconSize}
            height={mealPlanIconSize}
            className="w-full h-full"
          />
        </div>
        <span
          className={`${mealPlanTextClass} leading-snug ${
            mealPlanHighlighted ? "text-primary-900" : "text-gray-600"
          }`}
        >
          {mealPlanLabel}
        </span>
      </div>

      {visibleTaxes.length > 0 && (
        <div className={size === "modal" ? "pt-1" : "pt-0.5"}>
          {size === "modal" && (
            <p className="text-sm font-semibold text-gray-700 mb-2">Taxas adicionais</p>
          )}
          <ul className={`space-y-1 ${taxTextClass} text-gray-600`}>
            {visibleTaxes.map((tax, index) => {
              const desc = tax.description?.trim();
              return (
                <li
                  key={index}
                  className={`flex gap-3 ${desc ? "justify-between" : "justify-end"}`}
                >
                  {desc ? <span className="min-w-0 text-left">{desc}</span> : null}
                  <span className="font-medium shrink-0 text-gray-700 tabular-nums">
                    {formatCurrency(tax.amount, currency)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
