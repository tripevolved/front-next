export interface IncrementFieldProps {
  name?: string;
  step?: number;
  min?: number;
  max?: number;
  defaultValue?: number;
  value?: number;
  onSelect?: (value: number) => void;
  disabled?: boolean;
  className?: string;
  formatter?: (value: number) => string;
}
