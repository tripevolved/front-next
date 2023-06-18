import { NextSeo } from "next-seo";
import { pageConfig } from "@/core/configs/page.config";
import { PageProps } from "@/core/types";
import type { GetStaticProps } from "next";
import { AppRibo } from "@/core/app-ribo";
import { CMSService } from "@/services/cms/cms-service";

export default function PageError({ seo, ...children }: PageProps) {
  return (
    <>
      <NextSeo {...seo} />
      <AppRibo>{children}</AppRibo>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const props = await CMSService.getPageError();
    return { props, ...pageConfig.staticProps };
  } catch (error) {
    return { props: {}, ...pageConfig.staticProps };
  }
};
