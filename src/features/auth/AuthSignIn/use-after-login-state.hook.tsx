import { useAppStore } from "@/core/store";
import { TravelerApiService } from "@/services/api/traveler";

export const useAfterLoginState = () => {
  const { setTravelerState } = useAppStore();

  const travelerStateGet = async () => {
    return TravelerApiService.getTravelerState()
      .then((state) => {
        setTravelerState(state);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { travelerStateGet };
};
