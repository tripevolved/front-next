import { type LoginDTO, UserApiService } from "@/services/api/user";
import { LoginResponse } from "@/services/api/user/login";
import { UserCredentials } from "./credentials";
import { updateTravelerState } from "./update-traveler-state";

export type LoginArgs = LoginDTO;
export type LoginCallback = (user: LoginResponse) => Promise<void>;

export const login = async (data: LoginArgs, callback?: LoginCallback) => {
  const response = await UserApiService.login(data);
  const { idToken, accessToken, refreshToken, ...user } = response;
  UserCredentials.set({ idToken, accessToken, refreshToken });
  await updateTravelerState();
  await callback?.(response);
  return user;
};
