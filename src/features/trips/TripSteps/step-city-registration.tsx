import { useAppStore } from "@/core/store";
import type { StepComponentProps } from "@/features";
import { RegisterApiService } from "@/services/api";
import { StepCity } from "./step-city";

export function StepCityRegistration({ onNext }: StepComponentProps) {
  const travelerId = useAppStore((state) => state.travelerState.id);

  const onSubmit = async (cityId: string) => {
    await RegisterApiService.putRegisterCity({
      cityId,
      travelerId,
    });
    onNext();
  };

  return <StepCity title="Em que cidade você mora atualmente?" onSelectCity={onSubmit} />;
}
