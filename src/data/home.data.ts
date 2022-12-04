import { SectionWithImageProps } from "@/components/commons/section-with-image";
import heroImage from "@/public/assets/home/img-hero.png";
import phoneImage1 from "@/public/assets/home/phone-1.png";
import phoneImage2 from "@/public/assets/home/phone-2.png";
import phoneImage3 from "@/public/assets/home/phone-3.png";

import icon1 from "@/public/assets/home/atracoes-circle-icon.svg";
import icon2 from "@/public/assets/home/culinaria-circle-icon.svg";
import icon3 from "@/public/assets/home/noite-circle-icon.svg";

export const homeData = {
  sections: [
    {
      id: "menu",
      component: "Navbar",
    },
    {
      id: "hero",
      component: "SectionWithImage",
      bg: "white",
      heading: {
        as: "h1" as SectionWithImageProps["heading"]["as"],
        html: `<span class="color-primary">Sua trip a dois precisa <br />ser mais do que um <br /></span>pacote pronto`,
        lineDecoration: {},
      },
      text: {
        children:
          "Utilizamos tecnologia para recomendar destinos e experiências únicas. Simule e descubra sua trip ideal.",
      },
      cta: {
        id: "hero-cta",
        children: "Encontrar minha trip",
      },
      image: {
        width: 669,
        height: 374,
        src: heroImage,
        alt: "Imagem com de um casal na praia",
        transform: { base: "translateX(24px)", md: "" },
      },
    },
    {
      id: "mais-experiencia",
      component: "SectionWithImage",
      reversed: false,
      bg: "brand.5",
      heading: {
        html: `Menos pacote, <br/><span class="color-primary">mais experiência</span>`,
        lineDecoration: {
          color: "#0ab9ad",
        },
      },
      text: {
        html: "Curtir uma praia?  Descansar o máximo possível? Dê match com o destino que <strong>mais combina com suas preferências.</strong> Após isso, tenha acesso a todos os dados da viagem em um só lugar.",
      },
      cta: {
        id: "mais-experiencia-cta",
        children: "Encontrar minha trip",
      },
      image: {
        enterAnimation: "slide-left",
        width: 366,
        height: 525,
        src: phoneImage1,
        alt: "Imagem de tela de celular apresentação as trips",
      },
    },
    {
      id: "cabe-no-seu-bolso",
      component: "SectionWithImage",
      reversed: true,
      bg: "white",
      heading: {
        html: `<span class="color-primary">Uma trip <br/>programada para</span><br/> caber no seu bolso`,
        lineDecoration: {},
      },
      text: {
        html: "Prezam pelo máximo conforto ou precisam apenas de uma boa cama? No Trip Evolved, você seleciona <strong>exatamente o que cabe no orçamento atual.</strong> Indicaremos os melhores voos, hospedagens e atrações para curtir ao máximo.",
      },
      cta: {
        id: "cabe-no-seu-bolso-cta",
        children: "Encontrar minha trip",
      },
      image: {
        enterAnimation: "slide-right",
        width: 405,
        height: 550,
        src: phoneImage2,
        alt: "Imagem com de um casal na praia",
      },
    },
    {
      id: "roteiro",
      component: "SectionFeatures",
      bg: "brand.1",
      color: "white",
      heading: {
        html: `Roteiro otimizado de <br />acordo com suas <br />preferências`,
        lineDecoration: { color: "white" },
      },
      text: {
        color: "white",
        html: "Ninguém é igual. Nenhuma viagem deveria ser.  Temos uma equipe dedicada a fazer a curadoria das melhores atrações para tornar sua experiência única.",
      },
      features: [
        {
          id: "atracoes",
          color: "white",
          image: {
            src: icon1,
            height: 41,
            width: 41,
          },
          heading: {
            children: "Atrações",
          },
          text: {
            children:
              "Os pontos imperdíveis de cada destino selecionados de acordo com cada perfil.",
          },
        },
        {
          id: "culinaria",
          color: "white",
          image: {
            src: icon2,
            height: 41,
            width: 41,
          },
          heading: {
            children: "Culinária",
          },
          text: {
            children:
              "Recomendações de restaurantes de acordo com o tipo de culinária desejada.",
          },
        },
        {
          id: "bares-e-festas",
          color: "white",
          image: {
            src: icon3,
            height: 41,
            width: 41,
          },
          heading: {
            children: "Bares e festas",
          },
          text: {
            children:
              "Curte explorar festas locais? Escolha o tipo de música e te indicaremos as melhores opções.",
          },
        },
      ],
    },
    {
      id: "assistencia",
      component: "SectionSingle",
      heading: {
        textAlign: "center",
        color: "primary.500",
        html: `Assistência para você <br/>curtir sem preocupação`,
      },
      text: {
        textAlign: "center",
        children:
          "Documentos e outras burocracias necessárias para a viagem? Deixa com a gente. Indicamos uma lista de tudo que for preciso levar de acordo com o destino. Além disso, te daremos suporte caso tenha alguma dúvida antes e durante a viagem.",
      },
    },
    {
      id: "encontre-sua-trip",
      component: "SectionWithImage",
      reversed: true,
      bg: "brand.5",
      heading: {
        children: `Encontre sua trip`,
      },
      text: {
        children:
          "Utilize nosso simulador e descubra sua trip ideal incluindo voo, hospedagem, roteiro completo e assistência.",
      },
      cta: {
        id: "encontre-sua-trip-cta",
        children: "Encontrar minha trip",
      },
      image: {
        enterAnimation: "slide-right",
        width: 448,
        height: 678,
        src: phoneImage3,
        alt: "Imagem do aplicativo",
      },
    },
    {
      id: "perguntas-frequentes",
      component: "SectionFaq",
      heading: {
        children: "Perguntas frequentes",
      },
      questions: [
        {
          heading: {
            children: "Encontramos nossa trip ideal! E agora?",
          },
          text: {
            children:
              "A partir do momento que sabem para onde viajar, nossa curadoria volta a entrar em ação. Cuidamos de tudo para vocês, com dicas dos melhores restaurantes, atrações e experiências. Além disso, cuidamos de toda a burocracia e avisamos vocês em todas as etapas do processo.",
          },
        },
        {
          heading: {
            children: "E se meu vôo for cancelado?",
          },
          text: {
            children:
              "As alterações e remarcações de vôo dependem de uma série de fatores, que são controlados pelas companhias aéreas. Mas fiquem tranquilos que cuidamos de tudo e vocês ficam sabendo de qualquer mudança.",
          },
        },
        {
          heading: {
            children: "Quais são os documentos necessários para a viagem?",
          },
          text: {
            children:
              "Cada viagem é única. Na Trip Evolved, organizamos todos os documentos da viagem para vocês simplesmente curtirem, sem preocupação.",
          },
        },
      ],
    },
    {
      id: "rodape",
      component: "Footer",
    },
  ],
};
