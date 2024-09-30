import type { StepsLoaderProps } from "./steps-loader.types";

import { makeCn } from "@/utils/helpers/css.helpers";

import { Box, BoxProps, Text } from "@/ui";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "mars-ds";
import { clamp } from "@/utils/helpers/math.helpers";

const EIGHT_SECONDS_IN_MS = 8 * 1000;

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerId = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (!milliseconds) return;
    const interval = milliseconds / steps.length;

    const incrementIndex = () =>
      setCurrentIndex((index) => {
        const newIndex = index + 1;
        const maxIndex = steps.length - 1;
        if (newIndex <= maxIndex) return newIndex;
        onFinish?.();
        clearInterval(timerId.current);
        return maxIndex;
      });

    timerId.current = setInterval(incrementIndex, interval);

    return () => clearInterval(timerId.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [milliseconds]);

  return (
    <div className={cn} {...props}>
      <CircleProgressCustom percentage={(currentIndex * 100) / steps.length}>
        <Icon color="white" name={steps[currentIndex]?.iconName || "map"} />
      </CircleProgressCustom>
      <Text className="opacity-animation">{steps[currentIndex]?.text}</Text>
    </div>
  );
}

interface CircleProgressProps extends BoxProps {
  percentage?: number;
  children?: ReactNode;
}

export const CircleProgressCustom = ({
  percentage = 20,
  children,
  className,
  ...props
}: CircleProgressProps) => {
  const offset = useMemo(() => clamp(percentage, 5, 100) * -1 - 100, [percentage]);
  return (
    <Box className="circle-progress" {...props}>
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
