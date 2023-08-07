import { useAppStore } from "@/core/store";
import { HasProfile, type TripDiscoverStepContentProps } from "@/features";
import { useSynchronizeTravelerState } from "@/features/auth/AuthSignIn/use-after-login-state.hook";
import { ErrorState, Text } from "@/ui";
import { Button } from "mars-ds";
import { useEffect } from "react";

export function StepProfile({ onNext, onPrevious }: TripDiscoverStepContentProps) {
  const travelerProfile = useAppStore((state) => state.travelerState.travelerProfile);
  const { syncTravelerState } = useSynchronizeTravelerState();

  useEffect(() => {
    if (!travelerProfile) {
      syncTravelerState();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!travelerProfile) {
    return (
      <div className="text-center">
        <ErrorState />
        <Button
          // @ts-ignore
          variant="tertiary"
          onClick={onPrevious}
        >
          Tentar novamente
        </Button>
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
