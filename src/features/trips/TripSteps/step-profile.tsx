import { useAppStore } from "@/core/store";
import { HasProfile, type StepComponentProps } from "@/features";
import { ErrorState, Text } from "@/ui";
import { Button } from "mars-ds";

export function StepProfile({ onNext }: StepComponentProps) {
  const travelerProfile = useAppStore((state) => state.travelerState.travelerProfile);

  if (!travelerProfile) {
    return (
      <div className="text-center">
        <ErrorState retry />
      </div>
    );
  }

  return (
    <div className="text-center">
      <HasProfile travelerProfile={travelerProfile} />
      <Text className="color-text-secondary my-2x">
        Agora que já sabemos qual é o seu perfil de viajante, <br />
        clique em continuar para descobrir a sua trip:
      </Text>
      <Button
        // @ts-ignore
        variant="tertiary"
        iconName="chevron-right"
        isRtl
        onClick={onNext}
      >
        Continuar
      </Button>
    </div>
  );
}
