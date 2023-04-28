import { TemplateProps } from "@/types";
import type { PageData, TemplateData } from "./cms.types";

import { PageSerializer } from "./page.serializer";
import { createClient, makeGetterDataBySlug } from "./prismicio";
import { TemplateSerializer } from "./template.serializer";

const client = createClient();
const CUSTOM_TYPE = {
  PAGES: "pages",
  PART: "part",
  TEMPLATE: "siteTemplate",
};

const getPageBySlug = makeGetterDataBySlug(CUSTOM_TYPE.PAGES);
const getPart = makeGetterDataBySlug(CUSTOM_TYPE.PART);

const getTemplate = async (): Promise<TemplateProps> =>
  client
    .getSingle(CUSTOM_TYPE.TEMPLATE)
    .then(({ data }) => data as TemplateData)
    .then(TemplateSerializer.handle);

const getPage = async (slug = "home") => {
  try {
    const template = await getTemplate();
    const page = await getPageBySlug(slug);
    return PageSerializer.handler(page.data as PageData, template);
  } catch (error) {
    /* TODO: return error page */
    return {};
  }
};

const getAllPageSlugs = async () => {
  try {
    const pages = await client.getAllByType(CUSTOM_TYPE.PAGES);
    const slugs = pages.reduce((acc: string[], { uid, data }) => {
      const slug = data.slug || uid;
      if (slug === "home" || !slug) return acc;
      return acc.concat(`/${slug}`);
    }, []);
    return { slugs };
  } catch (error) {
    return { slugs: [] };
  }
};

export const CMSService = { getPage, getAllPageSlugs, getPart, getTemplate };
