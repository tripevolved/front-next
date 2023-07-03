import { makeCn } from "@/utils/helpers/css.helpers";
import { Loader } from "mars-ds";

export function GlobalLoader({ inline = false }) {
  const cn = makeCn("global-loader", { "global-loader--block": !inline })();
  return (
    <div className={cn}>
      <Loader color="var(--color-primary-500)" />
    </div>
  );
}
