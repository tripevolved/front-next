import { pageConfig } from "@/core/configs/page.config";
import { CMSService } from "@/services/cms/cms-service";
import type { GetStaticPaths, GetStaticProps } from "next";

export { default } from "./index.old";

const EXCLUDED_PATHS = ['/perfil/perguntas'];

export const getStaticPaths: GetStaticPaths = async () => {
  const { slugs } = await CMSService.getAllPageSlugs();
  const filteredSlugs = slugs.filter(slug => !EXCLUDED_PATHS.includes(slug));
  return { paths: filteredSlugs, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug || [];
    const uid = Array.isArray(slug) ? slug.join("/") : slug;
    const props = await CMSService.getPage(uid);
    return { props, ...pageConfig.staticProps };
  } catch (error) {
    const props = await CMSService.getPageError();
    return { props, ...pageConfig.staticProps };
  }
};
