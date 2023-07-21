import { EmptyState, GlobalLoader, Box, Text, DashedDivider, OptionsSelectField } from "@/ui";
import { PageAppBody, PageAppHeader } from "@/features";
import { useTripPayer } from "./trip-payer.hook";
import { useTripPrice } from "@/features/trips/TripDetailsPage/trip-price.hook";
import { useRouter } from "next/router";
import { Button, Grid, RadioFields, TextField, Notification } from "mars-ds";
import { formatByDataType } from "@/utils/helpers/number.helpers";
import { TripPayer, TripPayerAddress, TripPayment, TripPaymentCreditCardInfo, TripPaymentMethod } from "@/core/types";
import { PaymentsApiService } from "@/services/api";
import { useState } from "react";
import { CreditCardInformationSection } from "./credit-card-information.section";
import { PixInformationSection } from "./pix-information.section";

const MIN_PAYMENT = 100;
const MAX_INSTALLMENTS = 6;

export function TripPurchasePage() {
  const { isLoading, tripPayer, error } = useTripPayer();
  const { priceData } = useTripPrice();
  const [paymentMethod, setPaymentMethod] = useState<TripPaymentMethod>();
  
  const router = useRouter();
  const tripId = typeof router.query.id === "string" ? router.query.id : null;
  
  const priceTotal = priceData?.price! + priceData?.serviceFee!;
  
  const getOptions = () => {
    let maxInstallments = Math.min(Math.floor(priceTotal / MIN_PAYMENT), MAX_INSTALLMENTS);
    
    const options = [];
    for (let i = 1; i <= maxInstallments; i++) {
      options.push({ label: `${i}x de ${formatByDataType(priceTotal/i, "CURRENCY")}`, value: i.toString() });
    }
    return options;
  }
  const paymentOptions = [{ label: "Cartão de crédito", value: "CREDIT_CARD" }, { label: "Pix", value: "PIX" }];

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // TODO: understand what to do with optional fields
    const tripPayer = {
      fullName: event.target.fullName.value,
      email: event.target.email.value,
      phone:event.target.phone.value,
      cpf: event.target.cpf.value,
      gender: "M", // TODO: adjust
      address: {
        postalCode: event.target.postalCode.value,
        address: event.target.address.value,
        complement: event.target.complement.value,
        number: event.target.number.value,
        neighborhood: event.target.neighborhood.value,
        city: event.target.city.value,
        stateProvince: event.target.stateProvince.value,
        country: "Brasil"
      } as TripPayerAddress
    } as TripPayer;

    const tripPayment = {
      tripId: event.target.tripId.value,
      payer: tripPayer,
      amount: event.target.amount.value,
      installments: event.target.installments.value,
      method: event.target.method.value,
      creditCard: {
        number: event.target.creditCardNumber.value,
        expirationMonth: event.target.creditCardExpirationMonth.value,
        expirationYear: event.target.creditCardExpirationYear.value,
        cvc: event.target.creditCardCvc.value,
      } as TripPaymentCreditCardInfo
    } as TripPayment;

    const result = await PaymentsApiService.putTripPayment(tripPayment);
    if (!result?.isSuccess) {
      Notification.error(result.message);
    }
  }
    
  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;
  return (
    <>
      <PageAppHeader>
        COMPONENTE PARA VOLTAR
        <Text heading={true} size="sm">Comprar viagem</Text>
      </PageAppHeader>
      <PageAppBody>
        <form onSubmit={handleSubmit}>
          <Box className="trip-purchase__section">
            <Text heading={true} size="xs">Dados do viajante comprador</Text>
            <TextField
              id="fullName"
              name="fullName"
              required={true}
              className="trip-purchase__section__input"
              label="Nome do viajante comprador"
              value={tripPayer?.fullName} />
            <TextField
              id="cpf"
              name="cpf"
              required={true}
              className="trip-purchase__section__input"
              label="CPF do viajante comprador"
              value={tripPayer?.cpf}
              mask={"999.999.999-99"} />
          </Box>
          <DashedDivider className="trip-purchase__divider"/>
          <Box className="trip-purchase__section">
            <Text heading={true} size="xs">Contato</Text>
            <Text className="trip-purchase__section__content" heading={false} size="md">{tripPayer?.email}</Text>
            <input type="hidden" name="email" id="email" value={tripPayer?.email} />
            <input type="hidden" name="phone" id="phone" value={tripPayer?.phone} />
          </Box>
          <DashedDivider className="trip-purchase__divider"/>
          <Box className="trip-purchase__section">
            <Text heading={true} size="xs">Endereço de cobrança</Text>
            <TextField
              id="postalCode" name="postalCode"
              className="trip-purchase__section__input"
              required={true}
              label="CEP"
              value={tripPayer?.address?.postalCode}
              mask={"99999-999"} />
            <Grid columns={[2,1]}>
              <TextField
                id="city" name="city"
                className="trip-purchase__section__input"
                required={true}
                label="Cidade"
                value={tripPayer?.address?.city} />
              <TextField
                id="stateProvince" name="stateProvince"
                required={true}
                className="trip-purchase__section__input"
                label="UF"
                value={tripPayer?.address?.stateProvince ?? ""} />
            </Grid>
            <TextField
              id="address" name="address"
              className="trip-purchase__section__input"
              label="Endereço"
              value={tripPayer?.address?.address} />
            <Grid columns={[1,1,3]}>
              <TextField
                id="number" name="number"
                required={true}
                className="trip-purchase__section__input"
                label="Número"
                value={tripPayer?.address?.number} />
              <TextField
                id="complement" name="complement"
                className="trip-purchase__section__input"
                label="Complemento"
                value={tripPayer?.address?.complement ?? ""} />
              <TextField
                id="neighborhood" name="neighborhood"
                required={true}
                className="trip-purchase__section__input"
                label="Bairro"
                value={tripPayer?.address?.neighborhood ?? ""} />
            </Grid>
          </Box>
          <DashedDivider className="trip-purchase__divider" />
          <Box className="trip-purchase__section">
            <Text heading={true} size="xs">Forma de pagamento</Text>
            <input type="hidden" name="tripId" id="tripId" value={tripId!}/>
            <input type="hidden" name="amount" id="amount" value={priceTotal}/>
            <RadioFields
              id="method" name="method"
              required={true}
              className="trip-purchase__section__radio"
              options={paymentOptions}
              onChange={(event: any) => { setPaymentMethod(event.target.value); }} />
            <OptionsSelectField
              id="installments"
              name="installments"
              required={true}
              label="Parcelamento"
              options={getOptions()}
              defaultOption={getOptions()[0]}
              className="trip-purchase__section__input" />
          </Box>
          {paymentMethod && 
            (paymentMethod === "CREDIT_CARD"
              ? <CreditCardInformationSection />
              : <PixInformationSection />)
          }
          <Box className="trip-purchase__footer">
            <Button
              className="trip-purchase__footer__button"
              variant="custom"
              backgroundColor="var(--color-brand-2)"
              hoverBackgroundColor="var(--color-secondary-900)"
              color="white"
              type="submit">
              Comprar viagem por {formatByDataType(priceTotal, "CURRENCY")}
            </Button>
          </Box>
        </form>
      </PageAppBody>
    </>
  );
}
