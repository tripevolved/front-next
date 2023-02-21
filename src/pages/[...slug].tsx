import { AdaptedRibo, HTMLHead } from "@/components";
import { staticJsonPaths } from "@/data/pages";
import { PageProps } from "@/types";
import type { GetStaticPaths, GetStaticProps } from "next";

export default function Page({ seo, ...children }: PageProps) {
  return (
    <>
      <HTMLHead {...seo} />
      <AdaptedRibo>{children}</AdaptedRibo>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: staticJsonPaths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug || [];
    const file = Array.isArray(slug) ? slug.join("/") : slug;
    const props = require(`../data/pages/${file}.json`);
    return { props };
  } catch (error) {
    return { props: {} };
  }
};
