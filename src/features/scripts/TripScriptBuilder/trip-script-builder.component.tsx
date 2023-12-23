import { PageTrip, TemplateStepsBuilder } from "@/features";
import { SCRIPT_BUILDER_STEPS } from "./trip-script-builder.steps";
import { useIdParam } from "@/utils/hooks/param.hook";
import { useRouter } from "next/router";

export const TripScriptBuilder = () => {
  const idParam = useIdParam();
  const router = useRouter();

  const backToUrl = typeof router.query.voltarPara === "string" ? router.query.voltarPara : `/app/viagens/${idParam}/detalhes/`;

  return (
    <PageTrip
      seo={{ title: "Construa seu roteiro" }}
      backToText="Voltar à sua viagem"
      backToUrl={backToUrl}
    >
      <TemplateStepsBuilder steps={SCRIPT_BUILDER_STEPS} />
    </PageTrip>
  );
};
