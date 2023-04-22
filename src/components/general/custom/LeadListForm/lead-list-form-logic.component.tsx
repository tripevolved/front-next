import { handleFormSubmit, SubmitHandler } from "@/helpers/form.helpers";
import { LeadApiService } from "@/services/api/lead";
import { Lead } from "@/types";
import { Grid, SubmitButton, TextField } from "mars-ds";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormLogicProps } from "./lead-list-form.types";

export function FormLogic({ cta }: FormLogicProps) {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const referral = router.query.ref

  const handleSubmit: SubmitHandler<Lead> = async (data) => {
    setSubmitting(true);
    try {
      await LeadApiService.create(data);
      router.replace(`/inscrito`);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };
  return (
    <form className="theme-dark p-xl" onSubmit={handleFormSubmit(handleSubmit)}>
      <Grid columns={{ lg: [1, 1, 1, "220px"] }}>
        <TextField required name="name" label="Nome" minLength={3} />
        <TextField required name="email" label="Seu melhor e-mail" type="email" />
        <TextField
          required
          name="phone"
          label="Seu WhatsApp"
          type="tel"
          minLength={14}
          mask="(99) 99999-9999"
        />
        <input type="hidden" name="ref" value={referral} />
        <SubmitButton
          /* eslint-disable-next-line react/no-children-prop */
          children="Entrar na lista"
          variant="custom"
          backgroundColor="var(--color-secondary-700)"
          color="var(--color-white)"
          hoverBackgroundColor="var(--color-secondary-900)"
          {...cta}
          submitting={submitting}
        />
      </Grid>
    </form>
  );
}
