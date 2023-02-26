import type { RenderResult } from "@testing-library/react";

export const expectDOMToBe = (wrapper: RenderResult, value: string) =>
  expect(wrapper.container.innerHTML).toBe(value);
