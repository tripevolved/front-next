import type { ProfileQuestionsProps } from "./profile-questions.types";
import { render } from "@testing-library/react";
import { ProfileQuestions } from "./profile-questions.component";

const makeSut = (props?: ProfileQuestionsProps) => render(<ProfileQuestions {...props} />);

describe("<ProfileQuestions>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
