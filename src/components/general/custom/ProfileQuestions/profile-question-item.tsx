import { OptionsFieldList, OptionsFieldListProps, Text } from "@/components";
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

  return (
    <Grid className="profile-questions-item" gap={24}>
      <Text className="mb-lg" heading size="xs">
        {title}
      </Text>
      <Grid gap={16} className="profile-questions-item__answers">
        <OptionsFieldList
          disabled={disabled}
          onCheck={onCheck}
          options={options}
          multiselect={type === "CHECKBOX"}
          defaultValue={defaultValue}
        />
      </Grid>
    </Grid>
  );
};
