import { Box, Text, DashedDivider } from "@/ui";
import { Grid, TextField } from "mars-ds";

export function CreditCardInformationSection() {
  return (
    <>
      <DashedDivider className="trip-purchase__divider" />
      <Box className="trip-purchase__section">
        <Text heading={true} size="xs">Cartão de crédito</Text>
        <TextField
          id="creditCardNumber"
          name="creditCardNumber"
          required={true}
          className="trip-purchase__section__input"
          label="Número do cartão"
          mask={"9999 9999 9999 9999"} />
        <Grid columns={[1, 1, 2]}>
          <TextField
            id="creditCardExpirationMonth" name="creditCardExpirationMonth"
            required={true}
            className="trip-purchase__section__input"
            label="Mês de validade"
            maxLength={2} />
          <TextField
            id="creditCardExpirationYear" name="creditCardExpirationYear"
            className="trip-purchase__section__input"
            label="Ano de validade"
            maxLength={2} />
          <TextField
            id="creditCardCvc" name="creditCardCvc"
            className="trip-purchase__section__input"
            label="CVV"
            maxLength={3} />
        </Grid>
      </Box>
    </>
  );
}
