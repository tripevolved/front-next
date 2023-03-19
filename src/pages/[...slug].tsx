import { pageConfig } from "@/configs/page.config";
import { CMSService } from "@/services/cms/cms-service";
import type { GetStaticPaths, GetStaticProps } from "next";

export { default } from ".";

export const getStaticPaths: GetStaticPaths = async () => {
  const { paths } = await CMSService.getUidPages();
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug || [];
    const uid = Array.isArray(slug) ? slug.join("/") : slug;
    const props = await CMSService.getPage(uid);
    return { props, ...pageConfig.staticProps };
  } catch (error) {
    return { props: {}, ...pageConfig.staticProps };
  }
};
