import { DatePickerProps, DatePicker, Text } from "@/ui";
import { type Question } from "@/services/api/common/questions";
import { Grid } from "mars-ds";

interface DatePickerQuestionItemProps
  extends Question,
    Pick<DatePickerProps, "onSet" | "dates" | "disabled"> {}

export const DatePickerQuestionItem = ({
  title,
  onSet,
  dates,
  disabled,
}: DatePickerQuestionItemProps) => {
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
