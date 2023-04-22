import { Text, TextProps } from "@/components";
import { makeClassName } from "@/helpers/classname.helpers";
import { type ProfileQuestion } from "@/services/api/profile/questions";
import { Grid } from "mars-ds";
import { useMemo, useState } from "react";

interface ProfileQuestionsItemProps extends ProfileQuestion {
  onCheck?: (value: string | string[]) => void;
}

export const ProfileQuestionsItem = ({
  title,
  type,
  possibleAnswers,
  onCheck,
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
        <OptionsList onCheck={onCheck} options={options} multiselect={type === "CHECKBOX"} />
      </Grid>
    </Grid>
  );
};

interface OptionProps {
  value: string;
  checked?: boolean;
  label?: TextProps | string;
  multiselect?: boolean;
  onCheck?: (value: string) => void;
}

interface OptionsListProps {
  options?: OptionProps[];
  multiselect?: boolean;
  onCheck?: (value: string | string[]) => void;
}

const OptionsList = ({ options = [], multiselect, onCheck }: OptionsListProps) => {
  const [value, setValue] = useState<string | string[] | null>(null);

  const handleCheck = (newValue: string) => {
    if (!multiselect) {
      setValue(newValue);
      onCheck?.(newValue);
      return;
    }

    const currentValue = Array.isArray(value) ? value : [];
    const hasValue = currentValue.includes(newValue);

    const nextValue = hasValue
      ? currentValue.filter((item) => item !== newValue)
      : currentValue.concat(newValue);

    setValue(nextValue);
    onCheck?.(nextValue);
  };

  const isChecked = (item: OptionProps) => {
    if (!multiselect) return item.value === value;
    return Array.isArray(value) && value.includes(item.value);
  };

  return (
    <Grid gap={16} className="options-list">
      {options.map((item) => (
        <Option
          key={item.value}
          {...item}
          checked={isChecked(item)}
          multiselect={multiselect}
          onCheck={handleCheck}
        />
      ))}
    </Grid>
  );
};

const Option = ({ checked = false, label, multiselect, onCheck, value }: OptionProps) => {
  const cn = makeClassName("option", {
    "option--is-multiselect": multiselect,
    "option--is-checked": checked,
  })();

  const handleClick = () => onCheck?.(value);

  return (
    <div tabIndex={0} className={cn} onClick={handleClick}>
      <span className="option__state" data-checked={checked} />
      <Text>{label}</Text>
    </div>
  );
};
