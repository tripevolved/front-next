import { Grid } from "mars-ds";
import type { DatePickerProps } from "./date-picker.types";

import { useState } from "react";

export function DatePicker({ ...props }: DatePickerProps) {
  const [dateState, setDateState] = useState(new Date());
  const changeDate = (event: any) => {
    setDateState(event);
  };

  /* TODO: insert a checkbox here to allow for flexible dates */
  return (
    <Grid gap={16} {...props}>
      TODO: Implements Calendar
    </Grid>
  );
}
