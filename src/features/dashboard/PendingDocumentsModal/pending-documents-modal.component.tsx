import type { PendingDocumentsModalProps } from "./pending-documents-modal.types";
import type { Traveler, TripTravelers } from "@/core/types";

import { Text, EmptyState, GlobalLoader } from "@/ui";
import { TextField, FormWithSubmitButton, makeArray } from "mars-ds";
import { usePostTripPendingDocuments } from "./pending-documents-modal.hook";
import { useEffect, useState } from "react";
import { TravelerApiService } from "@/services/api/traveler";
import useSwr from "swr";

export function PendingDocumentsModal({ tripId }: PendingDocumentsModalProps) {
  const uniqueKeyName = `travel-pending-${tripId}-type-traveler`;
  const fetcher = async () => TravelerApiService.getTripTravelers(tripId);
  const { isLoading, data, error } = useSwr<TripTravelers>(uniqueKeyName, fetcher);

  const pendingDocuments = usePostTripPendingDocuments();

  const [travelers, setTravelers] = useState<Traveler[]>([]);

  const handleChange = (index: number, traveler: Traveler) => {
    const updatedTravelers = travelers;
    updatedTravelers[index] = traveler;
    setTravelers(updatedTravelers);
  };

  const handleSubmit = async () => {
    console.log(travelers);
    const payload = { ...(data as TripTravelers), travelers: Object.values(travelers) };
    await pendingDocuments.onSubmit(payload);
  };

  useEffect(() => {
    setTravelers(data?.travelers ?? makeArray(data?.travelerCount!));
  }, []);


  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;
  if (!data) return <EmptyState />;

  const dataTravelers: (Traveler | undefined)[] = data.travelers.length
    ? data.travelers
    : makeArray(data.travelerCount);

  return (
    <FormWithSubmitButton
      onSubmit={handleSubmit}
      submitButtonLabel="Enviar"
      submitting={pendingDocuments.isSubmitting}
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

  const fullTitle = values?.fullName ? `${title}: ${values.fullName}` : title;

  return (
    <>
      <Text size="lg" className="mt-lg">
        {fullTitle}
      </Text>
      <input type="hidden" value={traveler.id ?? undefined} id={`${index}.id`}/>
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
        maxLength={10}
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
