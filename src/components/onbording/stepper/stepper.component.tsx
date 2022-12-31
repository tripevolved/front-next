import { ReactElement } from "react";
import {
  Slider,
  SliderProps,
  SliderTrack,
  SliderFilledTrack,
} from "@chakra-ui/react";

export interface StepperProps extends SliderProps {}

export const Stepper = ({
  min = 0,
  max,
  value = 1,
  defaultValue = 1,
  onChange,
}: StepperProps): ReactElement => {
  return (
    <Slider
      min={min}
      max={max}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      mx={2}
      isReadOnly
    >
      <SliderTrack bg="gray.1">
        <SliderFilledTrack bg="brand.4" />
      </SliderTrack>
    </Slider>
  )
}
