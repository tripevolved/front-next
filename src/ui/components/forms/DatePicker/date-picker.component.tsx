import { Grid, Calendar, type ListProps } from "mars-ds";
import type { DatePickerProps } from "./date-picker.types";

import { useEffect, useState } from "react";

export function DatePicker({
  next,
  previous,
  title,
  subtitle,
  weekList,
  className,
  children,
  onSelect,
  defaultValue,
  ...props
}: DatePickerProps) {
  const [dateState, setDateState] = useState(new Date());
  const changeDate = (event: any) => {
    setDateState(event)
  };
  
  /* TODO: insert a checkbox here to allow for flexible dates */
  return (
    <Grid gap={16} {...props}>
      <Calendar
        list={listProps}
        className={className}
        onChange={changeDate}
      />
    </Grid>
  );
}
