import { ApiRequest } from "@/clients/common/request";

export interface LeadCreateDTO {
  name: string;
  email: string;
  phone: string;
  metadata?: Array<{
    key: string;
    value: string;
    keyDescription: string;
  }>;
}

export interface UniqueSignUpResponse {
  id: string;
  uniqueId: string;
}

export const uniqueSignUp = async (leadData: LeadCreateDTO) => {
  const route = "users/unique-sign-up";
  return ApiRequest.post<UniqueSignUpResponse>(route, leadData);
}; 