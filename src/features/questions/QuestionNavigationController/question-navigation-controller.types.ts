export interface ProfileQuestionsNavigationProps {
  position: number;
  total: number;
  onNavigation: (newPosition: number) => void;
  isNextButtonDisabled?: boolean;
  className?: string;
  style?: any;
  submitting?: boolean;
  notListed?: boolean;
  nextButtonLabel?: string;
  finishButtonLabel?: string;
}
