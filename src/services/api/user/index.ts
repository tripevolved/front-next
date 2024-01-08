export type { LoginDTO } from "./login";

import { login } from "./login";
import { forgotPassword } from "./password";
import { signUp } from "./sign-up";
import { uniqueSignUp } from "./unique-sign-up";
import { resetUniqueSignUp } from "./reset-unique-sign-up";

export const UserApiService = { login, forgotPassword, signUp, uniqueSignUp, resetUniqueSignUp };
