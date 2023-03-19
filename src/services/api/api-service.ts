import { PageData, PageSerializer, TemplateData } from "./page.serializer";
import { createClient } from "./prismicio";

const client = createClient();
const CUSTOM_TYPE = {
  PAGES: "pages",
  TEMPLATE: "siteTemplate",
};

const getPage = async (uid = "home") => {
  try {
    const template = await client.getSingle(CUSTOM_TYPE.TEMPLATE);
    const page = await client.getByUID(CUSTOM_TYPE.PAGES, uid);
    return PageSerializer.handler(page.data as PageData, template.data as TemplateData)
  } catch (error) {
    /* TODO: return error page */
    return {};
  }
};

const getUidPages = async () => {
  try {
    const pages = await client.getAllByType(CUSTOM_TYPE.PAGES);
    const paths = pages.reduce((acc: string[], { uid }) => {
      if (uid === "home" || !uid) return acc;
      return acc.concat(`/${uid}`);
    }, []);
    return { paths };
  } catch (error) {
    return { paths: [] };
  }
};

export const ApiService = { getPage, getUidPages };
