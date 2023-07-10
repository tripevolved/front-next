import { DatePicker, Text } from "@/ui";
import { Grid } from "mars-ds";
import { QuestionDatePickerProps } from "./question-date-picker.types";

interface InternalQuestionDatePickerProps extends Pick<QuestionDatePickerProps, "title" | "onSet" | "dates" | "disabled">{}

export const QuestionDatePicker = ({
  title,
  onSet,
  dates,
  disabled
}: InternalQuestionDatePickerProps) => {
  return (
    <Grid className="profile-questions-item" gap={24}>
      <div className="mb-lg profile-questions-item__header">
        <Text heading size="xs">
          {title}
        </Text>
      </div>
      <Grid gap={16} className="profile-questions-item__answers">
        <DatePicker
          dates={dates}
          onSet={onSet}
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
};
