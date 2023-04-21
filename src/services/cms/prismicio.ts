import { ensureNotSlashEnds } from "@/helpers/url.helper";
import * as prismic from "@prismicio/client";

const PRISMIC_URL = ensureNotSlashEnds(
  process.env.PRISMIC_URL || "https://tripevolved.prismic.io/api/v2"
);

export const repositoryName = prismic.getRepositoryName(PRISMIC_URL);

export const createClient = () => {
  const client = prismic.createClient(PRISMIC_URL);

  return client;
};

export const makeGetterDataBySlug = (customType: string) => {
  const client = createClient();

  return async (slug: string) => {
    const query = prismic.predicate.at(`my.${customType}.slug`, slug);
    return client.get({ predicates: query, page: 1 }).then(({ results = [] }) => results[0]);
  };
};
