import { AttractionDetail } from "@/core/types";
import { ApiRequest } from "@/services/api/request";

export const getAttractionDetails = async (attractionId: string) => {
  const route = `attractions/${attractionId}/details`;
  const attractionDetail = await ApiRequest.get<AttractionDetail>(route);
  return attractionDetail;
};
