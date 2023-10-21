import { QRCodeSVG } from "qrcode.react";
import { TripPaymentResult } from "@/services/api/payments/payTrip";
import { Box, Text, Picture, Tag } from "@/ui";
import { Button, Modal, Notification } from "mars-ds";

const CREDIT_CARD_MESSAGE =
  "Você será redirecionado para a página onde realizará o pagamento com seu Cartão de Crédito";
const PIX_MESSAGE = "Realize o pagamento via PIX através do QRCode";

const READING_TIME_MILLISECONDS = 8 * 1000;

export interface TripPurchaseSuccessResponseSectionProps extends TripPaymentResult {
  onClose: () => void;
}

export interface TripPurchaseErrorResponseProps {
  message: string;
  messageCode?: string;
  statusCode?: number;
  onClose: () => void;
}

export function TripPurchaseSuccessResponse({
  tripId,
  isSuccess,
  message,
  paymentMethod,
  paymentLinkUrl,
  pixInfo,
  onClose,
}: TripPurchaseSuccessResponseSectionProps) {
  const copyFunction = () => {
    const inputElement = document.getElementById("pixQrCode");
    // @ts-ignore
    inputElement.select();
    // @ts-ignore
    inputElement.setSelectionRange(0, 99999);
    document.execCommand("copy");
    Notification.success("Código copiado!");
  };

  if (paymentMethod == "CREDIT_CARD") {
    setTimeout(() => {
      window.open(paymentLinkUrl, "_blank");
    }, READING_TIME_MILLISECONDS);
  }
  return (
    <Box className="trip-purchase__response flex-column align-items-center gap-md p-md">
      <Picture className="trip-purchase__response-item" src="/assets/payments/success.png" />
      <Text className="trip-purchase__response-item" heading size="xl">
        Tudo certo!
      </Text>
      <Text className="trip-purchase__response-item" size="lg">
        Viagem comprada com sucesso! Enviaremos todos os detalhes para o seu e-mail.
      </Text>
      <Text className="trip-purchase__response-item" size="lg">
        {paymentMethod == "CREDIT_CARD" ? CREDIT_CARD_MESSAGE : PIX_MESSAGE}
      </Text>
      {paymentMethod == "PIX" ? (
        <>
          <QRCodeSVG
            value={pixInfo.qrCode}
            includeMargin
            size={250}
            imageSettings={{
              src: "/brand/logo-symbol.svg",
              x: undefined,
              y: undefined,
              height: 25,
              width: 25,
              excavate: true,
            }}
          />
          <Tag className="w-100">
            <input id="pixQrCode" type="text" value={pixInfo.qrCode} readOnly className="w-100" />
          </Tag>
          <Button
            style={{ color: "var(--color-gray-4)" }}
            iconName="copy"
            onClick={() => copyFunction()}
          >
            Copiar Código
          </Button>
        </>
      ) : null}
    </Box>
  );
}

export function TripPurchaseErrorResponse(result: TripPurchaseErrorResponseProps) {
  return (
    <Box className="trip-purchase__response flex-column gap-md p-md">
      <Picture className="trip-purchase__response-item" src="/assets/payments/error.png" />
      <Text className="trip-purchase__response-item" heading size="xl">
        Erro na Criação do Pagamento
      </Text>
      <Text className="trip-purchase__response-item" size="lg">
        Parece que há um problema com seu pagamento.
      </Text>
      <Text className="trip-purchase__response-item" size="md">
        Mais informações: {result.message}
      </Text>
      <Button
        className="trip-purchase__response-button"
        variant="custom"
        backgroundColor="var(--color-brand-2)"
        hoverBackgroundColor="var(--color-secondary-900)"
        color="white"
        onClick={() => result.onClose()}
      >
        Tentar novamente
      </Button>
    </Box>
  );
}
