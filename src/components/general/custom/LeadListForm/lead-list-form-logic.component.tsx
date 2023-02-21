import { ModalContent } from "@/components";
import { handleFormSubmit, SubmitHandler } from "@/helpers/form.helpers";
import { Grid, Modal, SubmitButton, TextField } from "mars-ds";
import { useState } from "react";
import { FormLogicProps } from "./lead-list-form.types";

export const FormLogic = ({ cta, modal }: FormLogicProps) => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit: SubmitHandler<"name" | "email" | "phone"> = (data) => {
    setSubmitting(true);
    const SuccessModal = () => <ModalContent className="text-center" {...modal?.success} />
    Modal.open(SuccessModal, { size: "sm", onClose: () => setSubmitting(false) });
    console.log(data);
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
};
