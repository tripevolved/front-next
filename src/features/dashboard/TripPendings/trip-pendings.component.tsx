import { GeneralHeader, Box, Text, SectionBase, Picture, EmptyState, GlobalLoader } from "@/ui";
import type { TripPendingsProps, TripPendingItemProps } from "./trip-pendings.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { useRouter } from "next/router";
import { Button, Modal } from "mars-ds";
import { PendingDocumentsModal } from "../PendingDocumentsModal";
import { ConfirmFlightModal } from "../ConfirmFlightModal";
import { useTripPendings } from "./trip-pendings.hook";

const mock: TripPendingItemProps[] = [
  {
    id: "6f6sd54s68f4s6",
    deadline: "2023-10-10",
    description: "Envie os seus documentos para viagem",
    title: "Enviar documentos",
    slug: "documents",
    isMandatory: true,
  },
  {
    id: "684s6d58fg6sd",
    deadline: "2023-11-14",
    description: "Confirme os seus voos",
    title: "Confirmar voos",
    slug: "flight",
    isMandatory: true,
  },
];

export function TripPendings({ className, children, sx, ...props }: TripPendingsProps) {
  const cn = makeCn("trip-pendings", className)(sx);

  const router = useRouter();
  const idParam = typeof router.query.id === "string" ? router.query.id : null;

  const text =
    "Confira suas pendências. É importante cumprir a lista para que tudo saia como o planejado.";

  const { isLoading, data, error } = useTripPendings();

  const getView = () => {
    if (error) return <EmptyState />;
    if (isLoading) return <GlobalLoader />;
    if (data === undefined) return <EmptyState />;

    return (
      <SectionBase className="trip-pendings__section">
        <Box className="trip-pendings__section__body">
          <Text size="md" className="trip-pendings__section__body__sub-title">
            {text}
          </Text>

          <Box className="trip-pendings__section__body__pending-list">
            {mock.map((pending, i) => (
              <TripPendingItem {...pending} key={i} />
            ))}
          </Box>
        </Box>
      </SectionBase>
    );
  };

  return (
    <div className={cn} {...props}>
      <GeneralHeader title="Pendências da viagem" backButton href={`/app/viagens/${idParam}`} />
      {getView()}
    </div>
  );
}

const TripPendingItem = ({
  id,
  isMandatory,
  slug,
  title,
  description,
  deadline,
}: TripPendingItemProps) => {
  const handleClick = () => {
    Modal.open(
      () => (
        <>
          {slug === "documents" && <PendingDocumentsModal />}
          {slug === "flight" && <ConfirmFlightModal />}
        </>
      ),
      {
        size: "sm",
        closable: true,
      }
    );
  };

  return (
    <>
      <Box className="trip-pending-item">
        <div>
          <Picture src={`/assets/trip-dashboard/pendings/${slug}.svg`} />
          <Text>{title}</Text>
        </div>
        <Button iconName="chevron-right" variant="naked" size="sm" onClick={() => handleClick()} />
      </Box>
    </>
  );
};
