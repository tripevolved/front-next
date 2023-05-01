import { type GetServerSideProps } from "next";
import { DestinationApiService } from "@/services/api/destination";
import { DestinationPage, type DestinationPageProps } from "@/components";
import { CMSService } from "@/services/cms/cms-service";

export default function DestinationPageRoute(props: DestinationPageProps) {
  return <DestinationPage {...props} />;
}

export const getServerSideProps: GetServerSideProps = async ({ res, params }) => {
  // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr
  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");

  const slug = params?.slug;
  const name = Array.isArray(slug) ? slug.join("/") : slug ?? null;

  if (!name) return { notFound: true };

  const [destination, template] = await Promise.all([
    DestinationApiService.getByName(name),
    CMSService.getTemplate(),
  ]);

  const seo = { ...template.seo, title: destination.title }

  const props = { destination, ...template, seo };

  return { props };
};
