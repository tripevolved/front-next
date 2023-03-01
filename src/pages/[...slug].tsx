import { ApiService } from "@/services/api/api-service";
import type { GetStaticPaths, GetStaticProps } from "next";

export { default } from ".";

export const getStaticPaths: GetStaticPaths = async () => {
  const { paths } = await ApiService.getUidPages();
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug || [];
    const uid = Array.isArray(slug) ? slug.join("/") : slug;
    const props = await ApiService.getPage(uid);
    return { props };
  } catch (error) {
    return { props: {} };
  }
};
