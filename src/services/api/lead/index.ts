import { getByEmail } from "./get-by-email";
import { getRefByEmail } from "./launch-list";
import { LeadLocalService } from "./local";
import { create } from "./create";

export const LeadApiService = { create, getLocal: LeadLocalService.get, getRefByEmail, getByEmail };
