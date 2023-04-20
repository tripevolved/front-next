import { toJson } from "@/helpers/json.helpers";
import { CMSService } from "./cms-service";

const getPartBySlug = async (slug?: any): Promise<null | any> => {
  if (typeof slug !== "string") return null;
  return CMSService.getPart(slug).then(({ data }) => toJson(data.data));
}

const addImports = async (data: any): Promise<any> => {
  if (!data) return data;

  const { children, import: slug, ...rest } = data;


  const importedData = await getPartBySlug(slug)
  if (slug) console.log(slug, importedData)

  if (!children || typeof children !== "object") {
    return { ...importedData, ...data };
  }

  const c = Array.isArray(children) ? children : [children]

  return {
    ...importedData,
    ...rest,
    children: await Promise.all(c.map(addImports)),
  };
};

export const PopulateService = { addImports };
