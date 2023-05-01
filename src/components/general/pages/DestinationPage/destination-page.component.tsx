import type { DestinationPageProps } from "./destination-page.types";
import { PageBase } from "@/components";
import { DestinationHeroSection } from "./destinations-hero.section";
import { DestinationInfoSection } from "./destination-info.section";
import { DestinationVideoSection } from "./destination-video.section";
import { DestinationTipsSection } from "./destination-tips.section";
import { DestinationPostsSection } from "./destinations-posts.section";
import { DestinationFaqSection } from "./destination-faq.section";

const mock = {
  faq: [
    {
      question: "Passagem aérea",
      icon: "/assets/destino/passagem-aerea.svg",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Hospedagem",
      icon: "/assets/destino/hospedagem.svg",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Roteiro completo",
      icon: "/assets/destino/roteiro.svg",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Dicas gastronômicas",
      icon: "/assets/destino/dicas-gastronomicas.svg",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Suporte durante a viagem",
      icon: "/assets/destino/suporte.svg",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ],
};


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
      <DestinationFaqSection faq={mock.faq} title={destination.title} />
    </PageBase>
  );
}
