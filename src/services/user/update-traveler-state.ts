import { LocalStorageService } from "@/clients/local";
import { useAppStore } from "@/core/store";
import { TravelerApiService } from "@/services/api/traveler";

export const updateTravelerState = async () => {
  try {
    const state = await TravelerApiService.getTravelerState();
    useAppStore.getState().setTravelerState(state);
    if (state) {
      LocalStorageService.setTraveler({
        id: state.id,
        name: state.name,
      });
    }
  } catch (error) {
    console.error("Não foi possível atualizar o seu estado.", error);
  }
};
