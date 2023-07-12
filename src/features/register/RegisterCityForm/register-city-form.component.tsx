import { RegisterApiService } from "@/services/api";
import { RegisterCityForm } from "./register-city-form.section";
import { useAfterLoginState } from "@/features/auth/AuthSignIn/use-after-login-state.hook";
import { Notification } from "mars-ds";

export function RegisterCity({ travelerId, onFinish }: { travelerId: string, onFinish: () => void }) {
  const { travelerStateGet } = useAfterLoginState();

  const handleRegisterCity = (cityId: string) => {
    RegisterApiService.putRegisterCity({
      cityId,
      travelerId: travelerId,
    })
    .then(() => {
      onFinish();
      travelerStateGet();
    })
    .catch(() => {
      Notification.error("Cidade inválida!");
    });
  };

  return (<RegisterCityForm onSubmit={handleRegisterCity} />);
}
