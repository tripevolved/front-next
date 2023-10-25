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
import { useTripPurchase } from "./trip-purchase.hook";
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
import { ReactPortal, useRef, useState } from "react";
import { CreditCardInformationSection } from "./credit-card-information.section";
import { PixInformationSection } from "./pix-information.section";
import type { TripPaymentResult } from "@/services/api/payments/payTrip";
import {
  TripPurchaseErrorResponse,
  TripPurchaseSuccessResponse,
  TripPurchaseEmailMessage,
} from "./trip-purchase-response.section";
import { IsPaidSection } from "./is-paid.section";
import { useAppStore } from "@/core/store";
import { ViaCepService } from "@/services/viacep";
import useSwr from "swr";

const MIN_PAYMENT = 100;
const MAX_INSTALLMENTS = 6;

export function TripPurchasePage() {
  const { travelerState } = useAppStore();
  const fetcher = async () => PaymentsApiService.getPayerById(travelerState.id);
  const {
    isLoading,
    data: tripPayer,
    error,
    mutate,
  } = useSwr(`get-trip-payer-${travelerState.id}`, fetcher);

  const { priceData } = useTripPrice();
  const [paymentMethod, setPaymentMethod] = useState<TripPaymentMethod>();
  const [writeGender, setWriteGender] = useState(false);
  const [address, setAddress] = useState<Partial<TripPayerAddress>>({
    address: "",
    neighborhood: "",
    city: "",
    stateProvince: "",
  });
  const modalControlRef = useRef<any>();

  const router = useRouter();
  const tripId = String(router.query.id);

  const priceTotal = priceData?.price! + priceData?.serviceFee!;

  const pooling = async (cb: () => Promise<boolean>, timeout = 3000, maxTries = 20) => {
    if (maxTries <= 0) {
      modalControlRef.current.close();
      Modal.open(() => <TripPurchaseEmailMessage />, { closable: true });
      return;
    }
    const result = await cb().catch(() => false);
    if (result) return;
    await new Promise((resolve) => setTimeout(resolve, timeout));
    pooling(cb, timeout, maxTries - 1);
  };

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
      motherName: event.target.motherName.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      cpf: event.target.cpf.value,
      document: event.target.document.value,
      birthDate: event.target.birthDate.value,
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

    const tripPayment = {
      tripId: event.target.tripId.value,
      payer: tripPayer,
      amount: event.target.amount.value,
      installments: event.target.installments.value,
      method: paymentMethod,
    } as TripPayment;

    openLoadingModal();

    PaymentsApiService.postTripPaymentIntent(tripPayment)
      .then((resp) => openFinishModal(resp.isSuccess, { ...resp }))
      .catch(() =>
        openFinishModal(false, { message: "Houve um erro ao gerar o seu pagamento..." })
      );
  };

  const openFinishModal = (isSuccess: boolean, result: any) => {
    modalControlRef.current.close();
    modalControlRef.current = Modal.open(
      () => (
        <>
          {isSuccess ? (
            <TripPurchaseSuccessResponse
              {...result}
              onClose={() => modalControlRef.current.close()}
            />
          ) : (
            <TripPurchaseErrorResponse
              {...result}
              onClose={() => modalControlRef.current.close()}
            />
          )}
        </>
      ),
      {
        size: "lg",
        closable: true,
      }
    );

    pooling(
      () =>
        PaymentsApiService.getTripPaymentStatus(tripId).then((resp) => {
          if (resp.status == "NOT_STARTED") {
            Notification.warning("Realizando verificação de pagamento...");
            return false;
          }
          if (resp.status == "STARTED") {
            Notification.warning("Realizando verificação de pagamento...");
            return false;
          }
          if (resp.status == "CANCELED") {
            Notification.error("Pagamento Cancelado!");
            return false;
          }
          if (resp.status == "REFUSED") {
            Notification.error("Seu pagamento foi recusado!");
            return false;
          }
          Notification.success("Pagamento Aprovado com Sucesso!");
          router.push(`/app/viagens/${tripId}`);
          return true;
        }),
      10000,
      60 // 60 tries = 3 minutes
    );
  };

  const openLoadingModal = () => {
    modalControlRef.current = Modal.open(
      () => (
        <Box className="trip-purchase__response py-xl">
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

  const handleAddressSearch = async (zipCode?: string) => {
    // @ts-ignore
    if (zipCode?.length < 9) return;
    const cleanPostalCode = zipCode!.replace(/-/g, "");

    const addressData = await ViaCepService.getAddress(cleanPostalCode);
    if (!addressData) return;

    const newAddress = {
      ...tripPayer!,
      address: {
        ...tripPayer!.address,
        address: addressData.logradouro,
        neighborhood: addressData.bairro,
        city: addressData.localidade,
        stateProvince: addressData.uf,
      },
    } satisfies TripPayer;

    mutate(newAddress);
  };

  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;

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
            <TextField
              id="motherName"
              name="motherName"
              className="trip-purchase__section__input"
              label="Nome da mãe"
              value={tripPayer?.motherName ?? ""}
            />
            <TextField
              id="document"
              name="document"
              required={true}
              className="trip-purchase__section__input"
              label="Documento"
              value={tripPayer?.document ?? ""}
              mask={"99.999.999-9"}
            />
            <TextField
              id="birthDate"
              name="birthDate"
              required={true}
              className="trip-purchase__section__input"
              label="Data de Nascimento"
              type="date"
              // @ts-ignore
              value={tripPayer?.birthDate ?? ""}
            />
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
                value={tripPayer?.address.city}
              />
              <TextField
                id="stateProvince"
                name="stateProvince"
                required={true}
                className="trip-purchase__section__input"
                label="UF"
                value={tripPayer?.address.stateProvince}
              />
            </Grid>
            <TextField
              id="address"
              name="address"
              className="trip-purchase__section__input"
              label="Endereço"
              value={tripPayer?.address.address}
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
                value={tripPayer?.address.neighborhood}
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
