import { Box, Text } from "@/components";
import { type ProfileQuestion } from "@/services/api/profile/questions";
import { Grid, ItemCheckbox, Radio } from "mars-ds";
import { useMemo } from "react";

interface ProfileQuestionsItemProps extends ProfileQuestion {}

const componentMapper: Record<ProfileQuestion["type"], any> = {
  CHECKBOX: ItemCheckbox,
  RADIO: Radio,
};

export const ProfileQuestionsItem = ({
  id,
  title,
  type,
  possibleAnswers,
}: ProfileQuestionsItemProps) => {
  const options = useMemo(
    () =>
      possibleAnswers.map(({ title, id }) => ({
        label: title,
        value: id,
      })),
    [possibleAnswers]
  );

  const Component = useMemo(() => componentMapper[type], [type]);

  return (
    <Box className="profile-questions-item">
      <Text heading size="xs">
        {title}
      </Text>
      <Grid className="profile-questions-item__answers">
        {options.map(({ label, value }) => (
          <Component name={id} key={value} label={label} value={value} />
        ))}
      </Grid>
    </Box>
  );
};
