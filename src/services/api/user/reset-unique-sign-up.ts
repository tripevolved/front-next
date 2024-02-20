import { ApiRequest } from "@/services/api/request";

interface ResetSignUpApiResponse {
  email: string;
  uniqueId?: string;
}

export const resetUniqueSignUp = async ({
  currentEmail,
  currentUniqueId,
}: {
  currentEmail: string;
  currentUniqueId?: string;
}) => {
  const url = `users/reset-unique-sign-up`;
  return await ApiRequest.post<ResetSignUpApiResponse>(url, {
    email: currentEmail,
    uniqueId: currentUniqueId,
  });
};
