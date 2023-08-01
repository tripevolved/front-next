import type { GeneralHeaderProps } from "./general-header.types";
import { render } from "@testing-library/react";
import { GeneralHeader } from "./general-header.component";

const makeSut = (props?: GeneralHeaderProps) => render(<GeneralHeader {...props!} />);

describe("<GeneralHeader>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
