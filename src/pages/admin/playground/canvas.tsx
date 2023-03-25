import { AdaptedRibo, NoSSR } from "@/components";
import { toJson } from "@/helpers/json.helpers";
import { LocalStorageService } from "@/services/store/local-storage.service";
import { useEffect, useState } from "react";

const UPDATED_TIMEOUT = 2000;

const Canvas = () => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timeout = setInterval(() => {
      const data = LocalStorageService.get("playground-trip-evolved");
      if (value !== data) setValue(data || "");
    }, UPDATED_TIMEOUT);
    return () => clearInterval(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Ribo json={toJson(value)} />;
};

const RiboMessageError = () => <div>O json precisa ser um objeto válido.</div>;

const Ribo = ({ json }: { json: any }) => {
  if (typeof json !== "object") return <RiboMessageError />;
  try {
    return <AdaptedRibo>{json}</AdaptedRibo>;
  } catch (error) {
    return <RiboMessageError />;
  }
};

const PlaygroundCanvasPage = () => (
  <NoSSR>
    <Canvas />
  </NoSSR>
);

export default PlaygroundCanvasPage;
