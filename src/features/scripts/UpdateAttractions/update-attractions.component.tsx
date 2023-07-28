import { GeneralHeader } from "@/ui";
import type { UpdateAttractionsProps } from "./update-attractions.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { useRouter } from "next/router";

export function UpdateAttractions({ className, children, sx, ...props }: UpdateAttractionsProps) {
  const cn = makeCn("update-attractions", className)(sx);
  const router = useRouter();

  const tripIdParam = typeof router.query.id === "string" ? router.query.id : null;

  return (
    <div className={cn} {...props}>
      <GeneralHeader
        backButton
        href={`/app/viagens/roteiro/${tripIdParam}`}
        title={`Editar dia ${13}`}
      />
      {children}
    </div>
  );
}
