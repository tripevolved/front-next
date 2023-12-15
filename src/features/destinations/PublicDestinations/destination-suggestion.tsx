import { Button, FormWithSubmitButton, Modal, Notification, TextField } from "mars-ds";
import { Text, Box } from "@/ui";
import { ProfileApiService } from "@/services/api";
import useSWR from "swr";
import { useAppStore } from "@/core/store";
import { useState } from "react";
import { DestinationSuggestionBody } from "@/services/api/profile/destinations";
import { handleFormSubmit } from "@/utils/helpers/form.helpers";

export const DestinationSuggestion = ({ destination }: { destination: string }) => {
  const handleSendSuggestion = () => {
    const modal = Modal.open(
      () => (
        <DestinationSuggestionFormModal
          onClose={() => {
            modal.close();
            location.reload();
          }}
          destination={destination}
        />
      ),
      { closable: true, size: "md" }
    );
  };

  return (
    <Box className="w-100 flex justify-content-center">
      <div className="flex-column align-items-center gap-xl p-lg w-100" style={{ maxWidth: 500 }}>
        <Text size="lg">Resultados para "{destination}"</Text>
        <Text heading size="md" style={{ color: "var(--color-brand-2)", textAlign: "center" }}>
          Opa! Ainda não temos este destino em nossa lista
        </Text>
        <Text style={{ color: "var(--color-gray-1)", textAlign: "center" }} size="lg">
          Clique no botão abaixo para receber um aviso quando incluirmos este destino
        </Text>
        <Button variant="tertiary" onClick={() => handleSendSuggestion()}>
          Me avise quando incluir este destino!
        </Button>
      </div>
    </Box>
  );
};

export const DestinationSuggestionFormModal = ({
  destination,
  onClose,
}: {
  destination: string;
  onClose: VoidFunction;
}) => {
  const [data, setData] = useState<DestinationSuggestionBody>({});
  const [canSendData, setCanSendData] = useState(false);
  const { id: travelerId } = useAppStore((state) => state.travelerState);

  const fetcher = () =>
    ProfileApiService.sendDestinationSuggestion(data)
      .then(() => Notification.success("Solicitação enviada com Sucesso!"))
      .catch(() => Notification.error("Ops! Houve algum erro ao enviar sua solicitação..."))
      .finally(() => onClose());
  const { isLoading } = useSWR(canSendData ? "post-destination-suggestion" : null, fetcher);

  const handleSubmit = () => {
    if (data.email) setCanSendData(true);
  };

  return (
    <div className="flex w-100 py-xl justify-content-center align-content-center">
      <FormWithSubmitButton
        submitButtonLabel="Enviar"
        onSubmit={handleFormSubmit(handleSubmit)}
        submitting={isLoading}
        style={{ maxWidth: 600 }}
      >
        <Text heading>Sugestão de Destino: {destination}</Text>
        <Text style={{ color: "var(--color-gray-1)", textAlign: "center" }} size="lg">
          Assim que este destino for adicionado você será avisado!
        </Text>
        <TextField
          name="email"
          minLength={3}
          label="Email"
          onChange={(e: any) =>
            setData({
              ...data,
              destination,
              travelerId,
              email: e.target.value,
            })
          }
        />
      </FormWithSubmitButton>
    </div>
  );
};
