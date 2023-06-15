import { RegisterCity } from "@/services/api/register/cities";
import { RegisterApiService } from "@/services/api";
import { SubmitHandler } from "@/utils/helpers/form.helpers";
import { Notification } from "mars-ds";
import { useState } from "react";

export const useSetCity = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const city: SubmitHandler<RegisterCity> = async (data) => {
    setSubmitting(true);
    setError(false);
    return RegisterApiService.putRegisterCity(data)
      .catch(() => {
        Notification.error("Cidade inválida!")
        setSubmitting(false);
        setError(true);
      });
  };

  return { city, submitting, error };
};
