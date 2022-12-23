import { ReactElement } from "react";
import {
  Slider,
  SliderProps,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";

export interface StepperProps extends SliderProps {

}

export const Stepper = ({
  min = 0,
  max,
  step = 1,
  defaultValue = 1,
}: StepperProps): ReactElement => {
  return (
    <Slider
      min={min}
      max={max}
      step={step}
      defaultValue={defaultValue}
      isReadOnly
    >
      <SliderTrack bg="gray.1">
        <SliderFilledTrack bg="brand.4" />
      </SliderTrack>
    </Slider>
  )
}
