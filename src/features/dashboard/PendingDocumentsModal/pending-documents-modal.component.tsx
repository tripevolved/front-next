import { Text, Box, EmptyState, GlobalLoader } from "@/ui";
import type { PendingDocumentsModalProps } from "./pending-documents-modal.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { TextField, Button } from "mars-ds";
import { useTripPendingDocuments } from "./pending-documentos-modal.hook";
import { useEffect, useState } from "react";
import { Traveler } from "@/core/types";

export function PendingDocumentsModal({
  className,
  children,
  sx,
  tripId,
  ...props
}: PendingDocumentsModalProps) {
  const cn = makeCn("pending-documents-modal", className)(sx);

  const { isLoading, data, error } = useTripPendingDocuments(tripId);

  const [travelersDocs, setTravelersDocs] = useState<Traveler[]>([]);

  const setNewDocs = (doc: "rg" | "cpf" | "email", index: number, value: string) => {
    const updateTravelersDocs = [...travelersDocs];
    updateTravelersDocs[index] = {
      ...updateTravelersDocs[index],
      [doc]: value,
    };

    setTravelersDocs(updateTravelersDocs);
  };

  const getView = () => {
    if (error) return <EmptyState />;
    if (isLoading) return <GlobalLoader />;
    if (data === undefined) return <EmptyState />;

    return (
      <>
        {data.travelers.map((pending, i) => (
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

        <Button
          className="pending-documents-modal__button"
          onClick={() => console.log("OS DADOS", travelersDocs)}
        >
          Enviar
        </Button>
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
    </div>
  );
}
