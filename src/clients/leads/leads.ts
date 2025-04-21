import { ApiRequest } from "@/clients/common/request";

export interface LeadCreateDTO {
  name: string;
  email: string;
  phone: string;
}

export interface LeadResponse {
  id: string;
  message: string;
  statusCode: number;
}

export const createLead = async (data: LeadCreateDTO): Promise<LeadResponse> => {
  const route = `customers`;
  return ApiRequest.post<LeadResponse>(route, data);
}; 