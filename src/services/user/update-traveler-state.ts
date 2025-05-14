import { LocalStorageService } from "@/clients/local";
import { useAppStore } from "@/core/store";
import { TravelerApiService } from "@/services/api/traveler";
import { Notification } from "mars-ds";

export const updateTravelerState = async () => {
  try {
    const state = await TravelerApiService.getTravelerState();
    useAppStore.getState().setTravelerState(state);
    LocalStorageService.setTraveler({
      id: state.id,
      name: state.name,
    });
  } catch (error) {
    Notification.error("Não foi possível atualizar o seu estado.");
  }
};
