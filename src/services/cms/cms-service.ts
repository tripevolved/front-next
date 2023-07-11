import { TemplateProps } from "@/core/types";
import type { PageData, TemplateData } from "./cms.types";

import { PageSerializer } from "./page.serializer";
import { createClient, makeGetterDataBySlug } from "./prismicio";
import { TemplateSerializer } from "./template.serializer";
import { isEmptyChildren } from "./page.helpers";

const client = createClient();
const CUSTOM_TYPE = {
  PAGES: "pages",
  PART: "part",
  TEMPLATE: "siteTemplate",
};

const ERROR_SLUG = "erro";

const getPageBySlug = makeGetterDataBySlug(CUSTOM_TYPE.PAGES);
const getPart = makeGetterDataBySlug(CUSTOM_TYPE.PART);

const getTemplate = async (): Promise<TemplateProps> =>
  client
    .getSingle(CUSTOM_TYPE.TEMPLATE)
    .then(({ data }) => data as TemplateData)
    .then(TemplateSerializer.handle);

async function getPage(slug = "home", attempts = 0): Promise<any> {
  // This line below ensures that there is NO infinite loop
  if (attempts > 1) return {};
  try {
    const template = await getTemplate();
    const page = await getPageBySlug(slug);
    const result = await PageSerializer.handler(page.data as PageData, template);
    if (!isEmptyChildren(result.children)) return result;
    const pageError = await getPageBySlug(ERROR_SLUG);
    return PageSerializer.handler(pageError.data as PageData, template);
  } catch (error) {
    return getPage(ERROR_SLUG, attempts + 1);
  }
}

async function getSection(slug = "home", attempts = 0): Promise<any> {
  // This line below ensures that there is NO infinite loop
  if (attempts > 1) return {};
  try {
    const page = await getPageBySlug(slug);
    const result = await PageSerializer.sectionHandler(page.data as PageData);
    if (!isEmptyChildren(result.children)) return result.children[0];
    const pageError = await getPageBySlug(ERROR_SLUG);
    return PageSerializer.sectionHandler(pageError.data as PageData);
  } catch (error) {
    return getSection(ERROR_SLUG, attempts + 1);
  }
}

const getPageError = async () => getPage(ERROR_SLUG);
const getSectionError = async () => getSection(ERROR_SLUG);

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

export const CMSService = { getPage, getPageError, getAllPageSlugs, getPart, getTemplate, getSection, getSectionError };
