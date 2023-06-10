import { OptionsFieldList, OptionsFieldListProps, OptionsSlider, Text } from "@/ui";
import { type Question } from "@/services/api/common/questions";
import { Grid } from "mars-ds";
import { useMemo } from "react";

interface ProfileQuestionsItemProps
  extends Question,
    Pick<OptionsFieldListProps, "onCheck" | "defaultValue" | "disabled"> {}

export const ProfileQuestionsItem = ({
  title,
  type,
  minValue,
  maxValue,
  step,
  dataType,
  possibleAnswers,
  onCheck,
  defaultValue,
  disabled,
}: ProfileQuestionsItemProps) => {
  const options = useMemo(
    () =>
      possibleAnswers.map(({ title, id }) => ({
        label: title,
        value: id,
      })),
    [possibleAnswers]
  );

  const multiselect = useMemo(() => type === "CHECKBOX", [type]);
  const hasOptionsField = useMemo(() => type === "CHECKBOX" || type === "RADIO", [type]);
  const hasRangeField = useMemo(() => type === "RANGE", [type]);
  const hasCalendar = useMemo(() => type === "DATEPICK", [type]);
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
        {multiselect ? (
          <Text className="profile-questions-item__header__caption" size="sm">
            Você pode selecionar mais de uma resposta.
          </Text>
        ) : null}
      </div>
      <Grid gap={16} className="profile-questions-item__answers">
        {hasOptionsField ? (
          <OptionsFieldList
            disabled={disabled}
            onCheck={onCheck}
            options={options}
            multiselect={multiselect}
            defaultValue={defaultValue}
          />
        ) : (hasRangeField ? 
          <OptionsSlider 
            min={minValue ?? 1}
            max={maxValue ?? 500000}
            formatter={formatSlider}
          />
          : (hasCalendar ? 
          <div>CALENDAR</div> 
          : null)
          )
        }
      </Grid>
    </Grid>
  );
};
