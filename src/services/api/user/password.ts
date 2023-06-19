import { ApiRequest } from "../request";

interface ForgotPasswordResponse {
  userId: string;
}

export const forgotPassword = async (email: string) =>
  ApiRequest.post<ForgotPasswordResponse>("users/forgot-password", { email });
