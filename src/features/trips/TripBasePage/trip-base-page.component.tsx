import type { TripBasePageProps } from "./trip-base-page.types";
import { PageBase } from "@/features";

export function TripBasePage({ seo, navbar, footer }: TripBasePageProps) {
  return (
    <PageBase navbar={navbar} footer={footer} seo={seo}>
      <></>
    </PageBase>
  );
}
