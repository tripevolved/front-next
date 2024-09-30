import type { SquareSliderProps } from "./square-slider.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { ToggleButton } from "mars-ds";
import { Text } from "../Text";

export const SquareSlider = ({
  children,
  className,
  title,
  sx
}: SquareSliderProps) => {
  const cn = makeCn("square-slider", className)(sx);

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    if (slider != null) {
      slider.scrollLeft = slider.scrollLeft - 280;
    }
  };

  const slideRight = () => {
    let slider = document.getElementById("slider");
    if (slider != null) {
      slider.scrollLeft = slider.scrollLeft + 280;
    }
  };

  return (
    <div className={cn}>
      <div className="square-slider__heading">
        <Text heading size="xl" as="strong">
          {title}
        </Text>
        <div className="square-slider__heading__buttons">
          <ToggleButton
            variant="neutral"
            iconName="arrow-left"
            onClick={slideLeft}
          />
          <ToggleButton
            variant="neutral"
            iconName="arrow-right"
            onClick={slideRight}
          />
        </div>
      </div>
      <div className="square-slider__row-container" id="slider">
        {children}
      </div>
    </div>
  );
};
