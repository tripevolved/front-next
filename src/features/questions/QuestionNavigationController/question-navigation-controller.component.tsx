import { Button } from "mars-ds";
import { useMemo } from "react";
import { ProfileQuestionsNavigationProps } from "./question-navigation-controller.types";

export const QuestionNavigationController = ({
  position = 0,
  total = 1,
  onNavigation,
  isNextButtonDisabled,
}: ProfileQuestionsNavigationProps) => {
  const label = useMemo(() => (position === total ? "Concluir" : "Próxima"), [position, total]);

  return (
    <div className="profile-questions-navigation">
      <Button
        variant="neutral"
        className="profile-questions-navigation__previous"
        disabled={position < 1}
        iconName="chevron-left"
        onClick={() => onNavigation(position - 1)}
      >
        Anterior
      </Button>
      <Button
        // @ts-ignore
        variant="tertiary"
        className="profile-questions-navigation__next"
        onClick={() => onNavigation(position + 1)}
        disabled={position > total || isNextButtonDisabled}
      >
        {label}
      </Button>
    </div>
  );
};
