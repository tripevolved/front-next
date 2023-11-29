import React from "react";

export interface SelectFieldSimpleProps extends React.HTMLProps<HTMLSelectElement> {
  options: { label: string; value: string | number }[];
  onValueChange?: (value: string) => void;
}
