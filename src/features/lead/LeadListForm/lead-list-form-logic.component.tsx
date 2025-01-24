import { useRouter } from "next/router";
import { FormLogicProps } from "./lead-list-form.types";
import { LeadForm } from "./lead-form.component";

export function FormLogic({ cta, source }: FormLogicProps) {
  const router = useRouter();

  const toSubscribedPage = () => router.replace(`/inscrito`);

  return (
    <div className="theme-dark p-xl">
      <LeadForm
        columns={{ lg: [1, 1, 1, "220px"] }}
        onSubmitCallback={source ? undefined : toSubscribedPage}
        source={source}
        cta={cta}
      />
    </div>
  );
}
