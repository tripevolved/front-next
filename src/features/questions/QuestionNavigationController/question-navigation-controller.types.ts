export interface ProfileQuestionsNavigationProps {
  position: number;
  total: number;
  onNavigation: (newPosition: number) => void;
  isNextButtonDisabled?: boolean;
}