import { Grid } from "mars-ds";
import type { DatePickerProps } from "./date-picker.types";

import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function DatePicker({ 
  dates,
  onSet,
  disabled,
  ...props 
}: DatePickerProps) {
  const [startDate, setStartDate] = useState(dates?.[0]);
  const [endDate, setEndDate] = useState(dates?.[1]);
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  /* TODO: insert a checkbox here to allow for flexible dates */
  return (
    <Grid gap={16} {...props}>
      <ReactDatePicker
        selected={dates?.[0]}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        disabled={disabled}
      />
    </Grid>
  );
}
