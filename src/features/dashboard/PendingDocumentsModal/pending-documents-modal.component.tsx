import type { PendingDocumentsModalProps } from "./pending-documents-modal.types";
import type { Traveler, TripTravelers } from "@/core/types";
import type { SelectFieldOption } from "@/ui";

import { Text, EmptyState, GlobalLoader, ErrorState, OptionsSelectField } from "@/ui";
import { TextField, FormWithSubmitButton, makeArray, Notification } from "mars-ds";
import { useEffect, useState } from "react";
import { TravelerApiService } from "@/services/api/traveler";
import useSwr from "swr";
import { parseDateToInputFormat } from "@/utils/helpers/dates.helpers";

export function PendingDocumentsModal({
  tripId,
  router,
  title,
  onFinish,
}: PendingDocumentsModalProps) {
  const uniqueKeyName = `travel-pending-${tripId}-type-traveler`;
  const fetcher = async () => TravelerApiService.getTripTravelers(tripId);
  const { isLoading, data, error } = useSwr<TripTravelers>(uniqueKeyName, fetcher);

  const [loadingPayload, setLoadingPayload] = useState(false);
  const [travelers, setTravelers] = useState<Traveler[]>([]);

  const handleChange = (index: number, traveler: Traveler) => {
    const updatedTravelers = travelers;
    updatedTravelers[index] = traveler;
    setTravelers(updatedTravelers);
  };

  const handleSubmit = async () => {
    setLoadingPayload(true);

    if (travelers.length == data?.travelerCount) {
      const payload = { ...(data as TripTravelers), travelers: travelers };

      await TravelerApiService.setTripTravelers(payload)
        .then(() => {
          Notification.success("Documentos enviados!");
          if (onFinish) onFinish();

          if (router) {
            const tripId = String(router.query.id);
            const pathname = `/app/viagens/${tripId}/pendencias`;
            router.replace(pathname);
          }
        })
        .catch(() => {
          Notification.error("Um erro inesperado ocorreu. Tente novamente!");
        })
        .finally(() => setLoadingPayload(false));
    } else {
      Notification.success("Documentos enviados!");
      if (onFinish) onFinish();
    }
  };

  useEffect(() => {
    setTravelers(data?.travelers ?? makeArray(data?.travelerCount!));
  }, []);

  if (error) return <ErrorState />;
  if (isLoading) return <GlobalLoader />;
  if (!data) return <EmptyState />;

  const dataTravelers: (Traveler | undefined)[] = data.travelers.length
    ? data.travelers
    : makeArray(data.travelerCount);

  return (
    <>
      {title ? (
        <Text heading style={{ color: "var(--color-brand-1)" }}>
          {title}
        </Text>
      ) : null}
      <FormWithSubmitButton
        onSubmit={handleSubmit}
        submitButtonLabel="Enviar"
        submitting={loadingPayload}
        title={title}
      >
        {dataTravelers.map((values, index) => (
          <TravelerPendingForm
            key={index}
            index={index}
            title={`Viajante ${index + 1}`}
            values={values as any}
            onChangeValue={handleChange}
          />
        ))}
      </FormWithSubmitButton>
    </>
  );
}

interface TravelerPendingFormProps {
  title: string;
  onChangeValue: (index: number, value: Traveler) => void;
  index: number;
  values?: Traveler;
}

const TravelerPendingForm = ({ title, index, onChangeValue, values }: TravelerPendingFormProps) => {
  const [traveler, setTraveler] = useState<Traveler>(values ?? {});

  const handleValue = (name: string) => (event: React.MouseEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    setTraveler({ ...traveler, [name]: value });
    onChangeValue(index, { ...traveler, [name]: value });
  };

  const handleGenderSelect = (option: SelectFieldOption) => {
    setTraveler({ ...traveler, gender: option.value });
    onChangeValue(index, { ...traveler, gender: option.value });
  };

  const fullTitle = values?.fullName ? `${title}: ${values.fullName}` : title;
  const genderOptions = [
    { label: "Feminino", value: "female" },
    { label: "Masculino", value: "male" },
  ];

  return (
    <>
      <Text size="lg" className="mt-lg">
        {fullTitle}
      </Text>
      <input type="hidden" value={traveler.id ?? undefined} id={`${index}.id`} />
      <TextField
        required
        label="Digite o nome completo do viajante"
        id={`${index}.fullName`}
        value={traveler.fullName}
        onChange={handleValue("fullName")}
      />
      <TextField
        required
        label="Digite o número de RG do viajante"
        id={`${index}.rg`}
        onChange={handleValue("rg")}
        maxLength={9}
        value={traveler.rg}
      />
      <TextField
        required
        label="Digite o número de CPF do viajante"
        id={`${index}.cpf`}
        onChange={handleValue("cpf")}
        mask={"999.999.999-99"}
        value={traveler.cpf}
      />
      <OptionsSelectField
        id="gender"
        name="gender"
        required={true}
        label="Sexo"
        defaultOption={
          traveler?.gender
            ? genderOptions.find((gender) => gender.value == traveler?.gender)
            : { label: "", value: "" }
        }
        options={genderOptions}
        onSelect={handleGenderSelect}
      />
      <TextField
        id="birthDate"
        name="birthDate"
        required={true}
        label="Data de Nascimento"
        type="date"
        onChange={handleValue("birthDate")}
        value={traveler?.birthDate ? parseDateToInputFormat(new Date(traveler.birthDate)) : ""}
      />
      <TextField
        required
        label="Digite o e-mail do viajante"
        id={`${index}.email`}
        type="email"
        onChange={handleValue("email")}
        value={traveler.email}
      />
    </>
  );
};
