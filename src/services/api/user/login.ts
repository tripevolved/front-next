import type { User, UserCredentials } from "@/core/types";

import { ApiRequestService } from "../api-request.service";

export interface LoginDTO {
  email: string;
  password: string;
}

export type LoginResponse = User & UserCredentials;

export const login = async (body: LoginDTO): Promise<LoginResponse> => {
  const url = "/users/login";
  return ApiRequestService.post<LoginResponse>(url, body).then(({ data }) => data);
};
