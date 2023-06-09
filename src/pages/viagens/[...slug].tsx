import { type GetServerSideProps } from "next";

import { TripDetails, type TripDetailsPageProps } from "@/features";
import { TripsApiService } from "@/services/api/trip";
import { CMSService } from "@/services/cms/cms-service";
import { useLocalStorage } from "@/utils/hooks/local-storage.hooks";

export default function TripDetailsPageRoute(props: TripDetailsPageProps) {
  return <TripDetails {...props} />;
}

export const getServerSideProps: GetServerSideProps = async ({ res, params }) => {
  // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr
  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");

  const slug = params?.slug;
  const name = Array.isArray(slug) ? slug.join("/") : slug ?? null;

  if (!name) return { notFound: true };

  const [tripDetails, template] = await Promise.all([
    TripsApiService.getById(name),
    CMSService.getTemplate(),
  ]);

  const seo = { ...template.seo }

  const props = { tripDetails, ...template, seo };

  return { props };
};
