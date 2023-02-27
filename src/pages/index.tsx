import { AdaptedRibo, HTMLHead } from "@/components";
import home from "@/data/pages/home.json";
import type { PageProps } from "@/types";

export default function Page() {
  const { seo, ...children } = home satisfies PageProps;
  return (
    <>
      <HTMLHead {...seo} canonical="https://www.tripevolved.com.br" />
      <AdaptedRibo>{children}</AdaptedRibo>
    </>
  );
}

