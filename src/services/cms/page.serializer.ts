import type { PageData, TemplateData } from "./cms.types";

import { toJson } from "@/helpers/json.helpers";
import { SeoSerializer } from "./seo.serializer";
import { TemplateSerializer } from "./template.serializer";
import { PopulateService } from "./populate.service";

const makeDataJson = (slices: any[]) => {
  return slices.map(({ primary = {}, items = [] }) => {
    const { data, ...rest } = primary;
    const json = toJson(data);
    const children = items.map(({ children }: any) => toJson(children));
    const component = "SectionBase";
    return { component, ...rest, ...json, children };
  });
};

const parsePage = ({ data, slices, slug, ...seo }: PageData) => {
  const json = toJson(data);
  const children = makeDataJson(slices);
  return { seo, component: "PageBase", children, slug, ...json };
};

const handler = async (pageData: PageData, templateData: TemplateData) => {
  const { seo: pageSeo, ...parsedPage } = parsePage(pageData);
  const { seo: templateSeo, ...template } = TemplateSerializer.handle(templateData);
  const seo = SeoSerializer.handler({ ...templateSeo, ...pageSeo });

  const page = await PopulateService.handler(parsedPage);

  return { ...template, ...page, seo };
};

export const PageSerializer = { handler };
