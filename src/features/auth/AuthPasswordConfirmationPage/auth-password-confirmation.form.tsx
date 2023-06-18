import { useState } from "react";
import { PasswordField, PasswordStrongField } from "mars-ds";
import { AuthFormSection } from "../AuthFormSection";
import { SubmitHandler } from "@/utils/helpers/form.helpers";

type PasswordConfirmationData = Record<string, string>;

export function  AuthPasswordConfirmationForm() {
  const { submitting, confirmAccount } = useAccountConfirmation();
  const [data, setData] = useState<PasswordConfirmationData>({});
  const [passwordOK, setPasswordOK] = useState(false);

  const passwordConfirmationOK = data["password"] === data["passwordConfirmation"];
  const isValid = passwordOK && passwordConfirmationOK;

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = event.target as HTMLInputElement;
    setData((state: PasswordConfirmationData) => ({ ...state, [name]: value }));
  };

  return (
    <AuthFormSection
      heading="Defina sua senha para continuar"
      submitting={submitting}
      onSubmitHandler={confirmAccount}
      submitButton={{ children: "Continuar", disabled: !isValid }}
    >
      <PasswordStrongField
        name="password"
        required
        onValid={setPasswordOK}
        onChange={handleChange}
      />
      <PasswordField
        label="Confirme a sua senha"
        name="passwordConfirmation"
        minLength={8}
        onChange={handleChange}
        error={!passwordConfirmationOK}
        required
        disabled={submitting}
      />
    </AuthFormSection>
  );
}

const useAccountConfirmation = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const confirmAccount: SubmitHandler<{ password: string }> = ({ password }) => {
    setSubmitting(true)
    console.log(password)
  };

  return { submitting, error, confirmAccount };
};
