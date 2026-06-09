"use client";

import Image from "next/image";
import { mealPlanKindForRate, type MealPlanKind } from "@/components/accommodation/roomCandidateRates";
import { PublicAccommodationRoomRate } from "@/core/types/accommodations";

const BREAKFAST_ICON = "/assets/amenities/breakfast.svg";

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency || "BRL",
  }).format(amount);
}

function InfinityIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="text-current"
    >
      <path
        d="M12 12C12 8.5 8.8 6.5 6 8.8 3.2 11.1 3.2 14.9 6 17.2 8.8 19.5 12 17.5 12 12"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12C12 8.5 15.2 6.5 18 8.8 20.8 11.1 20.8 14.9 18 17.2 15.2 19.5 12 17.5 12 12"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossedCoffeeIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="text-current"
    >
      <path
        d="M6 8h11a2 2 0 0 1 2 2v1.5a3.5 3.5 0 0 1-3.5 3.5H14v2.5H8V8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M17 10h1.2a1.8 1.8 0 0 1 0 3.6H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5 20h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M4.5 4.5l15 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MealPlanIcon({
  kind,
  label,
  size,
}: {
  kind: MealPlanKind;
  label: string;
  size: number;
}) {
  if (kind === "ALL") {
    return <InfinityIcon size={size} />;
  }

  if (kind === "BREAKFAST" || kind === "HALF" || kind === "FULL") {
    return (
      <Image
        src={BREAKFAST_ICON}
        alt={label}
        width={size}
        height={size}
        className="w-full h-full"
      />
    );
  }

  return <CrossedCoffeeIcon size={size} />;
}

interface RoomAvailabilityPriceProps {
  rate: PublicAccommodationRoomRate;
  size?: "card" | "modal";
}

export function RoomAvailabilityPrice({ rate, size = "card" }: RoomAvailabilityPriceProps) {
  const currency = rate.currency || "BRL";
  const showOriginal = rate.originalPrice != null && rate.originalPrice > rate.price;
  const cancellationPolicy = String(rate.cancellationPolicy ?? "").trim();

  const priceClass = size === "modal" ? "text-4xl" : "text-3xl";
  const originalClass = size === "modal" ? "text-2xl" : "text-xl";
  const fromLabelClass = size === "modal" ? "text-sm" : "text-xs";

  const propertyTaxes = Array.isArray((rate as any)?.propertyTaxes)
    ? ((rate as any).propertyTaxes as any[]).filter((t) => Number(t?.amount ?? 0) !== 0)
    : [];
  const propertyTaxesTotal = propertyTaxes.reduce((sum, tax) => sum + Number(tax?.amount ?? 0), 0);
  const includedTaxes = Array.isArray((rate as any)?.includedTaxes)
    ? ((rate as any).includedTaxes as any[]).filter((t) => Number(t?.amount ?? 0) !== 0)
    : [];

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
          : "Somente acomodação";

  const mealPlanHighlighted = Boolean(
    rate.isAllInclusive || rate.hasFullBoard || rate.hasHalfBoard || rate.hasBreakfast
  );
  const mealPlanKind = mealPlanKindForRate(rate);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className={`${fromLabelClass} font-comfortaa font-medium text-gray-500 uppercase tracking-wide`}>
          A partir de
        </span>
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

      {size === "card" && propertyTaxesTotal > 0 && (
        <p className={`${taxTextClass} text-gray-600 leading-snug`}>
          + {formatCurrency(propertyTaxesTotal, currency)} em taxas a serem pagas na hospedagem
        </p>
      )}

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
          <MealPlanIcon kind={mealPlanKind} label={mealPlanLabel} size={mealPlanIconSize} />
        </div>
        <span
          className={`${mealPlanTextClass} leading-snug ${
            mealPlanHighlighted ? "text-primary-900" : "text-gray-600"
          }`}
        >
          {mealPlanLabel}
        </span>
      </div>

      <div className="rounded-lg border border-secondary-100 bg-secondary-50/70 px-3 py-2.5">
        {rate.isCancellable ? (
          cancellationPolicy ? (
            <p className={`${taxTextClass} font-semibold text-green-700 leading-snug`}>{cancellationPolicy}</p>
          ) : (
            <p className={`${taxTextClass} font-semibold text-green-700 leading-snug`}>Cancelamento flexível</p>
          )
        ) : (
          <p className={`${taxTextClass} font-semibold text-red-700 leading-snug`}>
            {cancellationPolicy || "Não reembolsável"}
          </p>
        )}
      </div>

      {size === "modal" && propertyTaxes.length > 0 && (
        <div className="pt-1">
          <p className={`${taxTextClass} font-semibold text-gray-700 mb-2`}>
            Taxas a serem pagas na hospedagem
          </p>
          <ul className={`space-y-1 ${taxTextClass} text-gray-600`}>
            {propertyTaxes.map((tax: any, index: number) => {
              const desc = String(tax?.description ?? "").trim();
              return (
                <li key={index} className={`flex gap-3 ${desc ? "justify-between" : "justify-end"}`}>
                  {desc ? <span className="min-w-0 text-left">{desc}</span> : null}
                  <span className="font-medium shrink-0 text-gray-700 tabular-nums">
                    {formatCurrency(Number(tax?.amount ?? 0), currency)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {size === "modal" && includedTaxes.length > 0 && (
        <div className="pt-2">
          <p className={`${taxTextClass} font-semibold text-gray-700 mb-2`}>Taxas já incluídas no valor</p>
          <ul className={`space-y-1 ${taxTextClass} text-gray-600`}>
            {includedTaxes.map((tax: any, index: number) => {
              const desc = String(tax?.description ?? "").trim();
              return (
                <li key={index} className={`flex gap-3 ${desc ? "justify-between" : "justify-end"}`}>
                  {desc ? <span className="min-w-0 text-left">{desc}</span> : null}
                  <span className="font-medium shrink-0 text-gray-700 tabular-nums">
                    {formatCurrency(Number(tax?.amount ?? 0), currency)}
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
