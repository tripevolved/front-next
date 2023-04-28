import { type GetServerSideProps } from "next";
import { DestinationApiService } from "@/services/api/destination";
import { DestinationPage } from "@/components";
import { PublicDestination } from "@/types";

interface DestinationPageRouteProps {
  destination: PublicDestination;
}

export default function DestinationPageRoute(props: DestinationPageRouteProps) {
  return <DestinationPage {...props} />;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr
  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");

  const slug = params?.slug;
  const name = Array.isArray(slug) ? slug.join("/") : slug ?? null;

  if (!name) return { notFound: true };

  const destination = await DestinationApiService.getByName(name);

  const props = { destination };

  return { props };
};
