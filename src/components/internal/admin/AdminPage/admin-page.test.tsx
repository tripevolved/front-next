import type { AdminPageProps } from "./admin-page.types";
import { render } from "@testing-library/react";
import { AdminPage } from "./admin-page.component";

const makeSut = (props?: AdminPageProps) => render(<AdminPage {...props} />);

describe("<AdminPage>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
