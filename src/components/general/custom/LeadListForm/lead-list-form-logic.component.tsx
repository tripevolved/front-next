import { ModalContent } from "@/components";
import { handleFormSubmit, sendFormData, SubmitHandler } from "@/helpers/form.helpers";
import { Grid, Modal, SubmitButton, TextField } from "mars-ds";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormLogicProps, Lead } from "./lead-list-form.types";

const ACTION_URL = "https://getlaunchlist.com/s/0l3TDN";

export function FormLogic({ cta, modal }: FormLogicProps) {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit: SubmitHandler<Lead> = async (data) => {
    setSubmitting(true);
    try {
      await sendFormData(ACTION_URL, data);
      const SuccessModal = () => <ModalContent className="text-center" {...modal?.success} />;
      Modal.open(SuccessModal, { size: "sm", onClose: () => router.replace("/") });
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
          mask={["(99) 9999-9999", "(99) 99999-9999"]}
        />
        <SubmitButton
          /* eslint-disable-next-line react/no-children-prop */
          children="Entrar na lista"
          variant="custom"
          backgroundColor="var(--color-primary-500)"
          color="var(--color-secondary-700)"
          hoverBackgroundColor="var(--color-brand-4)"
          {...cta}
          submitting={submitting}
        />
      </Grid>
    </form>
  );
}
