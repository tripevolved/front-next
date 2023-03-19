import { toJson } from "@/helpers/json.helpers";
import { createClient } from "./prismicio";

const client = createClient();
const CUSTOM_TYPE = {
  PAGES: "pages",
};

const getPage = async (uid = "home") => {
  try {
    const page = await client.getByUID(CUSTOM_TYPE.PAGES, uid);
    const { data, image = {}, ...seo } = page.data;
    const json = toJson(data);
    return { ...json, seo: { ...seo, image: image.url } };
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
