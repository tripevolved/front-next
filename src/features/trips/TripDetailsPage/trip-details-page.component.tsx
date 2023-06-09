import type { TripDetailsPageProps } from "./trip-details-page.types";
import { PageBase } from "@/features";
import { DestinationHeroSection } from "@/features/destinations/DestinationPage/destinations-hero.section";
import { DestinationInfoSection } from "@/features/destinations/DestinationPage//destination-info.section";
import { DestinationTipsSection } from "@/features/destinations/DestinationPage//destination-tips.section";
import { TripTransportationSection } from "./trip-transportation.section";
import { TripConfigurationSection } from "./trip-configuration.section";
import { Accordion, SectionBase, Text, WhatsappButton } from "@/ui";

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
  ]
};

export function TripDetails({ tripDetails, seo, navbar, footer }: TripDetailsPageProps) {
  const {
    destination,
    configuration
  } = tripDetails;
  const {
    features = [],
    photos = [],
    recommendedBy,
    tips = [],
    title,
  } = destination;
  const message = "Oi! Quero alterar minha viagem, pode me ajudar?";

  return (
    <PageBase navbar={navbar} footer={footer} seo={seo}>
      <DestinationHeroSection title={title} photos={photos} />
      <TripConfigurationSection configuration={configuration}/>
      <DestinationInfoSection features={features} recommendedBy={recommendedBy} />
      {tips.length ? <DestinationTipsSection tips={tips} /> : null}
      <TripTransportationSection/>
      <div>
        <WhatsappButton
          className="mt-2x"
          style={{ width: 336 }}
          variant={"custom"}
          href={"#"}
          backgroundColor={"var(--color-brand-2)"}
          hoverBackgroundColor={"var(--color-secondary-900)"}
          color={"white"}
          message={message}
        >
          Quero alterar a viagem
        </WhatsappButton>
      </div>
    </PageBase>
  );
}
