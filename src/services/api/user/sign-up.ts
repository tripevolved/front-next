import { ApiRequest } from "../request";

export interface SignUpResponse {
  email: string;
  message: string;
  isSignUpSuccessful: boolean;
  resultType:
    | "SUCCESS"
    | "INVALID_SIGN_UP_TOKEN"
    | "INVALID_EMAIL"
    | "PERSON_NOT_FOUND"
    | "PERSON_NOT_AVAILABLE_TO_SIGN_UP"
    | "INVALID_PASSWORD"
    | "USERNAME_EXISTS"
    | "FAILURE"
    | "CONFIRMATION_CODE_MISMATCH";
}

export const signUp = async ({
  email,
  password,
  signUpUniqueId,
}: {
  email: string;
  password: string;
  signUpUniqueId?: string | null;
}) => ApiRequest.post<SignUpResponse>("users/sign-up", { email, password, signUpUniqueId });
