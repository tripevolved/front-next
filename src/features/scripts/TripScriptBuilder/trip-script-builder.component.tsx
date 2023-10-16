import { PageTrip, TemplateStepsBuilder } from "@/features";
import { SCRIPT_BUILDER_STEPS } from "./trip-script-builder.steps";
import { useRouter } from "next/router";

export const TripScriptBuilder = () => {
  const router = useRouter();

  const tripId = String(router.query.id);
  return (
    <PageTrip seo={{ title: "Construa seu roteiro" }} backToText="Voltar à sua viagem" backToUrl={`/app/viagens/${tripId}`}>
      <TemplateStepsBuilder steps={SCRIPT_BUILDER_STEPS} />
    </PageTrip>
  );
};
