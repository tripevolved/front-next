import { useAppStore } from "@/core/store";
import type { StepComponentProps } from "@/features";
import { RegisterApiService } from "@/services/api";
import { StepCity } from "./step-city";

export function StepCityRegistration({ onNext }: StepComponentProps) {
  const { id: travelerId, hasValidAddress } = useAppStore((state) => state.travelerState);

  if (hasValidAddress) { onNext(); }

  const onSubmit = async (cityId: string) => {
    await RegisterApiService.putRegisterCity({
      cityId,
      travelerId,
    });
    onNext();
  };

  return (
    <StepCity
      title="Em que cidade você mora atualmente?"
      fetcher={RegisterApiService.getCities}
      onSelectCity={onSubmit}
    />
  );
}
