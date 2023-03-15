import { ensureNotSlashEnds } from "@/helpers/url.helper";
import * as prismic from "@prismicio/client";

const PRISMIC_API = ensureNotSlashEnds(
  process.env.PRISMIC_API || "https://tripevolved.prismic.io/api/v2"
);

export const repositoryName = prismic.getRepositoryName(PRISMIC_API);

export const createClient = () => {
  const client = prismic.createClient(PRISMIC_API);

  return client;
};
