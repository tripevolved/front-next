import { delay } from "@/utils/helpers/async.helpers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const usePasswordConfirmationToken = () => {
  const [isExpired, setIsExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const queryId = router.query["uniqueId"];
  const uniqueId = typeof queryId === "string" ? queryId : undefined;

  const getDataByUniqueId = async () => {
    setIsLoading(true);
    await delay(2000);

    // TODO: implements logic here
    const response = {};
    setIsExpired(false);
    setIsLoading(false);
  };

  useEffect(() => {
    if (uniqueId) getDataByUniqueId();
  }, [uniqueId]);

  return {
    isExpired,
    isLoading,
    uniqueId,
  };
};
