import { NextRouter } from "next/router";

export const makeUseRouter = (props?: Partial<NextRouter>) => {
  const mockedImplementation: NextRouter = {
    basePath: "",
    pathname: "/",
    route: "/",
    asPath: "/",
    query: {},
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    isFallback: false,
    locale: "",
    forward: jest.fn(),
    isLocaleDomain: false,
    isPreview: false,
    isReady: true,
    ...props,
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
      ...props?.events,
    },
  };

  const useRouter = jest.spyOn(require("next/router"), "useRouter");
  useRouter.mockImplementation(() => mockedImplementation);
  return mockedImplementation;
};
