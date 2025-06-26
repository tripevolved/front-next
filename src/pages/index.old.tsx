import { NextSeo } from "next-seo";
import { pageConfig } from "@/core/configs/page.config";
import { PageProps } from "@/core/types";
import type { GetStaticProps } from "next";
import { AppRibo } from "@/core/app-ribo";
import { CMSService } from "@/services/cms/cms-service";
import { useEffect, useState } from "react";
import ErrorPage from "./_error";

export default function Page({ seo, ...children }: PageProps) {
  const [isApp, setIsApp] = useState(false);

  useEffect(() => {
    setIsApp(/^\/app/.test(location.pathname));
  }, []);

  if (isApp) return <ErrorPage />;

  return (
    <>
      <NextSeo {...seo} />
      <AppRibo>{children}</AppRibo>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const uid = "home";
    const props = await CMSService.getPage(uid);
    return { props, ...pageConfig.staticProps };
  } catch (error) {
    const props = await CMSService.getPageError();
    return { props, ...pageConfig.staticProps };
  }
};
