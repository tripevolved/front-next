import type { PageData } from "./cms.types";

import { toJson } from "@/helpers/json.helpers";
import { SeoSerializer } from "./seo.serializer";
import { PopulateService } from "./populate.service";
import { TemplateProps } from "@/types";

const makeDataJson = (slices: any[]) => {
  return slices.map(({ primary = {}, items = [] }) => {
    const { data, ...rest } = primary;
    const json = toJson(data);
    const children = items.map(({ children }: any) => toJson(children));
    const component = "SectionBase";
    return { component, ...rest, ...json, children };
  });
};

const parsePage = ({ data, slices, slug, photos, ...seo }: PageData) => {
  const json = toJson(data);
  const children = makeDataJson(slices);
  return { seo, component: "PageBase", children, slug, photos, ...json };
};

const handler = async (pageData: PageData, template: TemplateProps) => {
  const { seo: pageSeo, ...parsedPage } = parsePage(pageData);
  const { seo: templateSeo, ...restTemplate } = template;
  const seo = SeoSerializer.handler({ ...templateSeo, ...pageSeo });

  const page = await PopulateService.handler(parsedPage);

  return { ...restTemplate, ...page, seo };
};

export const PageSerializer = { handler };
