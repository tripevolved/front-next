import type { PendingDocumentsModalProps } from "./pending-documents-modal.types";
import type { Traveler, TripTravelers } from "@/core/types";

import { Text, EmptyState, GlobalLoader } from "@/ui";
import { TextField, FormWithSubmitButton, makeArray } from "mars-ds";
import { usePostTripPendingDocuments } from "./pending-documents-modal.hook";
import { useState } from "react";
import { TravelerApiService } from "@/services/api/traveler";
import useSwr from "swr";

export function PendingDocumentsModal({ tripId }: PendingDocumentsModalProps) {
  const uniqueKeyName = `travel-pending-${tripId}-type-traveler`;
  const fetcher = async () => TravelerApiService.getTripTravelers(tripId);
  const { isLoading, data, error } = useSwr<TripTravelers>(uniqueKeyName, fetcher);

  const pendingDocuments = usePostTripPendingDocuments();

  const [travelers, setTravelers] = useState<Record<string, Traveler>>({});

  const handleChange = (name: string, value: string, id: string) => {
    setTravelers((state) => ({
      ...state,
      [id]: { ...state[id], [name]: value, id },
    }));
  };

  const handleSubmit = async () => {
    const payload = { ...(data as TripTravelers), travelers: Object.values(travelers) };
    await pendingDocuments.onSubmit(payload);
  };

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
  onChangeValue: (name: string, value: string, id: string) => void;
  index: number;
  values?: Partial<Traveler>;
}

const TravelerPendingForm = ({ title, index, onChangeValue, values }: TravelerPendingFormProps) => {
  const id = values?.id || String(index);


  const handleValue = (name: string) => (event: React.MouseEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    onChangeValue(name, value, id);
  };


  const fullTitle = values?.fullName ? `${title}: ${values.fullName}` : title;

  return (
    <>
      <Text size="lg" className="mt-lg">
        {fullTitle}
      </Text>
      <TextField
        required
        label="Digite o nome completo do viajante"
        id={`${id}.fullName`}
        value={values?.fullName}
        onChange={handleValue("fullName")}
      />
      <TextField
        required
        label="Digite o número de RG do viajante"
        id={`${id}.rg`}
        onChange={handleValue("rg")}
        mask={"99.999.999-9"}
        value={values?.rg}
      />
      <TextField
        required
        label="Digite o número de CPF do viajante"
        id={`${id}.cpf`}
        onChange={handleValue("cpf")}
        mask={"999.999.999-99"}
        value={values?.cpf}
      />
      <TextField
        required
        label="Digite o e-mail do viajante"
        id={`${id}.email`}
        type="email"
        onChange={handleValue("email")}
        value={values?.email}
      />
    </>
  );
};
