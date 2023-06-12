export const APP_WHITE_LIST = ["entrar", "cadastro", "sair"];
export const APP_ROUTE = "app";

const REG_EXP = new RegExp(`^/${APP_ROUTE}/(?!${APP_WHITE_LIST.join("|")}.*$)`);

export const isProtectedRoute = (pathRoute: string) => REG_EXP.test(pathRoute);
