import { findByEmail } from "./find";
import { LeadLocalService } from "./local";
import { create } from "./create";

export const LeadApiService = { create, getLocal: LeadLocalService.get, getByEmail: findByEmail };
