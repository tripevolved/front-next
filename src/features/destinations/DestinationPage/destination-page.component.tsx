import type { DestinationPageProps } from "./destination-page.types";
import { LeadListForm, PageBase } from "@/features";
import { DestinationHeroSection } from "./destinations-hero.section";
import { DestinationInfoSection } from "./destination-info.section";
import { DestinationVideoSection } from "./destination-video.section";
import { DestinationTipsSection } from "./destination-tips.section";
import { DestinationPostsSection } from "./destinations-posts.section";
import { DestinationFaqSection } from "./destination-faq.section";
import { DestinationProfileSection } from "./destination-profile.section";
import { Button, Container, Text } from "mars-ds";
import { UserCredentials } from "@/services/user/credentials";
import { Box, SectionBase, WhatsappButton } from "@/ui";
import { canSignUp } from "@/utils/helpers/environment.helpers";
import { useRouter } from "next/router";

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
      question: "Transporte",
      icon: "/assets/destino/passagem-aerea_green.svg",
      answer:
        "Escolheremos a melhor forma de transporte para você: passagem aérea, de ônibus ou aluguel de carro conforme a sua necessidade e escolha e conforme a disponibilidade no site. Somente a emissão das passagens aéreas ou de ônibus ou a reserva do automóvel garantem os valores.",
    },
    {
      question: "Hospedagem",
      icon: "/assets/destino/hospedagem_green.svg",
      answer:
        'As hospedagens que disponibilizamos são escolhidas a dedo por nossos especialistas de viagem e terão o "selo Trip Evolved" destacado no momento da escolha, conforme a disponibilidade para sua viagem. Entretanto, você pode escolher outra hospedagem, se assim desejar. Importante verificar tipo de tarifa da hospedagem se é reembolsável ou não reembolsável. Em caso de desistência da compra da viagem, será cobrada multa referente aos fornecedores, caso haja.',
    },
    {
      question: "Roteiro completo",
      icon: "/assets/destino/roteiro_green.svg",
      answer:
        "Construiremos seu roteiro completo, entendendo suas necessidades e preferências e se você gosta de uma viagem mais cheia, com tudo o que tem direito, ou mais tranquila, para descansar e relaxar. Isso começa na escolha do destino e continua com a construção do roteiro com todos os passeios, atrações, restaurantes, bares e festas que se encaixarem no seu perfil de viajante e vontade na viagem.",
    },
    {
      question: "Dicas gastronômicas",
      icon: "/assets/destino/dicas-gastronomicas_green.svg",
      answer:
        "A indicação de restaurantes e bares é realizada conforme o seu perfil e suas escolhas. Levamos em consideração se você prefere massas, carnes, sushi ou aquele restaurante vegano maravilhoso. Além, é claro, da qualidade da gastronomia e do atendimento em cada um dos restaurantes que indicamos na plataforma.",
    },
    {
      question: "Suporte durante a viagem",
      icon: "/assets/destino/suporte_green.svg",
      answer:
        "Você possui suporte durante toda a viagem, em 360º, desde a compra até retornar à sua cidade. Precisando, é só entrar em contato com nosso suporte via WhatsApp.",
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
  travelerProfiles: ["relax", "aventureiro"],
  travelType: "COUPLES",
};

export function DestinationPage({ destination, seo, navbar, footer }: DestinationPageProps) {
  const {
    features = [],
    photos = [],
    posts = [],
    recommendedBy,
    tips = [],
    title,
    uniqueName,
    videos = [],
    travelerProfiles = [],
    travelType,
  } = destination;
  const Cta = () => <DestinationCta uniqueName={uniqueName} destinationTitle={destination.title} />;

  return (
    <PageBase navbar={navbar} footer={footer} seo={seo}>
      <DestinationHeroSection title={title} photos={photos} />
      <DestinationProfileSection
        title={title}
        travelerProfiles={travelerProfiles}
        travelType={travelType}
      />
      <DestinationInfoSection features={features} recommendedBy={recommendedBy} />
      <Box style={{margin: 32}}>
        <Cta />
      </Box>
      {videos.length ? <DestinationVideoSection title={title} videos={videos} /> : null}
      {tips.length ? <DestinationTipsSection tips={tips} /> : null}
      {posts.length ? <DestinationPostsSection posts={posts} /> : null}
      <DestinationFaqSection faq={mock.faq} title={title}>
        <Cta />
      </DestinationFaqSection>
    </PageBase>
  );
}

interface DestinationCtaProps {
  uniqueName: string;
  destinationTitle: string;
}

const DestinationCta = ({ uniqueName, destinationTitle }: DestinationCtaProps) => {
  const userData = UserCredentials.get();
  const router = useRouter();
  const sourceParam = typeof router.query.source === "string" ? router.query.source : undefined;

  if (sourceParam && sourceParam === "consultoria") {
    return (
      <Container className="text-center">
        <LeadListForm
          label={"Organize sua viagem com especialistas"}
          heading={"Deixe suas informações e nossos especialistas vão entrar em contato"}
          source={sourceParam ? `${sourceParam}-${uniqueName}` : undefined}
          cta={{
            children: "Quero agendar"
          }}
        >
          <Text>
            Vamos entrar em contato em até 24h úteis para te ajudar a organizar a viagem dos sonhos! Conte conosco!
          </Text>
          <Text size="xs">
            Ao deixar suas informações, você confirma que leu e aceita nossa <a target='_blank' style={{color: "var(--color-brand-2)"}} href={"https://tripevolved.com.br/politica-de-privacidade/"} rel="noreferrer">Política de Privacidade</a>.
          </Text>
        </LeadListForm>
      </Container>
    );
  }

  return (
    <div className="text-center">
      {userData?.idToken ? (
        <Button
          style={{ width: 336 }}
          // @ts-ignore
          variant="tertiary"
          href={`/app/viagens/nova?para=${uniqueName}`}
        >
          Planejar a minha viagem
        </Button>
      ) : canSignUp() ? (
        <Button
          style={{ width: 336 }}
          // @ts-ignore
          variant="tertiary"
          href={`/app/cadastro?redirectTo=${encodeURIComponent(
            `/app/viagens/nova?para=${uniqueName}`
          )}`}
        >
          Planejar a minha viagem
        </Button>
      ) : (
        <WhatsappButton
          style={{ width: 336 }}
          // @ts-ignore
          variant="tertiary"
          message={`Olá! Quero ir para ${destinationTitle}!`}
        >
          Quero ir
        </WhatsappButton>
      )}
    </div>
  );
};
