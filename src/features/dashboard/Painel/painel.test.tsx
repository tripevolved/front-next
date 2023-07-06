import type { PainelProps } from "./painel.types";
import { render } from "@testing-library/react";
import { Painel } from "./painel.component";
import { mockUseRouter } from "@/utils/mocks/next-router.mock";

mockUseRouter();
const makeSut = (props?: PainelProps) => render(<Painel {...props} />);

describe("<Painel>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
