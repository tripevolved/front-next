import type { TripPaymentIntent } from "@/core/types";
import type { PaymentStepProps } from "./payment-steps.types";
import { differenceInMinutes } from "date-fns";

import { Button, Divider, Grid, Icon, ItemElement, Label, Modal } from "mars-ds";
import {
  ErrorState,
  GlobalLoader,
  Logo,
  ModalContent,
  SelectFieldSimple,
  Text,
  WhatsappButton,
} from "@/ui";

import { formatByDataType, formatToCurrencyBR } from "@/utils/helpers/number.helpers";
import { parseBRStringToDate } from "@/utils/helpers/dates.helpers";

import { usePaymentIntent } from "./payment-intent.hook";
import { PixPaymentInfo, TripPaymentResult } from "@/services/api/payments/payTrip";
import { QRCodeSVG } from "qrcode.react";
import { copyToClipboard } from "@/utils/helpers/strings.helper";
import { useEffect, useState } from "react";
import NextRouter from "next/router";

export const StepPaymentMethods = ({ price, payload, setPayload, tripId }: PaymentStepProps) => {
  const formattedPrice = formatByDataType(price.amount, "CURRENCY");

  const parsePayload = (isPix = false): TripPaymentIntent => {
    return {
      amount: price.amount,
      installments: isPix ? 1 : Number(payload.maxInstallments),
      creditCard: null,
      method: isPix ? "PIX" : "CREDIT_CARD",
      tripId,
      payer: {
        address: payload.address,
        ...payload.payer,
        birthDate: parseBRStringToDate(payload.payer.birthDate),
      },
      travelers: payload.travelers.map((traveler) => ({
        ...traveler,
        birthDate: parseBRStringToDate(traveler.birthDate).toISOString(),
      })),
    };
  };

  const payWithPix = () => {
    const tripPayment = parsePayload(true);
    Modal.open((rest) => <PaymentModal {...rest} tripPayment={tripPayment} isPix />, {
      size: "sm",
    });
  };

  const payWithCreditCard = () => {
    const tripPayment = parsePayload(false);
    Modal.open((rest) => <PaymentModal {...rest} tripPayment={tripPayment} />, { size: "sm" });
  };

  return (
    <Grid>
      <Grid>
        <div className="flex align-items-center gap-md">
          <Text>
            <strong>Pix</strong> (Total de {formattedPrice})
          </Text>
          <Label>3% OFF</Label>
        </div>
        <Button variant="tertiary" onClick={payWithPix}>
          Pagar no Pix
        </Button>
      </Grid>
      <Text as="div" className="text-center color-text-secondary mt-sm">
        ou
      </Text>
      <Grid>
        <Text>
          <strong>Cartão de Crédito</strong> (Total de {formattedPrice})
        </Text>
        <SelectFieldSimple
          name="installments"
          required
          label="Parcelamento"
          onValueChange={(maxInstallments) => setPayload({ maxInstallments })}
          defaultValue={payload.maxInstallments}
          options={price.installmentOptions}
          disabled={!price.installmentOptions.length}
        />
        <Button variant="tertiary" onClick={payWithCreditCard}>
          Pagar no Cartão
        </Button>
      </Grid>
    </Grid>
  );
};

interface PaymentModalProps {
  tripPayment: TripPaymentIntent;
  close: VoidFunction;
  isPix?: boolean;
}

const PaymentModal = ({ tripPayment, isPix = false }: PaymentModalProps) => {
  const { isLoading, error, data } = usePaymentIntent(tripPayment);
  console.log({ isLoading, error, data });

  return (
    <ModalContent>
      <div style={{ height: 20 }} />
      <div className="text-center m-auto" style={{ maxWidth: 380 }}>
        {error ? (
          <PaymentModalErrorContent />
        ) : isLoading ? (
          <GlobalLoader inline />
        ) : !data ? (
          <PaymentModalErrorContent />
        ) : isPix ? (
          <PaymentPixContent {...data.pixInfo} />
        ) : (
          <PaymentCreditCardContent {...data} />
        )}
      </div>
    </ModalContent>
  );
};

const PaymentModalErrorContent = () => {
  return (
    <ErrorState
      heading="Devido à um erro não foi possível prosseguir"
      text="Por favor, entre em contato com o nosso time para dar seguindo à sua compra"
    >
      <WhatsappButton variant="tertiary">Continuar a compra</WhatsappButton>
    </ErrorState>
  );
};

const PaymentPixContent = ({ netAmount, expirationDate, qrCode }: PixPaymentInfo) => {
  const diff = differenceInMinutes(new Date(expirationDate), new Date());
  return (
    <Grid>
      <Logo />
      <Divider />
      <Text heading>Realize o pagamento</Text>
      <div>
        <Text heading size="xs">
          Escaneie o QR Code
        </Text>
        <Text>para pagar com o PIX</Text>
      </div>
      <div>
        <ItemElement>
          <QRCodeSVG className="m-auto" value={qrCode} size={165} />
        </ItemElement>
        <Text>
          Valor de <strong>{formatToCurrencyBR(netAmount)}</strong>
        </Text>
      </div>
      <Button
        iconName="copy"
        variant="neutral"
        onClick={() => copyToClipboard(qrCode, "Código copiado com sucesso!")}
      >
        Copiar código do Pix
      </Button>
      <div>
        <Text className="color-text-secondary">Expira em {diff} minutos</Text>
        <ItemElement variant="inline">{qrCode}</ItemElement>
      </div>
      <div className="flex align-items-center justify-content-center gap-md">
        <Icon name="shield" className="color-text-secondary" />
        <Text>
          <strong>Compra segura</strong>
        </Text>
      </div>
    </Grid>
  );
};

const PaymentCreditCardContent = ({ paymentLinkUrl, provider }: TripPaymentResult) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      NextRouter.replace(paymentLinkUrl);
      setIsLoading(false);
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Grid>
      <Logo />
      <Divider />
      <Text heading>Realize o pagamento</Text>
      <Text>
        Você será redirecionado para realizar o pagamento nas condições escolhidas pelo nosso
        parceiro
      </Text>
      {isLoading ? (
        <GlobalLoader inline />
      ) : (
        <Button variant="neutral" href={paymentLinkUrl}>
          Continuar
        </Button>
      )}
      <div className="flex align-items-center justify-content-center gap-md">
        <Icon name="shield" className="color-text-secondary" />
        <Text>
          <strong>Compra segura</strong>
        </Text>
      </div>
    </Grid>
  );
};
