import { seo } from "@/configs/seo.config";
import GoogleScripts from "@/libs/google-scripts";
import "@/styles/index.scss";
import { AppProvider } from "mars-ds";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import NextLink from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { ProgressIndicator } from "@/components";

const LinkComponent = ({ url, ...props }: any) => {
  return <NextLink href={url} {...props} />;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleScripts />
      <DefaultSeo
        themeColor={seo.themeColor}
        titleTemplate={`${seo.title} | %s`}
        defaultTitle={seo.title}
        description={seo.description}
        openGraph={{
          type: "website",
          locale: "pt-BR",
          url: seo.url,
          title: seo.title,
          description: seo.description,
          siteName: seo.title,
          images: [
            {
              url: seo.image,
              width: 1166,
              height: 712,
              alt: seo.description,
            },
          ],
        }}
        twitter={{
          site: seo.url,
          cardType: "summary_large_image",
        }}
      />
      <AppProvider linkComponent={LinkComponent}>
        <ProgressIndicator />
        <Component {...pageProps} />
      </AppProvider>
      <Analytics />
    </>
  );
}
