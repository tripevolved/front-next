import type { MenuGroupProps, TemplateProps } from "@/core/types";
import type { TemplateData } from "./cms.types";

const NOT_FOUND_INDEX = -1;

const makeFooterMenu = (items: TemplateData["menu"]) => {
  return items.reduce((acc: MenuGroupProps[], { group = "Links", ...item }) => {
    const groupIndex = acc.findIndex(({ title }) => group === title);
    const isNotFoundIndex = groupIndex === NOT_FOUND_INDEX;
    const index = isNotFoundIndex ? acc.length : groupIndex;
    if (isNotFoundIndex) {
      acc.push({
        title: group,
        list: [],
      });
    }
    acc[index].list.push(item);
    return acc;
  }, []);
};

const handle = ({ menu, slogan, social, sitemap, slices, ...seo }: TemplateData): TemplateProps => {
  const navbar = { menu };
  const footer = { slogan, social, menu: makeFooterMenu(sitemap) };
  return { navbar, footer, seo };
};

export const TemplateSerializer = { handle };
