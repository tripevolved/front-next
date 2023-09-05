import { StepConfiguration } from "../TripSteps/step-configuration";
import { StepFinish } from "../TripSteps/step-finish";
import type { TripEditConfigurationProps } from "./trip-edit-configuration.types";

import { makeCn } from "@/utils/helpers/css.helpers";

export function TripEditConfiguration({ className, children, sx, ...props }: TripEditConfigurationProps) {
  const cn = makeCn("trip-edit-configuration", className)(sx);

  return (
    <div className={cn} {...props}>
      <StepConfiguration />
    </div>
  );
};
