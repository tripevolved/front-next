import type { TripPaymentIntentAll } from "@/core/types";
import type { PaymentStepProps } from "./payment-steps.types";
import { differenceInMinutes } from "date-fns";

import {
  Button,
  Divider,
  Grid,
  Icon,
  ItemElement,
  Label,
  Modal,
  ModalOpenProps,
  TextField,
} from "mars-ds";
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
import { SubmitHandler, handleFormSubmit } from "@/utils/helpers/form.helpers";

interface CreditCardValues {
  cardNumber: string;
  cardholder: string;
  expiration: string;
  securityCode: string;
  cpf: string;
  installments: string;
}

const modalOptions: ModalOpenProps = { size: "sm", closable: false };

export const StepPaymentMethods = ({ price, payload, tripId }: PaymentStepProps) => {
  const pixAmount = price.amountWithPixDiscount ?? price.amountWithDiscount ?? price.amount;
  const amount = price.amountWithDiscount ?? price.amount;

  const formattedPrice = formatByDataType(amount, "CURRENCY");
  const formattedPixPrice = formatByDataType(pixAmount, "CURRENCY");

  const parsePayload = (isPix = false): TripPaymentIntentAll => {
    return {
      amount: isPix ? pixAmount : amount,
      installments: 1,
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
        rgValidUntil: parseBRStringToDate(traveler.rgValidUntil).toISOString(),
      })),
    };
  };

  const payWithPix = () => {
    const tripPayment = parsePayload(true);
    console.log(tripPayment.amount);
    Modal.open((rest) => <PaymentModal {...rest} tripPayment={tripPayment} isPix />, {
      size: "sm",
    });
  };

  const payWithCreditCard: SubmitHandler<CreditCardValues> = (values) => {
    const [expirationMonth, expirationYear] = values.expiration.split("/");
    const tripPayment: TripPaymentIntentAll = {
      ...parsePayload(false),
      installments: Number(values.installments),
      creditCard: {
        cpf: values.cpf,
        securityCode: values.securityCode,
        expirationMonth: Number(expirationMonth),
        expirationYear: Number(expirationYear),
        cardholder: values.cardholder,
        cardNumber: values.cardNumber,
      },
    };
    Modal.open((rest) => <PaymentModal {...rest} tripPayment={tripPayment} />, modalOptions);
  };

  return (
    <Grid>
      <Grid>
        <div className="flex align-items-center gap-md">
          <Text>
            <strong>Pix</strong> (Total de {formattedPixPrice})
          </Text>
          {price.pixPercentageDiscount && <Label>{(price.pixPercentageDiscount).toLocaleString(undefined, { style: 'percent' })} OFF</Label>}
        </div>
        <Button variant="tertiary" onClick={payWithPix}>
          Pagar no Pix
        </Button>
      </Grid>
      <Text as="div" className="text-center color-text-secondary mt-sm">
        ou
      </Text>
      <form onSubmit={handleFormSubmit(payWithCreditCard)}>
        <Grid>
          <Text>
            <strong>Cartão de Crédito</strong> (Total de {formattedPrice})
          </Text>
          <TextField
            label="Número do cartão"
            required
            name="cardNumber"
            mask="9999 9999 9999 9999"
            minLength={19}
            rightIconButton={{ name: "credit-card" }}
          />
          <TextField label="Nome no cartão" required name="cardholder" minLength={6} />
          <Grid columns={2}>
            <TextField
              label="Validade"
              required
              name="expiration"
              minLength={5}
              mask="99/99"
              info="MM/AA"
            />
            <TextField
              label="CVV"
              required
              name="securityCode"
              minLength={3}
              mask="9999"
              info="Código de Segurança"
            />
          </Grid>
          <TextField
            label="CPF do titular"
            required
            name="cpf"
            mask="999.999.999-80"
            minLength={14}
          />
          <SelectFieldSimple
            name="installments"
            required
            label="Parcelamento"
            defaultValue={1}
            options={price.installmentOptions}
            disabled={!price.installmentOptions.length}
          />
          <Button type="submit" variant="tertiary">
            Pagar no Cartão
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

interface PaymentModalProps {
  tripPayment: TripPaymentIntentAll;
  close: VoidFunction;
  isPix?: boolean;
}

const PaymentModal = ({ tripPayment, isPix = false, close }: PaymentModalProps) => {
  const { isLoading, error, data } = usePaymentIntent(tripPayment);

  return (
    <ModalContent>
      <div style={{ height: 20 }} />
      <div className="text-center m-auto" style={{ maxWidth: 380 }}>
        {error ? (
          <PaymentModalErrorContent close={close} />
        ) : isLoading ? (
          <GlobalLoader inline />
        ) : !data ? (
          <PaymentModalErrorContent close={close} />
        ) : isPix ? (
          <PaymentPixContent {...data.pixInfo} />
        ) : (
          <PaymentCreditCardContent {...data} />
        )}
      </div>
    </ModalContent>
  );
};

interface PaymentModalContentProps {
  close: VoidFunction;
}

const PaymentModalErrorContent = ({ close }: PaymentModalContentProps) => {
  return (
    <ErrorState
      heading="Devido à um erro não foi possível prosseguir"
      text="Por favor, verifique os dados passados, caso o problema persista, entre em contato com o nosso time para dar seguindo à sua compra"
    >
      <Button onClick={close} variant="tertiary">
        Tentar novamente
      </Button>
      <WhatsappButton variant="neutral">Fale com o nosso suporte</WhatsappButton>
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

const PaymentCreditCardContent = ({ paymentLinkUrl, isSuccess }: TripPaymentResult) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!paymentLinkUrl || isSuccess) return;

    const timeoutId = setTimeout(() => {
      NextRouter.replace(paymentLinkUrl);
      setIsLoading(false);
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [paymentLinkUrl, isSuccess]);

  if (isSuccess) {
    return (
      <Grid>
        <Logo />
        <Divider />
        <Text heading>Pagamento realizado com sucesso!</Text>
        <Text>Acesse a sua viagem em nosso painel.</Text>
        <Button variant="neutral" href="/app/painel">
          Ir para o painel
        </Button>
      </Grid>
    );
  }

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
