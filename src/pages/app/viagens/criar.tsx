import { PageApp, TripBuilder, type TripBuilderPageProps } from "@/features";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { DestinationApiService } from "@/services/api";

export default function TripCreatePageRoute(props: TripBuilderPageProps) : InferGetServerSidePropsType<typeof getServerSideProps> {
  console.log("teste" + props.destinationId);
  return (
    <PageApp>
      <TripBuilder {...props} />;
    </PageApp>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ res, params }) => {
  // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr
  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");

  const toParam = params?.para || null;
  const destinationUniqueName = Array.isArray(toParam) ? toParam.join("/") : toParam ?? null;

  if (!destinationUniqueName) return { notFound: true };

  const destination = await DestinationApiService.getByName(destinationUniqueName);

  const props = { destinationId: destination.id };

  return { props };
};