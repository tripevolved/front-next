import type { StepComponentProps } from "@/features";
import { StepCity } from "./step-city";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DestinationApiService } from "@/services/api";
import { Notification } from "mars-ds";

export function StepCityDestination({ onNext }: StepComponentProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const bypass = async (destinationName: string) => {
    try {
      const { id, title } = await DestinationApiService.getByName(destinationName);
      onNext({ destinationId: id, destinationTitle: title });
    } catch (error) {
      console.error(error);
      Notification.error("Não foi possível encontrar o destino");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    const destinationName = router.query.para;
    if (typeof destinationName === "string") {
      bypass(destinationName);
      return;
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const onSubmit = async (destinationId: string) => onNext({ destinationId });

  return (
    <StepCity
      title="Para onde você quer viajar?"
      fetcher={DestinationApiService.search}
      onSelectCity={onSubmit}
      isLoading={isLoading}
    />
  );
}
