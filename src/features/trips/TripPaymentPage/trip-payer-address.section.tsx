import { Box, Text } from "@/ui";
import { TextField } from "mars-ds";
import { TripPayerAddress } from "./trip-payment-page.types";

interface TripPayerAddressSectionProps {
  address: TripPayerAddress | null;
}

export const TripPayerAddressSection = ({ address }: TripPayerAddressSectionProps) => {
  return (
    <div className="trip-payment-section">
      <Box className="trip-payment-section__address">
        <Text as="h2" heading size="xs" className="trip-payment-section__title">
          Endereço de cobrança
        </Text>
        <TextField
            className="trip-payment-section__text-field"
            type="text"
            label="CEP"
            required={true}
            disabled={false}
            value={address?.postalCode}
            // onChange={handleTextChange}
        />
        <div>
          <TextField
              className="trip-payment-section__text-field"
              type="text"
              label="Cidade"
              required={true}
              disabled={false}
              value={address?.city}
              // onChange={handleTextChange}
          />
          <TextField
              className="trip-payment-section__text-field"
              type="text"
              label="UF"
              required={true}
              disabled={false}
              value={address?.stateProvince!}
              // onChange={handleTextChange}
          />
        </div>
        <TextField
            className="trip-payment-section__text-field"
            type="text"
            label="Endereço"
            required={true}
            disabled={false}
            value={address?.address}
            // onChange={handleTextChange}
        />
        <div>
          <TextField
              className="trip-payment-section__text-field"
              type="text"
              label="Número"
              required={true}
              disabled={false}
              value={address?.number}
              // onChange={handleTextChange}
          />
          <TextField
              className="trip-payment-section__text-field"
              type="text"
              label="Complemento"
              required={false}
              disabled={false}
              value={address?.complement!}
              // onChange={handleTextChange}
          />
        </div>
      </Box>
    </div>
  );
};
