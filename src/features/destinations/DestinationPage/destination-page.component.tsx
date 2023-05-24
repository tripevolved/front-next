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
        "Passagem aérea conforme a sua escolha de Origem com destino escolhido e conforme a disponibilidade no site. Somente a emissão das passagens aéreas e reservas da hospedagem garantem valores.",
    },
    {
      question: "Hospedagem",
      type: "/assets/destino/hospedagem.svg",
      answer:
        "Hospedagem de acordo com a sua escolha, conforme a disponibilidade no site e categoria, podendo variar desde hotel simples até resort 5 estrelas. Somente a emissão das passagens aéreas e reservas da hospedagem garantem valores. Importante verificar tipo de tarifa da hospedagem se é reembolsável ou não reembolsável. Em caso de desistência da compra da viagem, será cobrada multa referente aos fornecedores caso haja.",
    },
    {
      question: "Roteiro completo",
      type: "/assets/destino/roteiro.svg",
      answer: "Roteiro completo com sugestão de passeios e atividades.",
    },
    {
      question: "Dicas gastronômicas",
      type: "/assets/destino/dicas-gastronomicas.svg",
      answer:
        "Indicação de restaurantes conforme avaliação dos clientes, lembrando que para essa indicação a Trip Evolved é completamente isenta de qualquer tipo de comissionamento, garantindo assim a transparência na escolha.",
    },
    {
      question: "Suporte durante a viagem",
      type: "/assets/destino/suporte.svg",
      answer:
        "Suporte durante toda a viagem desde a compra até o seu retorno a origem, precisou é só entra rem contato com o nosso suporte pelo whatsapp.",
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
  } = destination;
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
