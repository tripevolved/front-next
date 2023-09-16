import { Text, Box, EmptyState, GlobalLoader } from "@/ui";
import type { PendingDocumentsModalProps } from "./pending-documents-modal.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { TextField, Button } from "mars-ds";
import { useTripPendingDocuments } from "./pending-documents-modal.hook";
import { useEffect, useState } from "react";
import { Traveler, TripTravelers } from "@/core/types";
import { TravelerApiService } from "@/services/api/traveler";
import useSwr from "swr";
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
  const fetcher = async () => TravelerApiService.getTripTravelers(tripId!);

  const { isLoading: isLoadingFetch, data, error: errorFetch } = useSwr(tripId, fetcher);

  const {
    error: errorSentDocs,
    sendDocs,
    dataSent,
    isLoading: isLoadingSentDocs,
  } = useTripPendingDocuments();

  const [travelersDocs, setTravelersDocs] = useState<Traveler[]>([]);

  const setNewDocs = (doc: "rg" | "cpf" | "email" | "fullName", index: number, value: string) => {
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

    console.log("dados", body);

    sendDocs(body);
  };

  const buildTravelersForm = (travelerCount: number) => {
    return Array.from({ length: travelerCount }).map((_, index) => (
      <Box className="pending-documents-modal__field" key={index}>
        <Text size="lg" className="pending-documents-modal__field__label mb-md">
          Viajante {index + 1}:
        </Text>
        <TextField
          required
          onBlur={(e: any) => setNewDocs("fullName", index, e.target.value)}
          className="pending-documents-modal__field__text-field"
          label="Digite o nome completo do viajante"
        />
        <TextField
          required
          className="pending-documents-modal__field__text-field"
          label="Digite o e-mail do viajante"
          onBlur={(e: any) => setNewDocs("email", index, e.target.value)}
        />
        <TextField
          required
          onBlur={(e: any) => setNewDocs("rg", index, e.target.value)}
          className="pending-documents-modal__field__text-field"
          label="Digite o número de RG do viajante"
          mask={"99.999.999-9"}
        />
        <TextField
          required
          className="pending-documents-modal__field__text-field"
          label="Digite o número de CPF do viajante"
          mask={"999.999.999-99"}
          onBlur={(e: any) => setNewDocs("cpf", index, e.target.value)}
        />
      </Box>
    ));
  };

  const getView = () => {
    if (errorFetch) return <EmptyState />;
    if (isLoadingFetch) return <GlobalLoader />;
    if (data === undefined) return <EmptyState />;
    if (!data.travelers.length) return buildTravelersForm(data.travelerCount);

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
                mask={"99.999.999-9"}
              />
            )}
            {!pending.cpf && (
              <TextField
                value={pending.cpf}
                className="pending-documents-modal__field__text-field"
                label="Digite o número de CPF do viajante"
                mask={"999.999.999-99"}
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
    if (data?.travelers && data.travelers.length) {
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
        disabled={isLoadingFetch || errorFetch || !errorSentDocs}
        onClick={() => handleButton()}
      >
        {errorFetch ? "Algo inesperado aconteceu" : null}
        {isLoadingSentDocs ? "Enviando..." : null}
        {dataSent ? "Documentos enviados!" : null}
        {errorSentDocs ? "Erro ao enviar os documentos..." : null}
        {!errorFetch && !isLoadingFetch && !dataSent && "Enviar"}
      </Button>
    </div>
  );
}
