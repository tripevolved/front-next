import { Box, CardHighlight, DatePicker, SectionBase, Text } from "@/ui";
import { TextField } from "mars-ds";
import { TripPayer } from "./trip-payment-page.types";

interface TripPayerSectionProps extends Pick<TripPayer, "fullName" | "cpf" | "document" | "motherName" | "gender" | "birthDate"> {}

export const TripPayerSection = ({ fullName, cpf, document, motherName, gender, birthDate }: TripPayerSectionProps) => {
  return (
    <SectionBase columns={{ md: [1, "320px"] }} gap={32} style={{ padding: "22px 15px" }}>
      <CardHighlight className="trip-payment-section" style={{ padding: "17px 10px" }}>
        <Text as="h2" size="xl" className="trip-payment-section__text">
          Dados do viajante comprador
        </Text>
        <Box className="trip-payment-section__box">
          <TextField
            className="trip-payment-section__text-field"
            type="text"
            label="Nome do viajante comprador"
            required={true}
            disabled={false}
            value={fullName}
            // onChange={handleTextChange}
          />
          <TextField
            className="trip-payment-section__text-field"
            type="text"
            label="CPF do viajante comprador"
            required={true}
            disabled={false}
            value={cpf}
            // onChange={handleTextChange}
          />
          <TextField
            className="trip-payment-section__text-field"
            type="text"
            label="RG do viajante comprador"
            required={true}
            disabled={false}
            value={document}
            // onChange={handleTextChange}
          />
          <TextField
            className="trip-payment-section__text-field"
            type="text"
            label="Nome da mãe do viajante comprador"
            required={false}
            disabled={false}
            value={motherName!}
            // onChange={handleTextChange}
          />
          <TextField
            className="trip-payment-section__text-field"
            type="text"
            label="Gênero do viajante comprador (RADIO)"
            required={true}
            disabled={false}
            value={gender}
            // onChange={handleTextChange}
          />
          {/* <DatePicker
            disabled={false}
            value={birthDate}
            // onChange={handleTextChange}
          /> */}
        </Box>
      </CardHighlight>
    </SectionBase>
  );
};
