import type { DestinationPageProps } from "./destination-page.types";
import { PageBase } from "@/components";
import { DestinationHeroSection } from "./destinations-hero.section";
import { DestinationInfoSection } from "./destination-info.section";
import { DestinationVideoSection } from "./destination-video.section";
import { DestinationTipsSection } from "./destination-tips.section";
import { DestinationPostsSection } from "./destinations-posts.section";

const mock = {
  title: "Fernando de Noronha",
  recommendedBy: {
    name: "Deborah Eppi",
    photo: null,
    instagram: null,
    tikTok: null,
    blog: null,
    recommendationText:
      "Pouquíssimos lugares no mundo oferecem beleza + preservação + baixíssima densidade demográfica + livre acesso. Porém, para que assim seja, o local é caro e cobra taxa de preservação para entrar na ilha e ingresso nas praias principais.",
  },
  photos: [],
  videos: [],
  posts: [],
  features: [
    {
      title: "Beleza natural",
      description:
        "A ilha é famosa por suas belezas naturais, como praias paradisíacas, formações rochosas impressionantes e um mar cristalino, o que faz com que muitos turistas visitem a região em busca de tranquilidade, contato com a natureza e momentos de descanso.\n\nAlém disso, o clima na ilha é agradável durante todo o ano, com temperaturas médias entre 25°C e 30°C, o que permite que os visitantes aproveitem as praias e as atividades ao ar livre em qualquer época do ano",
      icon: null,
    },
    {
      title: "Atrações turísticas",
      description:
        "As principais atrações de Fernando de Noronha são suas praias, que são conhecidas por sua beleza exótica e pela preservação ambiental. Algumas das praias mais populares incluem a Praia do Sancho, a Baía do Sueste, a Praia do Leão e a Praia da Atalaia. Além disso, o arquipélago possui diversas trilhas, mirantes e pontos turísticos, como o Forte de Nossa Senhora dos Remédios, o Mirante dos Golfinhos e a Baía dos Porcos. Além disso, existem diversas iniciativas de preservação da fauna e flora local, incluindo a proteção das tartarugas marinhas, golfinhos e tubarões.",
      icon: null,
    },
  ],
  tips: [
    {
      title: "SECURITY",
      icon: null,
      mainText: "",
      toolTip:
        "Como dica importante para quem visita Fernando de Noronha, é fundamental respeitar a natureza e as regras de preservação ambiental do arquipélago. Sendo um santuário ecológico, a região é protegida e há diversas normas para a visitação, como a proibição de retirada de qualquer material natural, inclusive conchas e pedras. Além disso, é obrigatório pagar a taxa de preservação ambiental e utilizar protetor solar biodegradável para evitar danos à vida marinha local.\n\nÉ essencial planejar a viagem com antecedência, especialmente em relação à hospedagem e passeios, devido ao número limitado de visitantes e à alta demanda na temporada. Reservar com antecedência garante hospedagem e passeios desejados.",
    },
    {
      title: "DAILY_COST",
      icon: null,
      mainText: "",
      toolTip:
        "É um destino caro, porque nada é produzido na ilha, ou seja, tudo é importado do continente, com o preço nas alturas. O porto é pequeno, não tem grandes cargas chegando, tudo é calculado por cubagem, que é o espaço em metros cúbicos das encomendas. Assim, comida cara, hospedagem cara e passagem aérea cara, porque não há promoção, justamente para que não haja uma superlotação da ilha. E além disso, é necessário pagar a taxa de preservação TPA, que é bem salgada e pode ser paga pela internet ou no momento que desembarcar na ilha.  \nalém da TPA, vários passeios precisam de ingresso e que deve ser adquirido no Centro de Visitantes.",
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
    </PageBase>
  );
}
