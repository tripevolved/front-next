import { OptionsFieldList, Text } from "@/ui";
import { Grid } from "mars-ds";
import { useMemo } from "react";
import { QuestionOptionsProps } from "./question-options.types";

export const QuestionOptions = ({
  title,
  type,
  possibleAnswers,
  onCheck,
  defaultValue,
  disabled,
}: QuestionOptionsProps) => {
  const options = useMemo(
    () =>
      possibleAnswers.map(({ title, id }) => ({
        label: title,
        value: id,
      })),
    [possibleAnswers]
  );

  const multiselect = useMemo(() => type === "CHECKBOX", [type]);

  return (
    <Grid className="profile-questions-item" gap={24}>
      <div className="mb-lg profile-questions-item__header">
        <Text heading size="xs">
          {title}
        </Text>
        {multiselect && !title.includes("objetivo") ? (
          <Text className="profile-questions-item__header__caption" size="sm">
            Você pode selecionar mais de uma resposta.
          </Text>
        ) : (
          <Text className="profile-questions-item__header__caption" size="sm">
            Selecione até 5 respostas
          </Text>
        )}
      </div>
      <Grid gap={16} className="profile-questions-item__answers">
        <OptionsFieldList
          disabled={disabled}
          onCheck={onCheck}
          options={options}
          multiselect={multiselect}
          defaultValue={defaultValue}
          title={title}
        />
      </Grid>
    </Grid>
  );
};
