import { Button, SubmitButton } from "mars-ds";
import { useMemo } from "react";
import { ProfileQuestionsNavigationProps } from "./question-navigation-controller.types";
import { makeCn } from "@/utils/helpers/css.helpers";

export const QuestionNavigationController = ({
  className,
  position = 0,
  total = 1,
  onNavigation,
  isNextButtonDisabled,
  submitting,
  style,
  nextButtonLabel = "Próxima",
  finishButtonLabel = "Concluir",
  showPreviousButton,
}: ProfileQuestionsNavigationProps) => {
  const label = useMemo(
    () => (position === total ? finishButtonLabel : nextButtonLabel),
    [finishButtonLabel, nextButtonLabel, position, total]
  );
  const cn = makeCn("profile-questions-navigation", className)();
  const previousButton = showPreviousButton || total > 1;
  return (
    <div className={cn} style={style}>
      {previousButton ? (
        <Button
          variant="neutral"
          className="profile-questions-navigation__previous"
          disabled={showPreviousButton ? false : position < 1}
          iconName="chevron-left"
          onClick={() => onNavigation(position - 1)}
        >
          Anterior
        </Button>
      ) : null}
      <SubmitButton
        // @ts-ignore
        variant="tertiary"
        className="profile-questions-navigation__next"
        onClick={() => onNavigation(position + 1)}
        disabled={position > total || isNextButtonDisabled}
        submitting={submitting}
      >
        {label}
      </SubmitButton>
    </div>
  );
};
