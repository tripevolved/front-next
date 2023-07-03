import { ApiRequest } from "@/services/api/request";

export type RegisterCity = {
  travelerId: string;
  cityId: string;
};

export type CityResult = {
  id: string;
  name: string;
};

export const putCity = async ({ travelerId, cityId }: RegisterCity) => {
  const url = "customers/register/city";

  await ApiRequest.put(url, { travelerId, cityId });
};

export const getCities = async (search: string) => {
  const url = "customers/cities?search=" + search;
  return await ApiRequest.get<CityResult[]>(url);
};
