import { getByEmail } from "./get-by-email";
import { getRefByEmail } from "./launch-list";
import { getLocal } from "./local";
import { create } from "./create";

export const LeadApiService = { create, getLocal, getRefByEmail, getByEmail };
