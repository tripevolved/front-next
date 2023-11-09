import { delay } from "@/utils/helpers/async.helpers";
import { useMemo, useState } from "react";

type AnimationProps = { timing?: number };

export const useAnimation = (props: AnimationProps = {}) => {
  const [active, setActive] = useState(false);
  const [forward, setForward] = useState(false);

  const { timing = 300 } = props;

  const style = useMemo(() => {
    if (!active) return undefined;
    return {
      transition: `all ease ${timing}ms`,
      transform: `translateX(${forward ? "-100%" : "100%"})`,
      opacity: 0,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, forward]);

  const trigger = async (forward: boolean, fn?: VoidFunction) => {
    setActive(true);
    setForward(forward);
    await delay(timing);
    setActive(false);
    fn?.();
  };

  return { active, style, trigger };
};
