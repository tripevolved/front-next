import { UserCredentials } from "./credentials";
import { login, type LoginArgs } from "./login";
import { logout } from "./logout";

export type { LoginArgs };

const isGuest = () => !UserCredentials.get();
const isAuth = () => !isGuest();

export const UserService = { login, logout, getCredentials: UserCredentials.get, isGuest, isAuth };
