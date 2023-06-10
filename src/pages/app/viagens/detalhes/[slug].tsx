import { type GetServerSideProps } from "next";

import { TripDetails, type TripDetailsPageProps } from "@/features";
import { TripsApiService } from "@/services/api/trip";
import { CMSService } from "@/services/cms/cms-service";

export default function TripDetailsPageRoute(props: TripDetailsPageProps) {
  return <TripDetails {...props} />;
}

export const getServerSideProps: GetServerSideProps = async ({ res, params }) => {
  // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr
  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");

  const tripId = params?.slug;
  const currentTripId = Array.isArray(tripId) ? tripId.join("/") : tripId ?? null;

  if (!currentTripId) return { notFound: true };

  const [tripDetails, template] = await Promise.all([
    TripsApiService.getById(currentTripId),
    CMSService.getTemplate(),
  ]);

  const seo = { ...template.seo }

  const props = { tripDetails, ...template, seo };

  return { props };
};
