import { useMemo } from "react";
import useSWR from "swr";

import { useAppStore } from "@/core/store";
import { PaymentsApiService, TripsApiService } from "@/services/api";
import { calcInstallmentsOptions } from "./trip-purchase.helpers";
import { PaymentData } from "../PaymentSteps";
import { MathHelper } from "@/utils/helpers/math.helper";

const SWROptions = { revalidateOnFocus: false };

export type PurchaseData = Omit<PaymentData, "trip">

const parseIsoDateToBrString = (date: Date) => new Date(date).toLocaleDateString("pt-br");

export const usePurchase = (tripId: string) => {
  const travelerId = useAppStore((state) => state.travelerState.id);
  const travelerEmail = useAppStore((state) => state.travelerState.email);

  const price = useSWR(
    tripId ? `trips/${tripId}/price` : null,
    async () => TripsApiService.getPriceById(tripId),
    SWROptions
  );

  const payer = useSWR(
    `payments/${travelerId}/payer`,
    async () => PaymentsApiService.getPayerById(travelerId),
    SWROptions
  );

  const isLoading = price.isLoading || payer.isLoading;

  const error = price.error;

  const data = useMemo(() => {
    if (!price.data) return null;
    const amount = MathHelper.sum(price.data.price, price.data.serviceFee);
    const result: Omit<PurchaseData, "travelers"> = {
      tripId,
      price: {
        price: price.data.price,
        serviceFee: price.data.serviceFee,
        amount,
        installmentOptions: calcInstallmentsOptions(amount),
      },
      payer: {
        birthDate: payer.data?.birthDate ? parseIsoDateToBrString(payer.data.birthDate) : "",
        cpf: payer.data?.cpf || "",
        document: payer.data?.document || "",
        fullName: payer.data?.fullName || "",
        gender: payer.data?.gender || "",
        motherName: payer.data?.motherName || "",
        phone: payer.data?.phone || "",
        email: payer.data?.email || travelerEmail,
      },
      address: {
        postalCode: payer.data?.address.postalCode || "",
        address: payer.data?.address.address || "",
        complement: payer.data?.address.complement || "",
        number: payer.data?.address.number || "",
        neighborhood: payer.data?.address.neighborhood || "",
        city: payer.data?.address.city || "",
        stateProvince: payer.data?.address.stateProvince || "",
        country: payer.data?.address.country || "Brasil",
      },
    };
    return result;
  }, [price.data, payer.data]);

  return { isLoading, data, error };
};
