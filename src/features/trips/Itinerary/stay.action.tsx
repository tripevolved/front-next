import { TripStaySimplified } from "@/core/types";
import { Button, Icon, Modal } from "mars-ds";
import { useCallback, useEffect, useRef, useState } from "react";
import { CardHighlight, CircleProgressCustom, Picture } from "@/ui";
import { Text } from "@/ui";
import { StayDetailsModal } from "@/features/stays/StayDetailsModal";
import { StaysApiService } from "@/services/api";
import { useRouter } from "next/router";
import { StayNotMain } from "./stay.notMain.action";
import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { TripStayHighlightSection } from "../TripDetailsPage/trip-stay-highlight.section";
import { TripStayServiceItem } from "../TripStayServiceItem";

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
    const modal = Modal.open(
      () => {
        return (
          <StayDetailsModal
            allowEdit={false}
            tripId={tripId}
            tripStay={data}
            router={router}
            itineraryActionId={action.actionId}
            onCloseModal={() => modal.close()}
          />
        );
      },
      {
        closable: true,
        size: "md",
      }
    );
  }, [action.actionId, router, tripId]);

  if (!action.isMain) {
    return <StayNotMain action={action} showDetails={handleSeeDetails} />;
  }

  return (
    <div className="flex flex-column gap-md py-lg ml-xl">
      <div className="flex flex-row gap-xl  items-center">
        <Picture src={`/assets/destino/hospedagem.svg`} style={{ width: 40 }} />
        <Text as="h3" heading size="xs" className="my-auto">
          <strong>Hospedagem</strong>
        </Text>
      </div>
      {action.isReady ? (
        <div className="flex flex-row gap-xl">
          <div style={{ width: 40 }} />
          <div className="flex flex-column justify-start">
            <div className="flex flex-row gap-xl">
              <Picture
                alt={action.name}
                style={{ width: 140, maxHeight: 140, borderRadius: 15 }}
              >
                {action.coverImage ? parsePhoto(action.coverImage) : undefined}
              </Picture>
              <div>
                <Text as="h1" size="xs" style={{ padding: 0 }}>
                  <strong>{action.name}</strong>
                </Text>
                <Text as="p" size="xs" style={{marginTop: 0}}>
                  <strong style={{ color: "var(--color-brand-4" }}>{action.tags}</strong>
                </Text>
                {action.boardChoices.length === 1 && (
                  <TripStayServiceItem title={action.boardChoices[0].boardChoice ?? ""} type={action.boardChoices[0].boardType === "BB" ? "breakfast" : null} />
                )}
              </div>
            </div>
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
              onClick={handleSeeDetails}
            >
              {" "}
              Ver Detalhes
            </Button>
            {action.highlight && (<TripStayHighlightSection highlight={action.highlight} />)}
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
