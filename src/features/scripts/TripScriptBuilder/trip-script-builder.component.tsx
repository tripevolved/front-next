import { PageTrip, TemplateStepsBuilder } from "@/features";
import { SCRIPT_BUILDER_STEPS } from "./trip-script-builder.steps";
import { useIdParam } from "@/utils/hooks/param.hook";

export const TripScriptBuilder = () => {
  const idParam = useIdParam();
  return (
    <PageTrip
      seo={{ title: "Construa seu roteiro" }}
      backToText="Voltar à sua viagem"
      backToUrl={`/app/viagens/${idParam}/detalhes/`}
    >
      <TemplateStepsBuilder steps={SCRIPT_BUILDER_STEPS} />
    </PageTrip>
  );
};
