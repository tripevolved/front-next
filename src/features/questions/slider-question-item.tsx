import { OptionsSliderProps, OptionsSlider, Text } from "@/ui";
import { type Question } from "@/services/api/common/questions";
import { Grid } from "mars-ds";

interface SliderQuestionItemProps
  extends Question,
    Pick<OptionsSliderProps, "onSet" | "defaultValue" | "disabled"> {}

export const SliderQuestionItem = ({
  title,
  minValue,
  maxValue,
  step,
  dataType,
  onSet,
  defaultValue,
  disabled,
}: SliderQuestionItemProps) => {
  const formatSlider = (num: number) => {
    if (dataType === "CURRENCY")
      return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', })
    if (dataType === "DAYS")
      return num > 1 ? num + " dias" : num + " dia";
    return num.toString();
  };

  return (
    <Grid className="profile-questions-item" gap={24}>
      <div className="mb-lg profile-questions-item__header">
        <Text heading size="xs">
          {title}
        </Text>
      </div>
      <Grid gap={16} className="profile-questions-item__answers">
        <OptionsSlider
          min={minValue ?? 1}
          max={maxValue ?? 500000}
          formatter={formatSlider}
          step={step}
          defaultValue={defaultValue}
          onSet={onSet}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
};
