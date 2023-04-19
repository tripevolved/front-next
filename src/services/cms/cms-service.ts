import { PageData, PageSerializer, TemplateData } from "./page.serializer";
import { createClient } from "./prismicio";
import * as prismic from "@prismicio/client";

const client = createClient();
const CUSTOM_TYPE = {
  PAGES: "pages",
  TEMPLATE: "siteTemplate",
};

const getPage = async (slug = "home") => {
  try {
    const template = await client.getSingle(CUSTOM_TYPE.TEMPLATE);
    const page = await client
      .get({
        predicates: prismic.predicate.at("my.pages.slug", slug),
        page: 1,
      })
      .then(({ results = [] }) => results[0])
      // TODO: remove try getByUID
      .catch(() => client.getByUID(CUSTOM_TYPE.PAGES, slug));

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

export const CMSService = { getPage, getAllPageSlugs };
