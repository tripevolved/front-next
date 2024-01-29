import { useState } from "react";
import { useRouter } from "next/router";

import { TextField } from "mars-ds";
import { AuthFormSection } from "../AuthFormSection";
import { SubmitHandler } from "@/utils/helpers/form.helpers";
import { UserApiService } from "@/services/api/user";
import { useAppStore } from "@/core/store";
import { LeadCreateDTO } from "@/core/types";

export function AuthRegisterForm() {
  const [submitting, setSubmitting] = useState(false);
  const { leadCreate, lead } = useAppStore();
  const router = useRouter();
  const redirectTo = String(router.query.redirectTo || "");

  const handleSubmit: SubmitHandler<LeadCreateDTO> = async (data) => {
    setSubmitting(true);
    try {
      const newLead = await UserApiService.uniqueSignUp(data);
      leadCreate(newLead);
      router.replace(
        `/app/cadastro/${encodeURIComponent(newLead.uniqueId!)}?email=${encodeURIComponent(
          newLead.email
        )}&redirectTo=${redirectTo}`
      );
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <AuthFormSection
      heading="Insira seus dados de cadastro para continuar"
      submitting={submitting}
      onSubmitHandler={handleSubmit}
      submitButton={{ children: "Continuar" }}
    >
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
    </AuthFormSection>
  );
}
