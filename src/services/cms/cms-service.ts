import type { PageData, TemplateData } from "./cms.types";

import { PageSerializer } from "./page.serializer";
import { createClient, makeGetterDataBySlug } from "./prismicio";

const client = createClient();
const CUSTOM_TYPE = {
  PAGES: "pages",
  PART: "part",
  TEMPLATE: "siteTemplate",
};

const getPageBySlug = makeGetterDataBySlug(CUSTOM_TYPE.PAGES);
const getPart = makeGetterDataBySlug(CUSTOM_TYPE.PART);

const getPage = async (slug = "home") => {
  try {
    const template = await client.getSingle(CUSTOM_TYPE.TEMPLATE);
    const page = await getPageBySlug(slug);
    return PageSerializer.handler(page.data as PageData, template.data as TemplateData);
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

export const CMSService = { getPage, getAllPageSlugs, getPart };
