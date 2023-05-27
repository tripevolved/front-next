import type { Lead } from "@/core/types";
import type { ButtonProps, GridProps } from "mars-ds";

import { SubmitHandler, handleFormSubmit } from "@/utils/helpers/form.helpers";
import { LeadApiService } from "@/services/api/lead";

import { Grid, SubmitButton, TextField } from "mars-ds";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAppStore } from "@/core/store";

interface LeadFormProps extends GridProps {
  cta?: ButtonProps;
  onSubmitCallback?: (lead: Lead) => void;
}

export const LeadForm = ({ cta, onSubmitCallback, ...props }: LeadFormProps) => {
  const [submitting, setSubmitting] = useState(false);
  const { leadStore } = useAppStore();
  const router = useRouter();
  const { affiliateId, ref: referral, email: referralEmail } = router.query;

  const handleSubmit: SubmitHandler<Lead> = async (data) => {
    setSubmitting(true);
    try {
      const lead = await LeadApiService.create(data);
      leadStore(lead)
      onSubmitCallback?.(lead);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <form className="text-left" onSubmit={handleFormSubmit(handleSubmit)}>
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
        <input type="hidden" name="affiliateId" value={affiliateId} />
        <input type="hidden" name="referralEmail" value={referralEmail} />
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
