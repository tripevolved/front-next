import { PublicStay } from "@/core/types/stay";
import { ApiRequest } from "@/services/api/request";

/**
 * Get a stay by its unique name
 * @param uniqueName The unique name of the stay
 * @returns The stay data
 */
export const getStayByUniqueName = async (uniqueName: string): Promise<PublicStay> => {
  const route = `stays/${uniqueName}`;
  return ApiRequest.getServerSide<PublicStay>(route);
};

