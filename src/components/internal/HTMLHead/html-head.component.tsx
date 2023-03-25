import { seo } from "@/configs/seo.config";
import Head from "next/head";

interface RobotProps {
  robots: string;
  nofollow: boolean;
  noindex: boolean;
}

interface HTMLHeadProps extends RobotProps {
  title: string;
  description: string;
  image: string;
  canonical: string;
  favicon: string;
}

export function HTMLHead({
  title = seo.title,
  description = seo.description,
  image = seo.image,
  robots,
  nofollow,
  noindex,
  canonical,
  favicon,
}: Partial<HTMLHeadProps>) {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <Robots robots={robots} nofollow={nofollow} noindex={noindex} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Image */}
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:height" content="800" />
      <meta property="og:image:width" content="800" />
      <meta property="og:image:alt" content={description} />
      <meta property="og:image:type" content="image/jpg" />

      {/* Favicon */}
      {favicon && <link rel="shortcut icon" href={favicon} type="image/x-icon" />}
    </Head>
  );
}

const Robots = ({ robots, nofollow, noindex }: Partial<RobotProps>) => {
  if (robots) return <meta name="robots" content={robots} />;
  const content = cx({ nofollow, noindex });
  if (!content) return null;
  return <meta name="robots" content={content} />;
};

const cx = (obj = {}) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (!value) return acc;
    if (!acc) return key;
    return `${acc}, ${key}`;
  }, "");
};
