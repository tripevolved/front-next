import { toJson } from "@/helpers/json.helpers";
import type { MenuGroupProps, MenuProps, SeoProps, SocialProps } from "@/types";

interface Seo extends Omit<SeoProps, "image"> {
  image?: { url?: string };
}

export interface PageData extends Seo {
  data: string;
  slices: [];
}

export interface TemplateData extends Seo {
  menu: MenuProps;
  slogan: string;
  social: SocialProps;
  sitemap: MenuProps;
  slices: any[];
}

const NOT_FOUND_INDEX = -1;

const makeFooterMenu = (items: MenuProps) => {
  return items.reduce((acc: MenuGroupProps[], { group = "Links", ...item }) => {
    const groupIndex = acc.findIndex(({ title }) => group === title);
    const isNotFoundIndex = groupIndex === NOT_FOUND_INDEX;
    const index = isNotFoundIndex ? acc.length : groupIndex;
    if (isNotFoundIndex) {
      acc.push({
        title: group,
        list: [],
      });
    }
    acc[index].list.push(item);
    return acc;
  }, []);
};

const makeSeo = ({ image, ...seo }: Seo) => {
  if (!image) return seo;
  if (typeof image === "string") return { image, ...seo };
  if (typeof image.url === "string") return { image: image.url, ...seo };
  return seo;
};

const templateSerializer = ({
  menu,
  slogan,
  social,
  sitemap,
  slices,
  ...seoProps
}: TemplateData) => {
  const navbar = { menu };
  const footer = { slogan, social, menu: makeFooterMenu(sitemap) };
  const seo = makeSeo(seoProps);
  return { navbar, footer, seo };
};

const makeDataJson = (slices: any[]) => {
  return slices.map(({ primary = {}, items = [] }) => {
    const { data, ...rest } = primary;
    const json = toJson(data);
    const children = items.map(({ children }: any) => toJson(children));
    const component = "SectionBase";
    return { component, ...rest, ...json, children };
  });
};

const pageSerializer = ({ data, slices, ...seoProps }: PageData) => {
  const json = toJson(data);
  const seo = makeSeo(seoProps);
  const children = makeDataJson(slices);
  return { seo, component: "PageBase", children, ...json };
};

const handler = (pageData: PageData, templateData: TemplateData) => {
  const page = pageSerializer(pageData);
  const template = templateSerializer(templateData);
  const seo = { ...template.seo, ...page.seo };
  return { ...template, ...page, seo };
};

export const PageSerializer = { handler };
