import { OptionsFieldList, OptionsFieldListProps, Text } from "@/ui";
import { type ProfileQuestion } from "@/services/api/profile/questions";
import { Grid } from "mars-ds";
import { useMemo } from "react";

interface ProfileQuestionsItemProps
  extends ProfileQuestion,
    Pick<OptionsFieldListProps, "onCheck" | "defaultValue" | "disabled"> {}

export const ProfileQuestionsItem = ({
  title,
  type,
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
        <OptionsFieldList
          disabled={disabled}
          onCheck={onCheck}
          options={options}
          multiselect={multiselect}
          defaultValue={defaultValue}
        />
      </Grid>
    </Grid>
  );
};
