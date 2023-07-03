import type { User, UserCredentials } from "@/core/types";

import { ApiRequest } from "@/services/api/request";

export interface LoginDTO {
  email: string;
  password: string;
}

export type LoginResponse = User & UserCredentials;

export const login = async (body: LoginDTO) => ApiRequest.post<LoginResponse>("/users/login", body);
