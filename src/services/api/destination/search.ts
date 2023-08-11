import { ApiRequest } from "@/services/api/request";

export const searchDestination = async (search: string) =>
  ApiRequest.get<{ id: string; name: string }[]>(`destinations?search=${search}`);
