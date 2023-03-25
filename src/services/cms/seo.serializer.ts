import { OpenGraphMedia } from "next-seo/lib/types";

import type { SeoProps } from "@/types";

interface ImageProps {
  dimensions: { width: number | null; height: number | null };
  alt: string | null;
  url: string | null;
  copyright: string | null;
}

interface PrismicImageProps extends ImageProps {
  dimensions: { width: number | null; height: number | null };
  alt: string | null;
  url: string | null;
  square?: ImageProps;
}

export interface SeoNotSerialized extends Omit<SeoProps, "images"> {
  image?: PrismicImageProps;
}

const getSeoImage = (props?: ImageProps) => {
  if (!props) return null;
  const { alt, dimensions, url } = props;
  if (!url) return null;
  return { url, alt: alt || "", ...dimensions } satisfies OpenGraphMedia;
};

const makeSeo = ({ image, ...seo }: SeoNotSerialized): SeoProps => {
  if (!image) return seo;
  const images: OpenGraphMedia[] = [];
  const media1 = getSeoImage(image);
  const media2 = getSeoImage(image.square);
  if (media1) images.push(media1);
  if (media2) images.push(media2);
  const openGraph = {
    title: seo.title,
    description: seo.description,
    images,
  };
  return { openGraph, ...seo };
};

export const SeoSerializer = { handler: makeSeo };
