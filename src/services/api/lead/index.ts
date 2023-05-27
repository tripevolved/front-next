import { getByEmail } from "./get-by-email";
import { LeadLocalService } from "./local";
import { create } from "./create";

export const LeadApiService = { create, getLocal: LeadLocalService.get, getByEmail };
