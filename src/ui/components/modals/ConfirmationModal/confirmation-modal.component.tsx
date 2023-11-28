import { Button, Divider, Grid, Modal } from "mars-ds";
import { GlobalLoader, ModalContent, Text } from "@/ui";
import { useState } from "react";

interface ConfirmationModalProps {
  text: string;
  onCancel: VoidFunction;
  onSuccess: VoidFunction;
  callback?: () => Promise<void>;
}

export const ConfirmationModal = ({
  text,
  onCancel,
  onSuccess,
  callback,
}: ConfirmationModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSuccess = async () => {
    if (typeof callback === "function") {
      setIsLoading(true);
      await callback();
    }
    onSuccess();
  };
  return (
    <ModalContent>
      <div style={{ height: 80 }} />
      {isLoading ? <GlobalLoader /> : null}
      <Grid style={{ maxWidth: 380 }} className="m-auto">
        <Text heading>Está certo disso?</Text>
        <Text>{text}</Text>
        <br />
        <Divider />
        <div className="flex gap-md justify-content-end flex-wrap">
          <Button variant="secondary" onClick={onCancel} disabled={isLoading}>
            Cancelar
          </Button>
          <Button variant="tertiary" onClick={handleSuccess} disabled={isLoading}>
            Confirmar
          </Button>
        </div>
      </Grid>
    </ModalContent>
  );
};

export const confirmModal = async (text: string, callback?: () => Promise<void>) => {
  return new Promise((resolve) => {
    Modal.open(
      ({ close }) => {
        const handleCancel = async () => {
          close();
          resolve(false);
        };

        const handleSuccess = () => {
          resolve(true);
          close();
        };

        return (
          <ConfirmationModal
            callback={callback}
            text={text}
            onCancel={handleCancel}
            onSuccess={handleSuccess}
          />
        );
      },
      { size: "sm", closable: false }
    );
  });
};
