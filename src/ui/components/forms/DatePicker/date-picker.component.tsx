import { useState } from "react";
import type { DatePickerProps } from "./date-picker.types";

// https://hypeserver.github.io/react-date-range
// https://www.npmjs.com/package/react-date-range
import { DateRange } from "react-date-range";
// @ts-ignore
import { pt as localePt } from "react-date-range/dist/locale";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file

const KEY = "selection";
const FIVE_MONTHS_IN_DAYS = 30 * 5;

export function DatePicker({ onSelect, maxDays = FIVE_MONTHS_IN_DAYS }: DatePickerProps) {
  const [rangeValue, setRangeValue] = useState<any>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: KEY,
    },
  ]);

  const handleChange = (newRangeValue: any) => {
    setRangeValue([newRangeValue]);
    onSelect?.({
      endDate: newRangeValue.endDate ? new Date(newRangeValue.endDate) : undefined,
      startDate: newRangeValue.startDate ? new Date(newRangeValue.startDate) : undefined,
    });
  };

  return (
    <div className="date-picker">
      <div className="data-picker__content">
        <DateRange
          ranges={rangeValue}
          onChange={(item) => handleChange(item[KEY])}
          minDate={new Date()}
          maxDate={addDays(new Date(), maxDays)}
          dateDisplayFormat="d/MMM/YYY"
          locale={localePt}
          rangeColors={["var(--color-primary-700)", "var(--color-brand-1)", "var(--color-brand-2)"]}
          displayMode="dateRange"
          showMonthAndYearPickers={false}
          showDateDisplay={false}
        />
      </div>
    </div>
  );
}
