import { updateTravelerState } from "./update-traveler-state";
import { auth0 } from "@/lib/auth0";

const isGuest = () => !auth0.getAccessToken();
const isAuth = () => !isGuest();

export const UserService = {
  getCredentials: async () => await auth0.getAccessToken(),
  isGuest,
  isAuth,
  updateTravelerState: () => { if (isAuth()) updateTravelerState(); },
};
