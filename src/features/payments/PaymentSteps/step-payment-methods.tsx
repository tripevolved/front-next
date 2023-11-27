import type { PaymentStepProps } from "./payment-steps.types";

import { Button, Grid, Label, Modal, TextField } from "mars-ds";
import {
  ErrorState,
  GlobalLoader,
  ModalContent,
  SelectFieldSimple,
  Text,
  WhatsappButton,
} from "@/ui";

import { formatByDataType } from "@/utils/helpers/number.helpers";
import type { TripPayment } from "@/core/types";
import { parseBRStringToDate } from "@/utils/helpers/dates.helpers";
import { PaymentsApiService } from "@/services/api";
import { useEffect, useState } from "react";
import type { TripPaymentResult } from "@/services/api/payments/payTrip";
import { type SubmitHandler, handleFormSubmit } from "@/utils/helpers/form.helpers";

export const StepPaymentMethods = ({ price, payload, tripId }: PaymentStepProps) => {
  const formattedPrice = formatByDataType(price.amount, "CURRENCY");

  const parsePayload = (isPix = false): TripPayment => {
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
      ipAddress: "",
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

  const handleCreditCardSubmit: SubmitHandler = (props) => {
    console.log(props);
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
        <Button type="submit" variant="tertiary" onClick={payWithPix}>
          Pagar no Pix
        </Button>
      </Grid>
      <Text as="div" className="text-center color-text-secondary mt-sm">
        ou
      </Text>
      <form onSubmit={handleFormSubmit(handleCreditCardSubmit)}>
        <Grid>
          <Text>
            <strong>Cartão de Crédito</strong> (Total de {formattedPrice})
          </Text>
          <input type="hidden" name="amount" value={price.amount} />
          <TextField
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
          />
          <SelectFieldSimple
            name="installments"
            required
            label="Parcelamento"
            defaultValue={payload.maxInstallments}
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
  tripPayment: TripPayment;
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

const usePaymentIntent = (tripPayment: TripPayment) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<TripPaymentResult | null>(null);

  useEffect(() => {
    setIsLoading(true);
    PaymentsApiService.putTripPayment(tripPayment)
      .then((result) => {
        if (!result) {
          throw new Error("Empty result");
        }
        setData(result);
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return { isLoading, error, data };
};
