import type { Lead } from "@/types";
import type { ButtonProps, GridProps,  } from "mars-ds";

import { SubmitHandler, handleFormSubmit } from "@/helpers/form.helpers";
import { LeadApiService } from "@/services/api/lead";

import { Grid, SubmitButton, TextField } from "mars-ds";
import { useRouter } from "next/router";
import { useState } from "react";

interface LeadFormProps extends GridProps {
  cta?: ButtonProps;
  onSubmitCallback?: (lead: Lead) => void;
}

export const LeadForm = ({ cta, onSubmitCallback, ...props }: LeadFormProps) => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const referral = router.query.ref;

  const handleSubmit: SubmitHandler<Lead> = async (data) => {
    setSubmitting(true);
    try {
      const lead = await LeadApiService.create(data);
      onSubmitCallback?.(lead);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit(handleSubmit)}>
      <Grid {...props}>
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
};
