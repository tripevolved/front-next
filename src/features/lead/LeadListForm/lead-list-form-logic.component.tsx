import { useRouter } from "next/router";
import { FormLogicProps } from "./lead-list-form.types";
import { LeadForm } from "./lead-form.component";

export function FormLogic({ cta, isConsultancy }: FormLogicProps) {
  const router = useRouter();

  const toSubscribedPage = () => router.replace(`/inscrito`);

  return (
    <div className="theme-dark p-xl">
      <LeadForm
        columns={{ lg: [1, 1, 1, "220px"] }}
        onSubmitCallback={isConsultancy ? undefined : toSubscribedPage}
        isConsultancy={isConsultancy}
        cta={cta}
      />
    </div>
  );
}
