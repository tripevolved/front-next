import { AdaptedRibo, HTMLHead } from "@/components";
import { pageConfig } from "@/configs/page.config";
import { ApiService } from "@/services/api/api-service";
import { PageProps } from "@/types";
import type { GetStaticProps } from "next";

export default function Page({ seo, ...children }: PageProps) {
  return (
    <>
      <HTMLHead {...seo} />
      <AdaptedRibo>{children}</AdaptedRibo>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const uid = "home";
    const props = await ApiService.getPage(uid);
    return { props, ...pageConfig.staticProps };
  } catch (error) {
    return { props: {}, ...pageConfig.staticProps };
  }
};
