import type { Lead, LeadCreateDTO } from "@/core/types";
import type { ButtonProps, GridProps } from "mars-ds";

import { SubmitHandler, handleFormSubmit } from "@/utils/helpers/form.helpers";
import { LeadApiService } from "@/services/api/lead";

import { Grid, SubmitButton, TextField } from "mars-ds";
import { useState } from "react";
import { useAppStore } from "@/core/store";
import { InlineGoogleTagManager } from "@/utils/libs/google-scripts";
import { sendGTMEvent } from "@next/third-parties/google";

interface LeadFormProps extends GridProps {
  cta?: ButtonProps;
  onSubmitCallback?: (lead: Lead) => void;
}

export const LeadForm = ({ cta, onSubmitCallback, ...props }: LeadFormProps) => {
  const [submitting, setSubmitting] = useState(false);
  const { leadCreate, lead } = useAppStore();

  const handleSubmit: SubmitHandler<LeadCreateDTO> = async (data) => {
    setSubmitting(true);
    try {
      const newLead = await LeadApiService.create(data);
      leadCreate(newLead);

      sendGTMEvent({ event: "conversion", send_to: "AW-11471805885/BUJnCN21-MEZEL27l94q" });

      onSubmitCallback?.(newLead);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <>
      <InlineGoogleTagManager />
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
          <input type="hidden" name="inviterId" value={lead.invitedBy?.id} />
          <input type="hidden" name="inviterEmail" value={lead.invitedBy?.email} />
          <input type="hidden" name="affiliateId" value={lead.invitedBy?.affiliateId} />
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
    </>
  );
};
