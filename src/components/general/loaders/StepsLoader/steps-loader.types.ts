import { ComponentHTMLProps } from "@/types";

interface Steps {
  text?: string;
  iconName?: string;
}

export interface StepsLoaderProps extends ComponentHTMLProps {
  milliseconds?: number;
  steps?: Steps[];
  onFinish?: VoidFunction;
}
