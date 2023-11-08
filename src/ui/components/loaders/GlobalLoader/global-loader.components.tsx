import { makeCn } from "@/utils/helpers/css.helpers";
import { Loader } from "mars-ds";
import { useEffect } from "react";

export function GlobalLoader({ inline = false }) {
  const cn = makeCn("global-loader", { "global-loader--block": !inline })();

  useEffect(() => {
    if (inline) return;
    document.body.dataset.overlay = "true";
    return () => {
      document.body.dataset.overlay = "false";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn} onClick={(event) => inline || event.stopPropagation()}>
      <Loader color="var(--color-primary-500)" size={inline ? "md" : "xl"} />
    </div>
  );
}
