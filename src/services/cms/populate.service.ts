import dataSchemaModifier from "ribof/json-schema-modifier";
import { toJson } from "@/helpers/json.helpers";
import { CMSService } from "./cms-service";

const getPartBySlug = async (slug?: any): Promise<any> => {
  if (typeof slug !== "string") return {};
  return CMSService.getPart(slug)
    .then(({ data }) => toJson(data.data))
    .catch(() => null);
};

const injectWith = (dataProvided: any, schema: any) => {
  if (!schema) return null;
  if (typeof dataProvided !== "object") return schema;
  return dataSchemaModifier(dataProvided, schema);
};

const addImports = async (data: any): Promise<any> => {
  if (!data) return data;

  const { children: dataChildren, import: slug, with: dataProvided, ...rest } = data;

  const importedData = await getPartBySlug(slug);

  const children = injectWith(dataProvided, importedData?.children) || dataChildren || null;

  if (!children || typeof children !== "object") {
    return { ...importedData, ...data, children };
  }

  const c = Array.isArray(children) ? children : [children];

  return {
    ...importedData,
    ...rest,
    children: await Promise.all(c.map(addImports)),
  };
};

export const PopulateService = { addImports };
