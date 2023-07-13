import type { StateTemplateProps } from "./state-template.types";
import { render } from "@testing-library/react";
import { StateTemplate } from "./state-template.component";

const makeSut = (props?: StateTemplateProps) => render(<StateTemplate {...props} />);

describe("<StateTemplate>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
