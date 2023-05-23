import type { GetServerSideProps } from "next";

import { pageConfig } from "@/core/configs/page.config";
import { ensureNotSlashEnds, ensureNotSlashStarts } from "@/utils/helpers/url.helper";
import { CMSService } from "@/services/cms/cms-service";

const DOMAIN = ensureNotSlashEnds(pageConfig.url);

const removeNotIndexPages = (slug: string) => !["convite", "inscrito"].includes(slug);

export default function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // We make an API call to gather the URLs for our site
  const pages = await CMSService.getAllPageSlugs();
  const slugs = pages.slugs.map(ensureNotSlashStarts).filter(removeNotIndexPages);

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(slugs);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return { props: {} };
};

function generateSiteMap(slugs: string[]) {
  const urls = slugs.map((slug) => `<url><loc>${`${DOMAIN}/${slug}`}/</loc></url>`).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!--We manually set the two URLs we know already-->
    <url><loc>${DOMAIN}</loc></url>
    ${urls}
  </urlset>
`;
}
