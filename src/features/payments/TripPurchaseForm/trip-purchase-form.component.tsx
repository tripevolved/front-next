import type { TripPayment, TripPaymentMethod } from "@/core/types";
import type { PurchaseData } from "../TripPurchasePage/trip-purchase-page.hook";
import type { FormValues } from "./trip-purchase-form.types";

import { useState } from "react";

import {
  Divider,
  Grid,
  Notification,
  RadioFields,
  SelectField,
  SubmitButton,
  TextField,
} from "mars-ds";
import { Text } from "@/ui";
import { TripPurchaseAddressForm } from "./trip-purchase-address-form";

import { SubmitHandler, handleFormSubmit } from "@/utils/helpers/form.helpers";
import { formatByDataType } from "@/utils/helpers/number.helpers";
import {
  GENDER_OPTIONS,
  PAYMENT_OPTIONS,
  PIX_PAYMENT_OPTION,
} from "../TripPurchasePage/trip-purchase.constants";

import { parseBRStringToDate } from "@/utils/helpers/dates.helpers";
import { PaymentsApiService } from "@/services/api";
import { useAwaitPaymentProcess } from "./trip-purchase.modal";

export const TripPurchaseForm = ({ address, payer, price, tripId }: PurchaseData) => {
  const [firstInstallmentOption] = price.installmentOptions;

  const [paymentMethod, setPaymentMethod] = useState<TripPaymentMethod>(
    PIX_PAYMENT_OPTION.value as TripPaymentMethod
  );
  const [submitting, setSubmitting] = useState(false);

  const paymentProcess = useAwaitPaymentProcess(tripId);

  const handleSubmit: SubmitHandler<FormValues> = async (values) => {
    const payload = createPayload({ ...values, tripId, amount: price.amount });
    setSubmitting(true);
    try {
      await PaymentsApiService.postTripPaymentIntent(payload).catch(() => {});
      await paymentProcess.execute();
    } catch (error) {
      console.error(error);
      Notification.error("Devido à um erro, não foi possível processar o seu pagamento.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit(handleSubmit)}>
      <Grid>
        <Text heading>Comprar Viagem</Text>
        <PurchaseDivider />
        <PurchaseSection title="Dados do comprador">
          <TextField
            id="fullName"
            name="fullName"
            required
            label="Nome do comprador"
            defaultValue={payer.fullName}
          />
          <TextField
            id="cpf"
            name="cpf"
            required
            label="CPF do comprador"
            defaultValue={payer.cpf}
            mask={"999.999.999-99"}
          />
          <Grid columns={2}>
            <TextField
              info="DD/MM/AAAA"
              id="birthDate"
              name="birthDate"
              required
              label="Data de Nascimento"
              type="text"
              mask="99/99/9999"
              defaultValue={payer.birthDate}
            />
            <SelectField
              id="gender"
              required
              name="gender"
              label="Sexo"
              options={GENDER_OPTIONS}
              defaultValue={payer.gender}
            />
          </Grid>
          <TextField
            id="motherName"
            name="motherName"
            label="Nome da mãe"
            defaultValue={payer.motherName}
          />
          <TextField
            id="document"
            name="document"
            required
            label="Documento do comprador (RG)"
            defaultValue={payer.document}
            mask="999999999"
            maxLength={9}
          />
        </PurchaseSection>
        <PurchaseDivider />
        <PurchaseSection title="Contato">
          <TextField
            label="E-mail"
            id="email"
            value={payer.email}
            disabled={Boolean(payer.email)}
          />
          <input type="hidden" value={payer.email} name="email" />
          <TextField
            label="Telefone"
            name="phone"
            id="phone"
            mask="(99) 99999-9999"
            required
            defaultValue={payer.phone}
            disabled={Boolean(payer.phone)}
          />
        </PurchaseSection>
        <PurchaseDivider />
        <PurchaseSection title="Endereço de cobrança">
          <TripPurchaseAddressForm {...address} />
        </PurchaseSection>
        <PurchaseDivider />
        <PurchaseSection title="Forma de pagamento">
          <input type="hidden" name="amount" id="amount" value={price.amount} />
          <RadioFields
            id="method"
            name="method"
            required
            defaultOption={PIX_PAYMENT_OPTION}
            options={PAYMENT_OPTIONS}
            onChange={(event: any) => setPaymentMethod(event.target.value)}
          />
          {paymentMethod == "PIX" ? (
            <>
              <TextField disabled label="Parcelamento" value={firstInstallmentOption?.label} />
              <input type="hidden" name="installments" id="installments" value={1} />
            </>
          ) : (
            <SelectField
              id="installments"
              name="installments"
              required
              label="Parcelamento"
              defaultOption={firstInstallmentOption}
              options={price.installmentOptions}
            />
          )}
        </PurchaseSection>
        <PurchaseSection>
          <SubmitButton variant="tertiary" submitting={submitting}>
            Comprar viagem por {formatByDataType(price.amount, "CURRENCY")}
          </SubmitButton>
        </PurchaseSection>
      </Grid>
    </form>
  );
};

const createPayload = (values: FormValues & { tripId: string; amount: number }): TripPayment => ({
  tripId: values.tripId,
  ipAddress: "",
  payer: {
    address: {
      address: values.address,
      city: values.city,
      complement: values.complement,
      country: values.country,
      neighborhood: values.neighborhood,
      number: values.number,
      postalCode: values.postalCode,
      stateProvince: values.stateProvince,
    },
    birthDate: parseBRStringToDate(values.birthDate),
    cpf: values.cpf,
    document: values.document,
    email: values.email,
    fullName: values.fullName,
    gender: values.gender,
    motherName: values.motherName,
    phone: values.phone.replace(/\D/g, ""),
  },
  amount: values.amount,
  installments: Number(values.installments) || 1,
  method: values.method === "PIX" ? "PIX" : "CREDIT_CARD",
  creditCard: null,
});

const PurchaseDivider = () => (
  <div style={{ margin: "0 -16px" }}>
    <Divider />
  </div>
);

const PurchaseSection = ({ title, children }: { title?: string; children: React.ReactNode }) => {
  return (
    <Grid columns={{ sm: ["150px", "1fr"] }} style={{ padding: "8px 0" }}>
      <Text heading size="xs">
        {title}
      </Text>
      <Grid>{children}</Grid>
    </Grid>
  );
};
