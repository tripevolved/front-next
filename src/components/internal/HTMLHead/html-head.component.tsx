import { seo } from "@/configs/seo.config";
import Head from "next/head";

interface HTMLHeadProps {
  url: string;
  title: string;
  description: string;
  image: string;
  robots: string;
  canonical: string;
  favicon: string;
}

export function HTMLHead({
  url = seo.url,
  title = seo.title,
  description = seo.description,
  image = seo.image,
  robots,
  canonical,
  favicon,
}: Partial<HTMLHeadProps>) {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {robots && <meta name="robots" content={robots} />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Favicon */}
      {favicon && <link rel="shortcut icon" href={favicon} type="image/x-icon" />}
    </Head>
  );
}
