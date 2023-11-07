import { useState } from "react";
import { TripTravelers } from "@/core/types";
import { TravelerApiService } from "@/services/api/traveler";
import { Notification } from "mars-ds";

export const usePostTripPendingDocuments = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (data: TripTravelers) => {
    setIsSubmitting(true);
    setError(false);

    return TravelerApiService.setTripTravelers(data)
      .then(() => {
        setSuccess(true);
        Notification.success("Documentos enviados!");
      })
      .catch(() => {
        setError(true);
        Notification.error("Um erro inesperado ocorreu.");
      })
      .finally(() => setIsSubmitting(false));
  };

  return { isSubmitting, error, onSubmit, success };
};
