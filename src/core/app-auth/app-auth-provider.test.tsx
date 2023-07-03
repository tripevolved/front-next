import { render, screen } from "@testing-library/react";
import { AppAuthProvider } from "./app-auth-provider";
import * as AuthorizedHook from "./use-authorized";

jest.mock("./use-authorized");

const PROPS = {
  children: "any_children",
};

const makeSut = ({ isAuthorized = true }) => {
  const redirectToSignInMock = jest.fn();
  jest.spyOn(AuthorizedHook, "useAuthorized").mockReturnValue({
    redirectToSignIn: redirectToSignInMock,
    isAuthorized,
  });
  render(<AppAuthProvider {...PROPS} />);

  return { redirectToSignInMock };
};

describe("<AppAuthProvider>", () => {
  it("should render children", () => {
    makeSut({});
    expect(screen.getByText(PROPS.children)).toBeInTheDocument();
  });

  it("should keep use in route", () => {
    const { redirectToSignInMock } = makeSut({});
    expect(redirectToSignInMock).not.toBeCalled();
  })

  it("should redirect to sign-up route", () => {
    const { redirectToSignInMock } = makeSut({ isAuthorized: false });
    expect(redirectToSignInMock).toBeCalledTimes(1);
  })
});
