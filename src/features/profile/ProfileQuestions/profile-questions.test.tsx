import type { ProfileQuestionsProps } from "./profile-questions.types";
import { render } from "@testing-library/react";
import { ProfileQuestions } from "./profile-questions.component";
import { mockUseRouter } from "@/utils/mocks/next-router.mock";

const makeSut = (props?: ProfileQuestionsProps) => {
  mockUseRouter();
  return render(<ProfileQuestions {...props} />);
}

describe("<ProfileQuestions>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
