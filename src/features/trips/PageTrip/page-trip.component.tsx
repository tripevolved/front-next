import type { PageAppProps } from "@/features";
import { LogoMainInverse, Picture, Text } from "@/ui";

import { makeCn } from "@/utils/helpers/css.helpers";
import { Card, ToggleButton } from "mars-ds";
import { NextSeo } from "next-seo";

export function PageTrip({ className, children, seo }: PageAppProps) {
  const cn = makeCn("page-trip container container--lg", className)();

  return (
    <>
      {seo ? <NextSeo {...seo} /> : null}
      <main className={cn}>
        <PageTripAside title={seo?.title} />
        <Card as="section" className="page-trip__content">
          <div>
            {children}
          </div>
        </Card>
      </main>
    </>
  );
}

const PageTripAside = ({ title = "" }) => {
  return (
    <Card as="aside" className="page-trip__aside theme-dark">
      <div className="page-trip__menu">
        <ToggleButton title="Voltar para o painel" iconName="x" href="/app/painel" />
        <LogoMainInverse />
      </div>
      <Picture src="/assets/trip/trip-cover.png" md={{ src: "/assets/trip/trip-cover-2x.png" }} />
      <Text heading className="page-trip__aside__title">
        {title}
      </Text>
    </Card>
  );
};
