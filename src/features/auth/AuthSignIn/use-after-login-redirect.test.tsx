import { renderHook } from "@testing-library/react";
import { useAfterLoginRedirect } from "./use-after-login-redirect.hook";
import { mockUseRouter } from "@/utils/mocks/next-router.mock";
import { DASHBOARD_ROUTE } from "../auth-sign-in.constants";

interface MakeSutProps {
  redirectTo?: any;
}

const makeSut = (props?: MakeSutProps) => {
  const useRouterMock = mockUseRouter();
  if (props?.redirectTo) {
    useRouterMock.query.redirectTo = props.redirectTo;
  }
  const { result } = renderHook(useAfterLoginRedirect);
  return { ...result.current, useRouterMock };
};

describe("useAfterLoginRedirect", () => {
  it("should redirect to default route", () => {
    const { redirectAfterSignIn, useRouterMock } = makeSut();
    redirectAfterSignIn();

    expect(useRouterMock.replace).toBeCalledTimes(1);
    expect(useRouterMock.replace).toBeCalledWith(DASHBOARD_ROUTE);
  });

  describe(`when route has "redirectTo" query param`, () => {
    const invalidValuesToRedirectTo = [["any_route"], null, undefined, {}, "", 1234];
    it.each(invalidValuesToRedirectTo)(
      "should redirect to default if query param is invalid: %s",
      (redirectTo) => {
        const { redirectAfterSignIn, useRouterMock } = makeSut({ redirectTo });

        redirectAfterSignIn();

        expect(useRouterMock.replace).toBeCalledTimes(1);
        expect(useRouterMock.replace).toBeCalledWith(DASHBOARD_ROUTE);
      }
    );

    it(`should redirect to "redirectTo" query param`, () => {
      const redirectTo = "any_route";
      const { redirectAfterSignIn, useRouterMock } = makeSut({ redirectTo });

      redirectAfterSignIn();

      expect(useRouterMock.replace).toBeCalledTimes(1);
      expect(useRouterMock.replace).toBeCalledWith(redirectTo);
    });
  });
});
