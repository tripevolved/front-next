import type { TripPaymentIntent } from "@/core/types";
import type { PaymentStepProps } from "./payment-steps.types";

import { Button, Grid, Label, Modal } from "mars-ds";
import {
  ErrorState,
  GlobalLoader,
  ModalContent,
  SelectFieldSimple,
  Text,
  WhatsappButton,
} from "@/ui";

import { formatByDataType } from "@/utils/helpers/number.helpers";
import { parseBRStringToDate } from "@/utils/helpers/dates.helpers";

import { usePaymentIntent } from "./payment-intent.hook";

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
    Modal.open((rest) => <PaymentModal {...rest} tripPayment={tripPayment} />, {});
  };

  const payWithCreditCard = () => {
    const tripPayment = parsePayload(false);
    Modal.open((rest) => <PaymentModal {...rest} tripPayment={tripPayment} />, {});
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
        {/* <TextField
            label="Número do cartão"
            required
            name="number"
            mask="9999 9999 9999 9999 999"
            minLength={19}
          />
          <TextField label="Nome no cartão" required name="cardHolder" minLength={6} />
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
              name="cvv"
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
          /> */}
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
}

const PaymentModal = ({ tripPayment }: PaymentModalProps) => {
  const { isLoading, error, data } = usePaymentIntent(tripPayment);

  return (
    <ModalContent heading="Realize o pagamento">
      {error ? (
        <PaymentModalErrorContent />
      ) : isLoading ? (
        <GlobalLoader inline />
      ) : data ? (
        <PaymentModalErrorContent />
      ) : (
        <div>sucesso</div>
      )}
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
