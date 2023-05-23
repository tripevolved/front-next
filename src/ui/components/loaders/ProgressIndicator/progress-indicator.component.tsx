import { useEffect, useState } from "react";
import Router from "next/router";
import { makeCn } from "@/utils/helpers/css.helpers";

export function ProgressIndicator() {
  const [fetching, setFetching] = useState(false);
  const [fetched, setFetched] = useState(false);

  const handleStart = () => {
    setFetching(true);
    setFetched(false);
  };

  const handleStop = () => {
    setFetching(false);
    setFetched(true);
  };

  useEffect(() => {
    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleStop);
    Router.events.on("routeChangeError", handleStop);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleStop);
      Router.events.off("routeChangeError", handleStop);
    };
  }, []);

  const cn = makeCn("progress-indicator", {
    "progress-indicator--is-fetching": fetching,
    "progress-indicator--is-fetched": fetched,
  })();

  return <div className={cn} />;
};
