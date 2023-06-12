import { UserService } from "@/services/user";
import { mockUseRouter } from "@/utils/mocks/next-router.mock";
import { renderHook } from "@testing-library/react";
import { useAuthorized } from "./use-authorized";
import * as AppAuthHelper from "./app-auth.helper";

jest.mock("./app-auth.helper")

const REDIRECT_TO_PATH = "any-path"
const useRouterMock = mockUseRouter({ asPath: REDIRECT_TO_PATH });

const makeSut = ({ isAuth = true, isProtectedRoute = true }) => {
  jest.spyOn(UserService, "isAuth").mockReturnValue(isAuth);
  jest.spyOn(AppAuthHelper, "isProtectedRoute").mockReturnValue(isProtectedRoute);

  const { result } = renderHook(useAuthorized);
  return result.current;
};

describe("useAuthorized", () => {
  describe("isAuthorized", () => {
    describe("when route is protected", () => {
      const isProtectedRoute = true;

      it("should return FALSE if user is guest", () => {
        const { isAuthorized } = makeSut({ isAuth: false, isProtectedRoute });
        expect(isAuthorized).toBeFalsy();
      });

      it("should return TRUE if user is authenticated", () => {
        const { isAuthorized } = makeSut({ isAuth: true, isProtectedRoute });
        expect(isAuthorized).toBeTruthy();
      });
    });

    describe("when route is unprotected", () => {
      const isProtectedRoute = false;

      it("should return TRUE if user is guest", () => {
        const { isAuthorized } = makeSut({ isAuth: false, isProtectedRoute });
        expect(isAuthorized).toBeTruthy();
      });

      it("should return TRUE if user is authenticated", () => {
        const { isAuthorized } = makeSut({ isAuth: true, isProtectedRoute });
        expect(isAuthorized).toBeTruthy();
      });
    });
  })

  describe("redirectToSignIn", () => {
    it(`should redirect url with "redirectTo" query param`, () => {
      const { redirectToSignIn } = makeSut({});
      expect(useRouterMock.replace).not.toBeCalled();
      redirectToSignIn();
      expect(useRouterMock.replace).toBeCalledTimes(1);
      const route = `/app/entrar/?redirectTo=${REDIRECT_TO_PATH}`;
      expect(useRouterMock.replace).toBeCalledWith(route);
    })
  })
});
