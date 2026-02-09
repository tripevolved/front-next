import { useAppStore } from "@/core/store";
import { TravelerService } from "@/clients/travelers";

export const updateTravelerState = async () => {
  try {
    const state = await TravelerService.getTravelerState();
    useAppStore.getState().setTravelerState(state);
  } catch (error) {
    console.error("Não foi possível atualizar o seu estado.", error);
  }
};
