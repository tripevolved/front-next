import type { RenderResult } from "@testing-library/react";

export const expectDOMToBe = (wrapper: RenderResult, value: string) => {
  const html = wrapper.container.innerHTML;
  const sanitized = html.replace(/\s?css-.{7}/, "");
  expect(sanitized).toBe(value);
};
