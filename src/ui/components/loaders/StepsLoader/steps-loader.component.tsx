import type { StepsLoaderProps } from "./steps-loader.types";

import { makeCn } from "@/utils/helpers/css.helpers";

import { Box, BoxProps, Text } from "@/ui";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { delay } from "@/utils/helpers/delay.helpers";
import { Icon } from "mars-ds";

const PERCENT_INC = 10;
const PERCENT_DISPATCH = 70;
const EIGHT_SECONDS_IN_MS = 8000;

export function StepsLoader({
  color = "var(--color-primary-500)",
  className,
  children,
  sx,
  milliseconds = EIGHT_SECONDS_IN_MS,
  steps = [],
  onFinish,
  ...props
}: StepsLoaderProps) {
  const cn = makeCn("steps-loader", className)(sx);
  const [percentage, setPercentage] = useState(0);

  const dispatchedFinish = useRef(false);

  const currentIndex = useMemo(() => {
    const maxIndex = steps.length - 1 || 1;
    const result = (percentage / 100) * maxIndex;
    return Math.round(result);
  }, [percentage, steps.length]);

  const iconName = useMemo(() => steps[currentIndex]?.iconName || "map", [currentIndex, steps]);
  const text = useMemo(() => steps[currentIndex]?.text, [currentIndex, steps]);

  const timeout = useMemo(
    () => (milliseconds * PERCENT_INC * (100 / PERCENT_DISPATCH)) / 100,
    [milliseconds]
  );

  const progress = async (newPercentage = 0) => {
    if (newPercentage > 100) return;
    if (newPercentage > PERCENT_DISPATCH && !dispatchedFinish.current) {
      dispatchedFinish.current = true;
      onFinish?.();
    }
    setPercentage(newPercentage);
    await delay(timeout);
    progress(newPercentage + PERCENT_INC);
  };

  useEffect(() => {
    if (!timeout) return;
    setPercentage(0);
    progress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeout]);

  return (
    <div className={cn} {...props}>
      <CircleProgress percentage={percentage}>
        <Icon color="white" name={iconName} />
      </CircleProgress>
      <Text className="opacity-animation">{text}</Text>
    </div>
  );
}

interface CircleProgressProps extends BoxProps {
  percentage?: number;
  children?: ReactNode;
}

const CircleProgress = ({
  percentage = 20,
  children,
  className,
  ...props
}: CircleProgressProps) => {
  const offset = useMemo(() => percentage * -1 - 100, [percentage]);
  const cn = makeCn("circle-progress", className)();
  return (
    <Box className={cn} {...props}>
      <svg className="circle-progress__svg" viewBox="0 0 100 100" width="100" height="100">
        <circle
          className="circle-progress__svg__path"
          cx="50%"
          cy="50%"
          r="47%"
          pathLength={100}
          opacity={0.2}
        />
        <circle
          className="circle-progress__svg__indicator"
          cx="50%"
          cy="50%"
          r="47%"
          pathLength={100}
          strokeDasharray={100}
          strokeDashoffset={offset}
        />

        <circle className="circle-progress__svg__internal" cx="50%" cy="50%" r="35%" />
      </svg>
      <div className="circle-progress__middle">{children}</div>
    </Box>
  );
};
