import { EmptyState, GeneralHeader, GlobalLoader, SectionBase, Text } from "@/ui";
import type { UpdateAttractionsProps } from "./update-attractions.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { useRouter } from "next/router";
import { useUpdateAttractions } from "./update-attractions.hook";
import { TripScriptDay } from "@/core/types";

export function UpdateAttractions({ className, children, sx, ...props }: UpdateAttractionsProps) {
  const cn = makeCn("update-attractions", className)(sx);
  const router = useRouter();

  const tripIdParam = typeof router.query.id === "string" ? router.query.id : null;

  const { data, error, isLoading } = useUpdateAttractions();

  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;
  if (data === undefined || data === ({} as TripScriptDay)) return <EmptyState />;

  return (
    <>
      <GeneralHeader
        backButton
        href={`/app/viagens/roteiro/${tripIdParam}`}
        title={`Editar ${data.date}`}
      />
      <SectionBase className={cn} {...props}>
        <Text heading>MAIS LEGAL</Text>
      </SectionBase>
    </>
  );
}
