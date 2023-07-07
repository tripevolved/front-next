import { Text, Box, Button } from "@/ui";
import type { PendingDocumentsModalProps } from "./pending-documents-modal.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { TextField, TextFieldProps } from "mars-ds";
import { useEffect, useRef } from "react";

export function PendingDocumentsModal({
  className,
  children,
  sx,
  ...props
}: PendingDocumentsModalProps) {
  const cn = makeCn("pending-documents-modal", className)(sx);
  const textField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textField.current) {
      textField.current.focus();
    }
  }, []);

  return (
    <div className={cn} {...props}>
      <Text heading size="xs" className="pending-documents-modal__title">
        Enviar documentos
      </Text>

      <Box className="pending-documents-modal__field">
        <Text size="lg" className="pending-documents-modal__field__label">
          Viajante1: Maria Santos
        </Text>
        <TextField
          ref={textField}
          className="pending-documents-modal__field__text-field"
          label="Digite o número do RG"
        />
      </Box>

      <Box className="pending-documents-modal__field">
        <Text size="lg" className="pending-documents-modal__field__label">
          Viajante1: Maria Santos
        </Text>
        <TextField
          className="pending-documents-modal__field__text-field"
          label="Digite o número do RG"
        />
      </Box>

      <Button className="pending-documents-modal__button"> Enviar </Button>
    </div>
  );
}
