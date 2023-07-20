import { useEffect, useState } from "react";
import type { NoSSRProps } from "./no-SSR.types";

export const NoSSR = ({ children = null, enabled = false }: NoSSRProps) => {
  const [ready, setReady] = useState(enabled);

  useEffect(() => {
    if (!enabled) setReady(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ready ? children : null;
}
