export type { LoginDTO } from "./login";

import { login } from "./login";
import { forgotPassword } from "./password";
import { signUp } from "./sign-up";

export const UserApiService = { login, forgotPassword, signUp };
