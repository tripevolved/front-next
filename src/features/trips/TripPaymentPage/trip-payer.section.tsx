import { Box, CardHighlight, DatePicker, SectionBase, Text } from "@/ui";
import { TextField } from "mars-ds";
import { TripPayer } from "./trip-payment-page.types";

interface TripPayerSectionProps {
  payer: Pick<TripPayer, "fullName" | "cpf" | "document" | "motherName" | "gender" | "birthDate"> | null;
};

export const TripPayerSection = ({ payer }: TripPayerSectionProps) => {
  return (
    <>
      <Text as="h2" heading size="xs" className="trip-content-item__desc__title">
        Dados do viajante comprador
      </Text>
      <Box className="trip-payment-section__box">
        <TextField
          className="trip-payment-section__text-field"
          type="text"
          label="Nome do viajante comprador"
          required={true}
          disabled={false}
          value={payer?.fullName}
          // onChange={handleTextChange}
        />
        <TextField
          className="trip-payment-section__text-field"
          type="text"
          label="CPF do viajante comprador"
          required={true}
          disabled={false}
          value={payer?.cpf}
          // onChange={handleTextChange}
        />
        <TextField
          className="trip-payment-section__text-field"
          type="text"
          label="RG do viajante comprador"
          required={true}
          disabled={false}
          value={payer?.document}
          // onChange={handleTextChange}
        />
        <TextField
          className="trip-payment-section__text-field"
          type="text"
          label="Nome da mãe do viajante comprador"
          required={false}
          disabled={false}
          value={payer?.motherName!}
          // onChange={handleTextChange}
        />
        <TextField
          className="trip-payment-section__text-field"
          type="text"
          label="Gênero do viajante comprador (RADIO)"
          required={true}
          disabled={false}
          value={payer?.gender}
          // onChange={handleTextChange}
        />
        {/* <DatePicker
          disabled={false}
          value={payer?.birthDate}
          // onChange={handleTextChange}
        /> */}
      </Box>
    </>
  );
};
