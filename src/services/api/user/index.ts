export type { LoginDTO } from "./login";

import { login } from "./login";
import { forgotPassword } from "./password";

export const UserApiService = { login, forgotPassword };
