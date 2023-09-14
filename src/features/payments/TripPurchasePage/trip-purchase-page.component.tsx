import {
  EmptyState,
  GlobalLoader,
  Box,
  Text,
  DashedDivider,
  OptionsSelectField,
  AutoCompleteTextField,
} from "@/ui";
import { PageAppBody, PageAppHeader } from "@/features";
import { useTripPayer } from "./trip-payer.hook";
import { useTripPrice } from "@/features/trips/TripDetailsPage/trip-price.hook";
import { useRouter } from "next/router";
import {
  Button,
  Grid,
  RadioFields,
  TextField,
  Notification,
  Modal,
  Loader,
  TextFieldLabel,
} from "mars-ds";
import { formatByDataType } from "@/utils/helpers/number.helpers";
import {
  TripPayer,
  TripPayerAddress,
  TripPayment,
  TripPaymentCreditCardInfo,
  TripPaymentMethod,
} from "@/core/types";
import { PaymentsApiService } from "@/services/api";
import { useState } from "react";
import { CreditCardInformationSection } from "./credit-card-information.section";
import { PixInformationSection } from "./pix-information.section";
import { TripPaymentResult } from "@/services/api/payments/payTrip";
import { TripPurchaseResponseSection } from "./trip-purchase-response.section";
import { IsPaidSection } from "./is-paid.section";
import { useAppStore } from "@/core/store";
import { ViaCepService } from "@/services/viacep";

const MIN_PAYMENT = 100;
const MAX_INSTALLMENTS = 6;

export function TripPurchasePage() {
  const { isLoading, tripPayer, error } = useTripPayer();
  const { priceData } = useTripPrice();
  const { travelerState } = useAppStore();
  const [paymentMethod, setPaymentMethod] = useState<TripPaymentMethod>();
  const [writeGender, setWriteGender] = useState(false);
  const [address, setAddress] = useState<Partial<TripPayerAddress>>({} as TripPayerAddress);

  const router = useRouter();
  const tripId = typeof router.query.id === "string" ? router.query.id : null;

  const priceTotal = priceData?.price! + priceData?.serviceFee!;

  const getOptions = () => {
    let maxInstallments = Math.min(Math.floor(priceTotal / MIN_PAYMENT), MAX_INSTALLMENTS);
    if (maxInstallments === 0) maxInstallments = 1;

    const options = [];
    for (let i = 1; i <= maxInstallments; i++) {
      options.push({
        label: `${i}x de ${formatByDataType(priceTotal / i, "CURRENCY")}`,
        value: i.toString(),
      });
    }
    return options;
  };
  const paymentOptions = [
    { label: "Cartão de crédito", value: "CREDIT_CARD" },
    { label: "Pix", value: "PIX" },
  ];
  const genderOptions = [
    { label: "Feminino", value: "female" },
    { label: "Masculino", value: "male" },
    { label: "Não-binário", value: "non_binary" },
    { label: "Transgênero", value: "transgender" },
    { label: "Intersexo", value: "intersex" },
    { label: "Prefiro não dizer", value: "" },
    { label: "Quero escrever", value: "write" },
  ];

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    let gender = event.target.gender.value;
    const tripPayer = {
      fullName: event.target.fullName.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      cpf: event.target.cpf.value,
      gender: gender === "write" ? event.target.genderText.value : gender,
      address: {
        postalCode: event.target.postalCode.value,
        address: event.target.address.value,
        complement: event.target.complement.value,
        number: event.target.number.value,
        neighborhood: event.target.neighborhood.value,
        city: event.target.city.value,
        stateProvince: event.target.stateProvince.value,
        country: "Brasil",
      } as TripPayerAddress,
    } as TripPayer;

    const paymentMethod = event.target.method.value;
    let isCreditCard = paymentMethod === "CREDIT_CARD";

    const tripPayment = {
      tripId: event.target.tripId.value,
      payer: tripPayer,
      amount: event.target.amount.value,
      installments: event.target.installments.value,
      method: paymentMethod,
      creditCard: isCreditCard
        ? ({
            number: event.target.creditCardNumber.value,
            expirationMonth: event.target.creditCardExpirationMonth.value,
            expirationYear: event.target.creditCardExpirationYear.value,
            cvc: event.target.creditCardCvc.value,
          } as TripPaymentCreditCardInfo)
        : null,
    } as TripPayment;

    openLoadingModal();
    const result = await PaymentsApiService.putTripPayment(tripPayment);
    if (!result) {
      openFinishModal({
        isSuccess: false,
        message: "Houve um erro no pagamento!",
        tripId: tripId!,
      });
    } else {
      openFinishModal(result);
    }
  };

  const openFinishModal = (result: TripPaymentResult) => {
    Modal.open(
      () => (
        <>
          <TripPurchaseResponseSection
            tripId={tripId!}
            isSuccess={result.isSuccess}
            message={result.message!}
          />
        </>
      ),
      {
        size: "lg",
        closable: !result.isSuccess,
      }
    );
  };

  const openLoadingModal = () => {
    Modal.open(
      () => (
        <Box className="trip-purchase__response">
          <Loader />
          <Text className="trip-purchase__response-item" size="lg">
            Estamos processando sua compra.
          </Text>
        </Box>
      ),
      {
        size: "lg",
        closable: true,
      }
    );
  };

  const openIsPaidModal = () => {
    Modal.open(
      () => (
        <>
          <IsPaidSection tripId={tripId!} />
        </>
      ),
      {
        size: "lg",
        closable: false,
      }
    );
  };

  const handleAddressSearch = async (zipCode?: string) => {
    if (!zipCode?.length < 9) return;
    const cleanPostalCode = zipCode.replace(/-/g, "");

    const addressData = await ViaCepService.getAddress(cleanPostalCode);
    if (!addressData) return;

    const newAddress: Partial<TripPayerAddress> = {
      address: addressData?.logradouro,
      neighborhood: addressData?.bairro,
      city: addressData?.localidade,
      stateProvince: addressData?.uf,
    };

    setAddress(newAddress);
  };

  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;

  if (priceData?.isPaid) openIsPaidModal();

  return (
    <>
      <PageAppHeader
        title="Comprar viagem"
        backButton={true}
        href={`/app/viagens/criar/${tripId}`}
      />
      <PageAppBody>
        <form onSubmit={handleSubmit}>
          <Box className="trip-purchase__section">
            <Text heading={true} size="xs">
              Dados do viajante comprador
            </Text>
            <TextField
              id="fullName"
              name="fullName"
              required={true}
              className="trip-purchase__section__input"
              label="Nome do viajante comprador"
              value={tripPayer?.fullName}
            />
            <TextField
              id="cpf"
              name="cpf"
              required={true}
              className="trip-purchase__section__input"
              label="CPF do viajante comprador"
              value={tripPayer?.cpf}
              mask={"999.999.999-99"}
            />
            <OptionsSelectField
              id="gender"
              name="gender"
              required={true}
              label="Qual opção melhor descreve você?"
              options={genderOptions}
              onSelect={(option) => {
                if (option.value == "write") setWriteGender(true);
                else setWriteGender(false);
              }}
              className="trip-purchase__section__input"
            />
            {writeGender && (
              <TextField
                id="genderText"
                name="genderText"
                className="trip-purchase__section__input"
                label="Opção que melhor descreve você"
              />
            )}
          </Box>
          <DashedDivider className="trip-purchase__divider" />
          <Box className="trip-purchase__section">
            <Text heading={true} size="xs">
              Contato
            </Text>
            <Text className="trip-purchase__section__content" heading={false} size="md">
              {tripPayer?.email ?? travelerState.email}
            </Text>
            <input type="hidden" name="email" id="email" value={tripPayer?.email} />
            <input type="hidden" name="phone" id="phone" value={tripPayer?.phone} />
          </Box>
          <DashedDivider className="trip-purchase__divider" />
          <Box className="trip-purchase__section">
            <Text heading={true} size="xs">
              Endereço de cobrança
            </Text>
            <TextField
              id="postalCode"
              name="postalCode"
              className="trip-purchase__section__input"
              required={true}
              label="CEP"
              value={tripPayer?.address?.postalCode}
              onBlur={(e) => handleAddressSearch(e.target.value)}
              mask={"99999-999"}
            />
            <Grid columns={[2, 1]}>
              <TextField
                id="city"
                name="city"
                className="trip-purchase__section__input"
                required={true}
                label="Cidade"
                value={tripPayer?.address?.city || address.city}
              />
              <TextField
                id="stateProvince"
                name="stateProvince"
                required={true}
                className="trip-purchase__section__input"
                label="UF"
                value={tripPayer?.address?.stateProvince || address.stateProvince}
              />
            </Grid>
            <TextField
              id="address"
              name="address"
              className="trip-purchase__section__input"
              label="Endereço"
              value={tripPayer?.address?.address || address.address}
            />
            <Grid columns={[1, 1, 3]}>
              <TextField
                id="number"
                name="number"
                required={true}
                className="trip-purchase__section__input"
                label="Número"
                value={tripPayer?.address?.number}
              />
              <TextField
                id="complement"
                name="complement"
                className="trip-purchase__section__input"
                label="Complemento"
                value={tripPayer?.address?.complement ?? ""}
              />
              <TextField
                id="neighborhood"
                name="neighborhood"
                required={true}
                className="trip-purchase__section__input"
                label="Bairro"
                value={tripPayer?.address?.neighborhood || address.neighborhood}
              />
            </Grid>
          </Box>
          <DashedDivider className="trip-purchase__divider" />
          <Box className="trip-purchase__section">
            <Text heading={true} size="xs">
              Forma de pagamento
            </Text>
            <input type="hidden" name="tripId" id="tripId" value={tripId!} />
            <input type="hidden" name="amount" id="amount" value={priceTotal} />
            <RadioFields
              id="method"
              name="method"
              required={true}
              className="trip-purchase__section__radio"
              options={paymentOptions}
              onChange={(event: any) => {
                setPaymentMethod(event.target.value);
              }}
            />
            <OptionsSelectField
              id="installments"
              name="installments"
              required={true}
              label="Parcelamento"
              options={getOptions()}
              defaultOption={getOptions()[0]}
              className="trip-purchase__section__input"
            />
          </Box>
          {paymentMethod &&
            (paymentMethod === "CREDIT_CARD" ? (
              <CreditCardInformationSection />
            ) : (
              <PixInformationSection />
            ))}
          <Box className="trip-purchase__footer">
            <Button
              className="trip-purchase__footer__button"
              variant="custom"
              backgroundColor="var(--color-brand-2)"
              hoverBackgroundColor="var(--color-secondary-900)"
              color="white"
              type="submit"
            >
              Comprar viagem por {formatByDataType(priceTotal, "CURRENCY")}
            </Button>
          </Box>
        </form>
      </PageAppBody>
    </>
  );
}
