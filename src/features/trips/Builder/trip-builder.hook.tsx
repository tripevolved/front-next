import { PublicDestination } from "@/core/types";
import { DestinationApiService } from "@/services/api";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export const useTripBuilder = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<PublicDestination | null>(null);
  const [error, setError] = useState(false);

  const router = useRouter();
  const toParam = typeof router.query.para === "string" ? router.query.para : null;
  console.log(toParam);

  const fetchBuilder = async (destinationUniqueName: string) => {
    setIsLoading(true);
    setError(false);
    return DestinationApiService.getByName(destinationUniqueName)
      .then(setData)
      .catch(() => {
        setError(true);
      });
  };

  useEffect(() => {
    if (toParam) fetchBuilder(toParam);
    setIsLoading(false);
  }, [toParam]);

  return { isLoading, data, error };
};
