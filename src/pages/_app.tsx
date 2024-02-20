import { seo } from "@/core/configs/seo.config";
import GoogleScripts from "@/utils/libs/google-scripts";
import { AppProvider } from "mars-ds";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import NextLink from "next/link";
import { NoSSR, ProgressIndicator } from "@/ui";

import "@/ui/styles/index.scss";
import { LeadProvider } from "@/features";
import { Environment } from "@/utils/helpers/environment.helpers";
import { AppAuthProvider } from "@/core/app-auth";
import { useAnalytics } from "@/services/analytics";

const scrollTo = (id: string, event: React.MouseEvent<HTMLAnchorElement>) => {
  const el = document.querySelector(id);
  if (!el) return;
  event.preventDefault();
  const rect = el.getBoundingClientRect();
  const offset = 32;
  const top = rect.top - offset;
  window.scrollTo({ top, behavior: "smooth" });
};

const LinkComponent = ({ url, ...props }: any) => {
  const isAnchor = /^#/.test(url);
  if (isAnchor) return <a href={url} onClick={(event) => scrollTo(url, event)} {...props} />;
  return <NextLink href={url} {...props} />;
};

export default function App({ Component, pageProps }: AppProps) {
  useAnalytics();
  return (
    <LeadProvider>
      <Seo />
      <GoogleScripts />
      <AppProvider linkComponent={LinkComponent}>
        <ProgressIndicator />
        <AppAuthProvider>
          <NoSSR enabled={Environment.isProduction()}>
            <Component {...pageProps} />
          </NoSSR>
        </AppAuthProvider>
      </AppProvider>
    </LeadProvider>
  );
}

const Seo = () => (
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
);
