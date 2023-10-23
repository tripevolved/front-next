import { NotificationResult } from "@/ui";

export interface TripPurchaseResponseSectionProps {
  tripId: string;
  isSuccess: boolean;
  message?: string;
}

export function TripPurchaseResponseSection({ tripId, isSuccess, message }: TripPurchaseResponseSectionProps) {
  return (
    <NotificationResult
      isSuccess={isSuccess}
      message={message}
      nonSuccessTitle="Erro de pagamento"
      nonSuccessSubtitle="Parece que há um problema com seu pagamento"
      nonSuccessAllowRetry={true}
      successTitle="Tudo certo!"
      successMessage="Viagem comprada com sucesso. Enviaremos todos os detalhes para o seu e-mail."
      redirectTo={`/app/viagens/${tripId}/pendencias/viajantes`}
      redirectToTitle="Ver minha viagem"
    />
  );
}
