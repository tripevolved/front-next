import { accesses, settings } from "@/configs/ribo.config";
import type { RiboProps } from "ribof/ribo";
import Ribo from "ribof/ribo";

export function AdaptedRibo({ children }: RiboProps["children"]) {
  return (
    <Ribo settings={settings} accesses={accesses}>
      {children}
    </Ribo>
  );
}
