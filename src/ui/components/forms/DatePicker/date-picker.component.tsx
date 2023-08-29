import { useState } from "react";
import type { DatePickerProps } from "./date-picker.types";

// https://hypeserver.github.io/react-date-range
// https://www.npmjs.com/package/react-date-range
import { DateRange } from "react-date-range";
// @ts-ignore
import { pt as localePt } from "react-date-range/dist/locale";
import { addDays, differenceInDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file

const KEY = "selection";
const MAX_DAYS = 365; // ONE YEAR

export function DatePicker({ onSelect, maxDays = MAX_DAYS }: DatePickerProps) {
  const [rangeValue, setRangeValue] = useState<any>([
    {
      startDate: addDays(new Date(), 1),
      endDate: addDays(new Date(), 1),
      key: KEY,
    },
  ]);

  const handleChange = (newRangeValue: any) => {
    setRangeValue([newRangeValue]);
    const endDate = new Date(newRangeValue.endDate);
    const startDate = new Date(newRangeValue.startDate);
    const daysAmount = differenceInDays(endDate, startDate) + 1;
    onSelect?.({ endDate, startDate, daysAmount });
  };

  return (
    <div className="date-picker">
      <div className="data-picker__content">
        <DateRange
          ranges={rangeValue}
          onChange={(item) => handleChange(item[KEY])}
          minDate={addDays(new Date(), 1)}
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
