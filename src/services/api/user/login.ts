import type { User } from "@/core/types";

import { ApiRequestService } from "../api-request.service";

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponse {
  idToken: string;
  accessToken: string;
  refreshToken: string;
}

export const login = async (body: LoginDTO): Promise<User> => {
  const url = "/users/login";
  return ApiRequestService.post<LoginResponse>(url, body).then(({ data }) => ({
    ...data,
    email: body.email,
  }));
};
