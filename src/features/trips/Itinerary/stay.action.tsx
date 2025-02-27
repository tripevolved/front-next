import { TripStaySimplified } from "@/core/types";
import { Button, Icon, Modal } from "mars-ds";
import { useCallback, useEffect, useRef, useState } from "react";
import { CircleProgressCustom, FeatureIcon, Picture } from "@/ui";
import { Text } from "@/ui";
import { StayDetailsModal } from "@/features/stays/StayDetailsModal";
import { StaysApiService } from "@/services/api";
import { useRouter } from "next/router";
import { StayNotMain } from "./stay.notMain.action";
import { parsePhoto } from "@/utils/helpers/photo.helpers";

interface Props {
  action: TripStaySimplified;
  tripId: string;
}
export const StayAction = ({ action, tripId }: Props) => {
  const router = useRouter();
  const [loadingStayValue, setLoadingStayValue] = useState(0);
  const timerRef = useRef<NodeJS.Timer | undefined>();
  useEffect(() => {
    if (!action.isReady) {
      timerRef.current = setInterval(() => {
        setLoadingStayValue((curr) => (curr < 100 ? curr + 10 : 0));
      }, 1000);
    } else if (action.isReady) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
    return () => {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    };
  }, [action.isReady]);
  const handleSeeDetails = useCallback(async () => {
    const data = await StaysApiService.getByTripId(tripId, action.actionId);
    Modal.open(() => <StayDetailsModal tripStay={data} />, {
      closable: true,
      size: "md",
    });
  }, [action.actionId, tripId]);

  const handleEditStay = useCallback(() => {
    const route = `/app/viagens/${tripId}/hospedagem/editar/${action.actionId}`;
    router.push(route);
  }, [router, action.actionId, tripId]);

  if (!action.isMain) {
    return <StayNotMain action={action} showDetails={handleSeeDetails} />;
  }

  return (
    <div className="flex flex-column gap-md py-lg ml-xl">
      <div className="flex flex-row gap-xl items-center">
        <Picture src={`/assets/destino/hospedagem.svg`} style={{ width: 40 }} />
        <Text as="h3" heading size="xs" className="my-auto">
          <strong>Hospedagem</strong>
        </Text>
        <Button style={{ border: "none" }} size="sm" variant="neutral" onClick={handleEditStay}>
          <FeatureIcon name="pencil" size={20} />
          <label style={{ fontWeight: 700, paddingLeft: 8 }}>Editar</label>
        </Button>
      </div>
      {action.isReady ? (
        <div className="flex flex-row gap-xl">
          <div style={{ width: 40 }} />
          <div className="flex flex-column justify-start">
            <div className="flex flex-row gap-xl">
              {action.coverImage === null || action.coverImage === undefined ? (
                <Picture
                  src="/assets/destino/hotel-casa-grande.png"
                  alt={action.name}
                  style={{ width: 50, height: 50 }}
                />
              ) : (
                <Picture alt={action.name} style={{ width: 50, height: 50 }}>
                  {parsePhoto(action.coverImage)}
                </Picture>
              )}

              <div>
                <Text as="h1" size="xs" style={{ padding: 0 }}>
                  <strong>{action.name}</strong>
                </Text>
                <Text as="p" size="xs">
                  <strong style={{ color: "var(--color-brand-4" }}>{action.tags}</strong>
                </Text>
              </div>
            </div>

            <Text as="p" size="xs" style={{ marginTop: 0 }}>
               Infelizmente não encontramos sua hospedagem ideal nesse momento, mas você pode a sua
              <Button
                variant="neutral"
                size="sm"
                style={{
                  border: "none",
                  textDecoration: "underline",
                  alignSelf: "flex-start",
                  padding: 0,
                  fontWeight: 500,
                  marginTop: 10,
                }}
                onClick={handleEditStay}
              >
                 aqui
              </Button>
            </Text>
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-xl">
          <div style={{ width: 40 }} />
          <div className="flex flex-column justify-center gap-md">
            <div className="m-auto">
              <CircleProgressCustom percentage={loadingStayValue}>
                <Icon color="white" name={"map"} />
              </CircleProgressCustom>
            </div>
            <Text className="opacity-animation"> {action.message}</Text>
          </div>
        </div>
      )}
    </div>
  );
};
