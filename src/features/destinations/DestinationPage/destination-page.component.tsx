import type { DestinationPageProps } from "./destination-page.types";
import { PageBase } from "@/features";
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
      type: "/assets/destino/atracoes-culturais.png",
    },
    {
      title: "Atrações turísticas",
      description:
        "As principais atrações de Fernando de Noronha são suas praias, que são conhecidas por sua beleza exótica e pela preservação ambiental. Algumas das praias mais populares incluem a Praia do Sancho, a Baía do Sueste, a Praia do Leão e a Praia da Atalaia. Além disso, o arquipélago possui diversas trilhas, mirantes e pontos turísticos, como o Forte de Nossa Senhora dos Remédios, o Mirante dos Golfinhos e a Baía dos Porcos. Além disso, existem diversas iniciativas de preservação da fauna e flora local, incluindo a proteção das tartarugas marinhas, golfinhos e tubarões.",
      type: "/assets/destino/culinaria.png",
    },
  ],
  faq: [
    {
      question: "Passagem aérea",
      type: "/assets/destino/passagem-aerea.svg",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Hospedagem",
      type: "/assets/destino/hospedagem.svg",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Roteiro completo",
      type: "/assets/destino/roteiro.svg",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Dicas gastronômicas",
      type: "/assets/destino/dicas-gastronomicas.svg",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Suporte durante a viagem",
      type: "/assets/destino/suporte.svg",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ],
  tips: [
    {
      title: "Número de dias para visitar",
      type: "clock",
      subtitle: "5 dias",
      description: "",
    },
    {
      title: "Custo diário",
      type: "dollar-sign",
      subtitle: "R$250,00",
      description: "",
    },
    {
      title: "Período recomendado",
      type: "calendar",
      subtitle: "o ano todo",
      description: "",
    },
    {
      title: "Segurança",
      type: "shield",
      subtitle: "destino considerado seguro",
      description: "",
    },
  ],
  videos: [
    {
      provider: "youtube",
      source: "kSvaiM9Go2Y",
    },
  ],
};

export function DestinationPage({ destination, seo, navbar, footer }: DestinationPageProps) {
  const {
    features = [],
    photos = [],
    posts = [],
    recommendedBy,
    tips = [],
    title,
    videos = [],
  } = { ...destination, ...mock };
  return (
    <PageBase navbar={navbar} footer={footer} seo={seo}>
      <DestinationHeroSection title={title} photos={photos} />
      <DestinationInfoSection features={features} recommendedBy={recommendedBy} />
      {videos.length ? <DestinationVideoSection title={title} videos={videos} /> : null}
      {tips.length ? <DestinationTipsSection tips={tips} /> : null}
      {posts.length ? <DestinationPostsSection posts={posts} /> : null}
      <DestinationFaqSection faq={mock.faq} title={title} />
    </PageBase>
  );
}
