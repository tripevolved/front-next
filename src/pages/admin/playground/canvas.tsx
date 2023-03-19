import { AdaptedRibo } from "@/components";
import { toJson } from "@/helpers/json.helpers";
import { LocalStorageService } from "@/services/store/local-storage.service";
import { useEffect, useState } from "react";

const UPDATED_TIMEOUT = 2000;

const PlaygroundCanvasPage = () => {
  const [json, setJson] = useState({});

  useEffect(() => {
    const timeout = setInterval(() => {
      const dataJson = LocalStorageService.get("playground-trip-evolved");
      setJson(toJson(dataJson));
    }, UPDATED_TIMEOUT);
    return () => clearInterval(timeout);
  }, []);


  return <Ribo json={json} />;
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

export default PlaygroundCanvasPage;
