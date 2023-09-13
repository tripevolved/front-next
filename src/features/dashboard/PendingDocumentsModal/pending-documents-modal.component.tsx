import { Text, Box, EmptyState, GlobalLoader } from "@/ui";
import type { PendingDocumentsModalProps } from "./pending-documents-modal.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { TextField, Button } from "mars-ds";
import { useTripPendingDocuments } from "./pending-documents-modal.hook";
import { useEffect, useState } from "react";
import { Traveler, TripTravelers } from "@/core/types";
import { TravelerApiService } from "@/services/api/traveler";
import useSwr from 'swr';
import { useRouter } from "next/router";

export function PendingDocumentsModal({
  className,
  children,
  sx,
  tripId,
  ...props
}: PendingDocumentsModalProps) {
  const cn = makeCn("pending-documents-modal", className)(sx);

  const router = useRouter();
  const idParam = typeof router.query.id === "string" ? router.query.id : null;
  const fetcher = async () => TravelerApiService.getTripTravelers(idParam!);

  const { isLoading, data, error: errorFetch } = useSwr(idParam, fetcher);

  const { error: errorSentDocs, sendDocs, dataSent } = useTripPendingDocuments(tripId);

  const [travelersDocs, setTravelersDocs] = useState<Traveler[]>([]);

  const setNewDocs = (doc: "rg" | "cpf" | "email", index: number, value: string) => {
    const updateTravelersDocs = [...travelersDocs];
    updateTravelersDocs[index] = {
      ...updateTravelersDocs[index],
      [doc]: value,
    };

    setTravelersDocs(updateTravelersDocs);
  };

  const handleButton = () => {
    const body = { ...data } as TripTravelers;

    body.travelers = [...travelersDocs];

    sendDocs(body);
  };

  const getView = () => {
    if (errorFetch) return <EmptyState />;
    if (isLoading) return <GlobalLoader />;
    if (data === undefined) return <EmptyState />;

    return (
      <>
        {data.travelers.map((pending: Traveler, i: number) => (
          <Box className="pending-documents-modal__field" key={i}>
            <Text size="lg" className="pending-documents-modal__field__label">
              Viajante {i + 1}: {pending.fullName}
            </Text>
            {!pending.rg && (
              <TextField
                value={pending.rg}
                onBlur={(e: any) => setNewDocs("rg", i, e.target.value)}
                className="pending-documents-modal__field__text-field"
                label="Digite o número de RG do viajante"
              />
            )}
            {!pending.cpf && (
              <TextField
                value={pending.cpf}
                className="pending-documents-modal__field__text-field"
                label="Digite o número de CPF do viajante"
                onBlur={(e: any) => setNewDocs("cpf", i, e.target.value)}
              />
            )}
            {!pending.email && (
              <TextField
                value={pending.email}
                className="pending-documents-modal__field__text-field"
                label="Digite o e-mail do viajante"
                onBlur={(e: any) => setNewDocs("email", i, e.target.value)}
              />
            )}
          </Box>
        ))}
      </>
    );
  };

  useEffect(() => {
    if (data?.travelers) {
      const initialTravelersDocs = data.travelers.map((traveler) => ({
        rg: traveler.rg || "",
        cpf: traveler.cpf || "",
        email: traveler.email || "",
        id: traveler.id,
        travelerId: traveler.travelerId,
      }));
      setTravelersDocs(initialTravelersDocs);
    }
  }, [data]);

  return (
    <div className={cn} {...props}>
      <Text heading size="xs" className="pending-documents-modal__title">
        Enviar documentos
      </Text>
      {getView()}

      <Button
        className="pending-documents-modal__button"
        disabled={isLoading || errorFetch}
        onClick={() => handleButton()}
      >
        {errorFetch && "Algo inesperado aconteceu"}
        {isLoading && "Enviando..."}
        {dataSent && "Documentos enviados!"}
        {!errorFetch && !isLoading && !dataSent && "Enviar"}
      </Button>
    </div>
  );
}
