import type { Lead, LeadCreateDTO } from "@/core/types";
import type { ButtonProps, GridProps } from "mars-ds";

import { SubmitHandler, handleFormSubmit } from "@/utils/helpers/form.helpers";
import { LeadApiService } from "@/services/api/lead";
import { GTMService } from "@/services/analytics/gtm-service";
import { DATA_LAYER_NAME } from "@/services/analytics/constants";

import { Grid, SubmitButton, TextField } from "mars-ds";
import { useState } from "react";
import { useAppStore } from "@/core/store";
import { useRouter } from "next/router";

interface LeadFormProps extends GridProps {
  cta?: ButtonProps;
  isConsultancy?: Boolean;
  onSubmitCallback?: (lead: Lead) => void;
}

export const LeadForm = ({ cta, isConsultancy, onSubmitCallback, ...props }: LeadFormProps) => {
  const [submitting, setSubmitting] = useState(false);
  const { leadCreate, lead } = useAppStore();
  const router = useRouter();

  const handleSubmit: SubmitHandler<LeadCreateDTO> = async (data) => {
    setSubmitting(true);
    try {
      const newLead = await LeadApiService.create(data);
      leadCreate(newLead);

      GTMService.addEvent({
        event: "conversion",
        dataLayerName: DATA_LAYER_NAME,
        k: { send_to: "AW-11471805885/BUJnCN21-MEZEL27l94q" },
      });

      if (onSubmitCallback) {
        onSubmitCallback(newLead);
      } else {
        setSubmitting(false);
        isConsultancy && alert("Obrigado! Entraremos em contato para começarmos a trabalhar na sua viagem dos sonhos em até 24h úteis.");
        router.reload();
      }
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
        <input type="hidden" name="inviterId" value={lead.invitedBy?.id} />
        <input type="hidden" name="inviterEmail" value={lead.invitedBy?.email} />
        <input type="hidden" name="affiliateId" value={lead.invitedBy?.affiliateId} />
        {isConsultancy && <input type="hidden" name="sourceId" value={"consultoria"} />}
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
