import type { DestinationPageProps } from "./destination-page.types";
import { PageBase } from "@/components";
import { DestinationHeroSection } from "./destinations-hero.section";
import { DestinationInfoSection } from "./destination-info.section";
import { DestinationVideoSection } from "./destination-video.section";
import { DestinationTipsSection } from "./destination-tips.section";
import { DestinationPostsSection } from "./destinations-posts.section";
import { DestinationFaqSection } from "./destination-faq.section";

const mock = {
  features: [
    {
      title: "Beleza natural",
      description:
        "A ilha é famosa por suas belezas naturais, como praias paradisíacas, formações rochosas impressionantes e um mar cristalino, o que faz com que muitos turistas visitem a região em busca de tranquilidade, contato com a natureza e momentos de descanso. Além disso, o clima na ilha é agradável durante todo o ano, com temperaturas médias entre 25°C e 30°C, o que permite que os visitantes aproveitem as praias e as atividades ao ar livre em qualquer época do ano",
      icon: "/assets/destino/atracoes-culturais.png",
    },
    {
      title: "Atrações turísticas",
      description:
        "As principais atrações de Fernando de Noronha são suas praias, que são conhecidas por sua beleza exótica e pela preservação ambiental. Algumas das praias mais populares incluem a Praia do Sancho, a Baía do Sueste, a Praia do Leão e a Praia da Atalaia. Além disso, o arquipélago possui diversas trilhas, mirantes e pontos turísticos, como o Forte de Nossa Senhora dos Remédios, o Mirante dos Golfinhos e a Baía dos Porcos. Além disso, existem diversas iniciativas de preservação da fauna e flora local, incluindo a proteção das tartarugas marinhas, golfinhos e tubarões.",
      icon: "/assets/destino/culinaria.png",
    },
  ],
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
  recommendedBy: {
    name: "Debora Heppi",
    photo: "/assets/destino/profile.png",
    instagram: "",
    tikTok: "",
    blog: "",
    recommendationText:
      "Pouquíssimos lugares no mundo oferecem beleza + preservação + baixíssima densidade demográfica + livre acesso. Porém, para que assim seja, o local é caro e cobra taxa de preservação para entrar na ilha e ingresso nas praias principais.",
  },
};

export function DestinationPage({ destination, seo, navbar, footer }: DestinationPageProps) {
  return (
    <PageBase navbar={navbar} footer={footer} seo={seo}>
      <DestinationHeroSection title={destination.title} photos={destination.photos} />
      <DestinationInfoSection features={mock.features} recommendedBy={mock.recommendedBy} />
      <DestinationVideoSection videos={destination.videos} />
      <DestinationTipsSection tips={destination.tips} />
      <DestinationPostsSection posts={destination.posts} />
      <DestinationFaqSection faq={mock.faq} title={destination.title} />
    </PageBase>
  );
}
