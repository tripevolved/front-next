import { act, renderHook, waitFor } from "@testing-library/react";
import { useLogin } from "./use-login";
import { Notification } from "mars-ds";
import * as AppStore from "@/core/store";
import * as UseAfterLoginRedirect from "./use-after-login-redirect";
import { UserService } from "@/services/user";
import { ERRORS } from "../auth-sign-in.constants";

jest.mock("@/core/store");
jest.mock("./use-after-login-redirect");

const loginResponseMock = { email: "any@mail.com", username: "any_name" };

const loginData = { email: "any@mail.com", password: "any_password" };

const makeMocks = () => {
  const userLoginSpy = jest.spyOn(UserService, "login").mockResolvedValue(loginResponseMock);
  const notificationErrorSpy = jest.spyOn(Notification, "error");

  const mockRedirectAfterSignIn = jest.fn();
  jest
    .spyOn(UseAfterLoginRedirect, "useAfterLoginRedirect")
    .mockReturnValue({ redirectAfterSignIn: mockRedirectAfterSignIn });

  const setUserMock = jest.fn();
  jest.spyOn(AppStore, "useAppStore").mockImplementation(() => ({ setUser: setUserMock }));

  return {
    userLoginSpy,
    notificationErrorSpy,
    mockRedirectAfterSignIn,
    setUserMock,
  };
};

const makeSut = () => {
  const mocks = makeMocks();
  const { result } = renderHook(useLogin);
  return { mocks, result };
};

describe("useLogin", () => {
  it("should handle error", async () => {
    const { result, mocks } = makeSut();
    mocks.userLoginSpy.mockRejectedValue("");
    expect(result.current.submitting).toBeFalsy();

    await act(() => result.current.login(loginData));

    expect(mocks.notificationErrorSpy).toBeCalledTimes(1);
    expect(mocks.notificationErrorSpy).toBeCalledWith(ERRORS.UNAUTHORIZED);

    expect(mocks.setUserMock).not.toBeCalled();
    expect(mocks.mockRedirectAfterSignIn).not.toBeCalled();

    expect(result.current.submitting).toBeFalsy();
  });

  it("should sign-in on success", async () => {
    const { result, mocks } = makeSut();

    const { submitting, login } = result.current;

    expect(submitting).toBeFalsy();

    await act(() => login(loginData));

    expect(mocks.userLoginSpy).toBeCalledWith(loginData);
    expect(mocks.notificationErrorSpy).not.toBeCalled();
    expect(mocks.setUserMock).toBeCalledTimes(1);
    expect(mocks.setUserMock).toBeCalledWith(loginResponseMock);
    expect(mocks.mockRedirectAfterSignIn).toBeCalledTimes(1);
    expect(result.current.submitting).toBeTruthy();
  });
});
