import type { TripPayerAddress } from "@/core/types";
import { useRef, useState } from "react";
import { Grid, Skeleton, TextField } from "mars-ds";
import { ViaCepService } from "@/services/viacep";

type OnChange = React.FormEventHandler<HTMLInputElement>;

const handleValueChange =
  (handle: (value: string) => void): OnChange =>
  (event) =>
    handle((event.target as HTMLInputElement).value);

export const TripPurchaseAddressForm = (address: TripPayerAddress) => {
  const [data, setData] = useState<TripPayerAddress>(address);
  const [isLoading, setIsLoading] = useState(false);
  const started = useRef(false);

  const handleSetData = (newData: Partial<TripPayerAddress>) => {
    setIsLoading(false);
    setData((state) => ({ ...state, ...newData }));
  };

  const handleChangePostalCode = async (value: string) => {
    const postalCode = value.replace(/\D/, "");
    if (postalCode.length < 8) return;
    started.current = true;
    setIsLoading(true);
    const result = await ViaCepService.getAddress(postalCode);
    if (!result) return handleSetData({ postalCode });
    const newData: TripPayerAddress = {
      address: result.logradouro,
      city: result.localidade,
      complement: result.complemento,
      country: "Brasil",
      neighborhood: result.bairro,
      number: "",
      postalCode,
      stateProvince: result.uf,
    };
    handleSetData(newData);
  };

  return (
    <>
      <TextField
        id="postalCode"
        name="postalCode"
        required
        label="CEP"
        value={data.postalCode}
        onChange={handleValueChange(handleChangePostalCode)}
        mask={"99999-999"}
      />

      {started.current ? (
        <>
          <Skeleton active={isLoading}>
            <TextField id="address" name="address" label="Endereço" value={data.address} />
            <input type="hidden" value="Brasil" name="country" />
          </Skeleton>
          <Grid columns={2}>
            <Skeleton active={isLoading}>
              <TextField id="number" name="number" required label="Número" value={data.number} />
            </Skeleton>
            <Skeleton active={isLoading}>
              <TextField
                id="complement"
                name="complement"
                label="Complemento"
                value={data.complement || ""}
              />
            </Skeleton>
          </Grid>
          <Skeleton active={isLoading}>
            <TextField
              id="neighborhood"
              name="neighborhood"
              required
              label="Bairro"
              value={data.neighborhood}
            />
          </Skeleton>
          <Grid columns={[1, "84px"]}>
            <Skeleton active={isLoading}>
              <TextField
                disabled={Boolean(data.city)}
                id="city"
                required
                label="Cidade"
                value={data.city}
              />
              <input type="hidden" name="city" value={data.city} />
            </Skeleton>
            <Skeleton active={isLoading}>
              <TextField
                id="stateProvince"
                required
                label="UF"
                disabled={Boolean(data.stateProvince)}
                mask="AA"
                value={data.stateProvince}
              />
              <input type="hidden" name="stateProvince" value={data.stateProvince} />
            </Skeleton>
          </Grid>
        </>
      ) : null}
    </>
  );
};
