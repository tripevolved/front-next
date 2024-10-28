import type { StepComponentProps } from "@/features";
import { TripsApiService } from "@/services/api";

import { ErrorState, Text } from "@/ui";
import { useIdParam } from "@/utils/hooks/param.hook";
import { Button, Grid, Image, Skeleton } from "mars-ds";
import useSWR from "swr";

export function TripScriptBuilderFinalStep({ onNext }: StepComponentProps) {
  const idParam = useIdParam();

  const fetcher = async () => TripsApiService.getPriceById(idParam);
  const { isLoading, data, error } = useSWR(`trip-pricing-${idParam}`, fetcher);

  if (error) return <ErrorState />;

  return (
    <Skeleton active={isLoading}>
      <Grid className="trip-script-builder-step">
        <Image
          src={"/assets/script/finished-script.svg"}
          alt="target"
          width={299}
          height={158}
          className="trip-script-builder-step__image"
        />
        <Text heading size="sm" className="trip-script-builder-step__item">
          Roteiro criado com sucesso
        </Text>
        <Text className="trip-script-builder-step__item">
          Veja o seu roteiro completo clicando no botão abaixo. Você pode editar quando quiser.
        </Text>
        {data?.status === "PAID" ? (
          <Button
            className="trip-script-builder-step__item"
            href={`/app/viagens/${idParam}/roteiro`}
          >
            Ver meu roteiro
          </Button>
        ) : (
          <Button
            className="trip-script-builder-step__item"
            href={`/app/viagens/${idParam}/detalhes`}
          >
            Ver os detalhes da viagem
          </Button>
        )}
      </Grid>
    </Skeleton>
  );
}
