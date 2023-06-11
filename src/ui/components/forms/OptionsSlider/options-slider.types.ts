import type { SliderProps } from "mars-ds";

type OnSet = (value: number) => void;

export interface OptionsSliderProps extends SliderProps {
    disabled?: boolean;
    onSet?: OnSet;
    defaultValue: number;
}
