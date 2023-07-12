import { Text, Box, Button, EmptyState, GlobalLoader } from "@/ui";
import type { PendingDocumentsModalProps } from "./pending-documents-modal.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { TextField } from "mars-ds";
import { useTripPendingDocuments } from "./pending-documentos-modal.hook";
import { useState } from "react";
import { Traveler } from "@/core/types";

export function PendingDocumentsModal({
  className,
  children,
  sx,
  tripId,
  ...props
}: PendingDocumentsModalProps) {
  const cn = makeCn("pending-documents-modal", className)(sx);

  const [travelersDocs, setTravelersDocs] = useState<Traveler[]>([]);

  const { isLoading, data, error } = useTripPendingDocuments(tripId);

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
                onChange={(e: any) =>
                  setTravelersDocs([
                    ...travelersDocs,
                    { id: pending.id, travelerId: pending.travelerId, rg: e.target.value },
                  ])
                }
                className="pending-documents-modal__field__text-field"
                label="Digite o número de RG do viajante"
              />
            )}
            {!pending.cpf && (
              <TextField
                className="pending-documents-modal__field__text-field"
                label="Digite o número de CPF do viajante"
                onChange={(e: any) =>
                  setTravelersDocs([
                    ...travelersDocs,
                    { id: pending.id, travelerId: pending.travelerId, cpf: e.target.value },
                  ])
                }
              />
            )}
            {!pending.email && (
              <TextField
                className="pending-documents-modal__field__text-field"
                label="Digite o e-mail do viajante"
                onChange={(e: any) =>
                  setTravelersDocs([
                    ...travelersDocs,
                    { id: pending.id, travelerId: pending.travelerId, email: e.target.value },
                  ])
                }
              />
            )}
          </Box>
        ))}

        <Button
          className="pending-documents-modal__button"
          onClick={() => console.log("OS DADOS", travelersDocs)}
        >
          {" "}
          Enviar{" "}
        </Button>
      </>
    );
  };

  return (
    <div className={cn} {...props}>
      <Text heading size="xs" className="pending-documents-modal__title">
        Enviar documentos
      </Text>

      {getView()}
    </div>
  );
}
