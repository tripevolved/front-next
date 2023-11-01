import { useRouter } from "next/router";

export const useIdParam = () => {
  const router = useRouter();
  return typeof router.query.id === "string" ? router.query.id : null;
};
