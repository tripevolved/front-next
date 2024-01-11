import { ApiRequest } from "../request";

interface ForgotPasswordResponse {
  userId: string;
}

export const forgotPassword = async (email: string) =>
  ApiRequest.post<ForgotPasswordResponse>("users/forgot-password", { email });

export const resetPassword = async (userId: string, password: string, confirmationCode: string) =>
  ApiRequest.post("users/reset-password", { userId, password, confirmationCode });
