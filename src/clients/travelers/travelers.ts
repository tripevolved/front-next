import { ApiRequest } from "@/services/api/request";

export interface CreateTravelerDTO {
  name: string;
  phone: string;
}

export const createTraveler = async (data: CreateTravelerDTO): Promise<void> => {
  const route = `travelers`;
  await ApiRequest.post(route, data);
};

