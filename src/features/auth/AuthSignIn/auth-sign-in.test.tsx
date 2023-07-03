import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AuthSignIn } from "./auth-sign-in.component";
import * as UseLoginHook from "./use-login.hook";

jest.mock("./use-login.hook");

const LOGIN_DATA = {
  email: "any@email.com",
  password: "any_password",
};

const makeSut = () => {
  const loginMock = jest.fn();
  jest.spyOn(UseLoginHook, "useLogin").mockImplementation(() => ({
    login: loginMock,
    submitting: false,
    error: false,
  }));
  render(<AuthSignIn />);

  return { loginMock };
};

describe("<AuthForm>", () => {
  it("should render component", () => {
    makeSut();

    // texts
    expect(screen.getByText("Faça o login para continuar")).toBeInTheDocument();

    // fields
    const emailField = screen.getByLabelText("E-mail");
    const passwordField = screen.getByLabelText("Senha");

    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();

    // images
    const logo = screen.getByAltText("Logo da Trip Evolved");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/brand/logo-symbol-circle.svg");

    // buttons and links
    const forgetPasswordLink = screen.getByText("Esqueci a senha");
    const submitButton = screen.getByText("Entrar").closest("button");
    const signUpLink = screen.getByText("Criar novo cadastro").closest("a");

    expect(forgetPasswordLink).toBeInTheDocument();
    expect(forgetPasswordLink).toHaveAttribute("href", "/app/entrar/esqueci-a-senha");

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute("type", "submit");

    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute("href", "/app/cadastro");
  });

  describe("when submit form", () => {
    it("should NOT login if fields are empty", async () => {
      const { loginMock } = makeSut();
      const submitButton = screen.getByText("Entrar");
      await userEvent.click(submitButton);
      expect(loginMock).not.toBeCalled();
    });

    it("should NOT login if email field is empty", async () => {
      const { loginMock } = makeSut();

      const passwordField = screen.getByLabelText("Senha");
      const submitButton = screen.getByText("Entrar");

      await userEvent.type(passwordField, LOGIN_DATA.password);
      await userEvent.click(submitButton);
      expect(loginMock).not.toBeCalled();
    });

    it("should NOT login if password field is empty", async () => {
      const { loginMock } = makeSut();

      const emailField = screen.getByLabelText("E-mail");
      const submitButton = screen.getByText("Entrar");

      await userEvent.type(emailField, LOGIN_DATA.email);
      await userEvent.click(submitButton);
      expect(loginMock).not.toBeCalled();
    });

    it("should NOT make login if fields are empty", async () => {
      const { loginMock } = makeSut();

      const emailField = screen.getByLabelText("E-mail");
      const passwordField = screen.getByLabelText("Senha");
      const submitButton = screen.getByText("Entrar");

      await userEvent.type(emailField, LOGIN_DATA.email);
      await userEvent.type(passwordField, LOGIN_DATA.password);
      await userEvent.click(submitButton);

      expect(loginMock).toBeCalledTimes(1);
      expect(loginMock).toBeCalledWith(LOGIN_DATA);
    });
  });
});
