import { APP_WHITE_LIST, APP_ROUTE, isProtectedRoute } from "./app-auth.helper";

describe("app-auth.helper", () => {
  describe("isProtectedRoute", () => {
    describe("when it receives UNPROTECTED route", () => {
      it.each(["/", "/destinos", "/sobre"])(`should return FALSE to "%s"`, (route) => {
        expect(isProtectedRoute(route)).toBeFalsy();
      });
    });

    describe("when it receives some WHITE LIST route", () => {
      const whiteList = APP_WHITE_LIST.map((p) => `/${APP_ROUTE}/${p}`);
      it.each(whiteList)(`should return FALSE to "%s"`, (route) => {
        expect(isProtectedRoute(route)).toBeFalsy();
      });
    });

    describe("when it receives PROTECTED route", () => {
      const routes = ["", "protected", "painel"].map((p) => `/${APP_ROUTE}/${p}`);
      it.each(routes)(`should return FALSE to "%s"`, (route) => {
        expect(isProtectedRoute(route)).toBeTruthy();
      });
    });
  });
});
