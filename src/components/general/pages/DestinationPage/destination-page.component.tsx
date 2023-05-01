import type { DestinationPageProps } from "./destination-page.types";
import { PageBase } from "@/components";
import { DestinationHeroSection } from "./destinations-hero.section";
import { DestinationInfoSection } from "./destination-info.section";
import { DestinationVideoSection } from "./destination-video.section";
import { DestinationTipsSection } from "./destination-tips.section";
import { DestinationPostsSection } from "./destinations-posts.section";


export function DestinationPage({ destination, seo, navbar, footer }: DestinationPageProps) {
  return (
    <PageBase navbar={navbar} footer={footer} seo={seo}>
      <DestinationHeroSection title={destination.title} photos={destination.photos} />
      <DestinationInfoSection
        features={destination.features}
        recommendedBy={destination.recommendedBy}
      />
      <DestinationVideoSection videos={destination.videos} />
      <DestinationTipsSection tips={destination.tips} />
      <DestinationPostsSection posts={destination.posts} />
    </PageBase>
  );
}
