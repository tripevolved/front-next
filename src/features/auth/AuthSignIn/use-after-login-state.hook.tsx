import { useAppStore } from "@/core/store";
import { TravelerApiService } from "@/services/api/traveler";
import { Notification } from "mars-ds";

export const useSynchronizeTravelerState = () => {
  const setTravelerState = useAppStore((state) => state.setTravelerState);

  const syncTravelerState = async () => {
    try {
      const state = await TravelerApiService.getTravelerState();
      setTravelerState(state);
    } catch (error) {
      Notification.error("Não foi possível atualizar o seu perfil.");
    }
  };

  return { syncTravelerState };
};
