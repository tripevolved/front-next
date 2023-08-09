export interface TemplateStepsBuilderProps {
  steps: Step[];
  initialIndex?: number;
}

export interface StepComponentProps {
  onNext: (data?: Record<string, any>) => void;
  onPrevious: VoidFunction;
  goToStepName: (stepName: string) => void;
  [props: string]: any;
}

type Step = {
  title: string;
  name: string;
  component: (props: StepComponentProps) => JSX.Element;
  [props: string]: any;
};
