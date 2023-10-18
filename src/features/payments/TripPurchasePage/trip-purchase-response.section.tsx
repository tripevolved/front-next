import { TripPaymentMethod } from "@/core/types";
import { PendingDocumentsModal } from "@/features/dashboard/PendingDocumentsModal";
import { Box, Text, Picture } from "@/ui";
import { Button, Modal } from "mars-ds";

export interface TripPurchaseResponseSectionProps {
  tripId: string;
  isSuccess: boolean;
  message?: string;
  method: TripPaymentMethod;
  onClose: () => void;
}

export function TripPurchaseResponseSection({
  tripId,
  isSuccess,
  message,
  method,
  onClose,
}: TripPurchaseResponseSectionProps) {
  return (
    <Box className="trip-purchase__response">
      {!isSuccess ? (
        <>
          <Picture className="trip-purchase__response-item" src="/assets/payments/error.png" />
          <Text className="trip-purchase__response-item" heading={true} size="xl">
            Erro de pagamento
          </Text>
          <Text className="trip-purchase__response-item" size="lg">
            Parece que há um problema com seu pagamento.
          </Text>
          <Text className="trip-purchase__response-item" size="sm">
            Mais informações: {message}
          </Text>
          <Button
            className="trip-purchase__response-button"
            variant="custom"
            backgroundColor="var(--color-brand-2)"
            hoverBackgroundColor="var(--color-secondary-900)"
            color="white"
            onClick={() => onClose()}
          >
            Tentar novamente
          </Button>
        </>
      ) : (
        <>
          <Picture className="trip-purchase__response-item" src="/assets/payments/success.png" />
          <Text className="trip-purchase__response-item" heading={true} size="xl">
            Tudo certo!
          </Text>
          <Text className="trip-purchase__response-item" size="lg">
            Viagem comprada com sucesso. Enviaremos todos os detalhes para o seu e-mail.
          </Text>
        </>
      )}
    </Box>
  );
}
