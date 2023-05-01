import type { MenuProps, SocialProps } from "@/types";
import type { SeoNotSerialized } from "./seo.serializer";

export interface PageData extends SeoNotSerialized {
  slug: string;
  data: string;
  photos: any[];
  slices: [];
}

export interface TemplateData {
  menu: MenuProps;
  slogan: string;
  social: SocialProps;
  sitemap: MenuProps;
  slices: any[];
}
