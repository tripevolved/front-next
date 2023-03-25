import { AdaptedRibo } from "@/components";
import { NextSeo } from "next-seo";
import { pageConfig } from "@/configs/page.config";
import { CMSService } from "@/services/cms/cms-service";
import { PageProps } from "@/types";
import type { GetStaticProps } from "next";

export default function Page({ seo, ...children }: PageProps) {
  return (
    <>
      <NextSeo {...seo} />
      <AdaptedRibo>{children}</AdaptedRibo>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const uid = "home";
    const props = await CMSService.getPage(uid);
    return { props, ...pageConfig.staticProps };
  } catch (error) {
    return { props: {}, ...pageConfig.staticProps };
  }
};
