import { SectionWithImageProps } from "@/components/commons/section-with-image";

export const workWithUsData = {
  sections: [
    {
      id: "navegacao",
      component: "Navbar",
    },
    {
      id: "metodo-de-trabalho",
      component: "SectionWithImage",
      reversed: true,
      gap: { base: 0, lg: 10 },
      image: {
        mb: 5,
        base: {
          src: "/assets/work-with-us/metodo-de-trabalho.png",
          height: 507,
          width: 500,
        },
      },
      heading: {
        as: "h1" as SectionWithImageProps["heading"]["as"],
        html: `Conheça o nosso <span class="color-primary"><br />método de trabalho</span>`,
        lineDecoration: {
          transform: {
            lg: "translateX(-100px)",
          },
        },
      },
      text: {
        size: "sm",
        children:
          "Somos 100% remotos e acreditamos que confiança é muito mais importante que controle. Queremos construir um ambiente onde não há medo de inovar - e isso só é construído quando há confiança mútua.",
      },
    },
    {
      id: "onde-estamos",
      component: "SectionWithImage",
      reversed: false,
      bg: "brand.5",
      gap: { base: 0, lg: 10 },
      image: {
        mb: 5,
        base: {
          src: "/assets/work-with-us/onde-estamos.png",
          height: 514,
          width: 570,
        },
      },
      heading: {
        children: "Onde estamos?",
        lineDecoration: {
          transform: {
            lg: "translateX(-100px)",
          },
        },
      },
      text: {
        size: "sm",
        children:
          "A Trip Evolved está em um momento inicial. Estamos construindo nosso MVP (Mínimo Produto Viável, do inglês) e validando nossas ideias junto aos viajantes. De uma coisa temos certeza: não vamos construir nada sozinhos e queremos pessoas engajadas, com a mente direcionada a produto e que adorem transformar problemas em soluções.",
      },
    },
    {
      id: "o-que-valorizamos",
      component: "SectionFeaturesTwoColumns",
      bg: "brand.1",
      color: "white",
      heading: {
        mx: "auto",
        children: "O que valorizamos?",
        lineDecoration: {
          color: "white",
          mx: "auto",
        },
      },
      columns: [
        {
          id: "valores-lado-esquerdo",
          color: "white",
          display: "flex",
          flexDirection: { base: "column", lg: "column-reverse" },
          description: {
            mt: 4,
            children: 'Costumamos esquecer que o Google não foi o primeiro motor de busca e que o iPhone não foi o primeiro smartphone. Superestimamos a importância de sermos "primeiros": nós, na Trip Evolved, queremos ser os "melhores". Para isso, é preciso coragem constante.'
          },
          features: [
            {
              id: "feature-item-2-right",
              my: 2,
              image: {
                src: "/assets/work-with-us/busca-por-aprender.svg",
                height: 41,
                width: 41,
              },
              text: {
                children: "Constante busca por aprender",
              },
            },
            {
              id: "feature-item-2-right",
              my: 2,
              image: {
                src: "/assets/work-with-us/busca-por-entender.svg",
                height: 41,
                width: 41,
              },
              text: {
                children: "Sempre chegar ao porquê das coisas",
              },
            },
          ]
        },
        {
          id: "valores-lado-direito",
          color: "white",
          flexDirection: "column",
          description: {
            mb: 4,
            children:
              "Aprendermos diariamente, uns com os outros, com nossos clientes ou com quem seja, nos define. E isso nos ajuda a construir um ambiente questionador, onde a busca pelo porquê está difundida entre todos."
          },
          features: [
            {
              id: "feature-item-1-left",
              my: 2,
              image: {
                src: "/assets/work-with-us/coragem.svg",
                height: 41,
                width: 41,
              },
              text: {
                children:
                  "Coragem: conversas difíceis e francas; inovação e busca pelo risco nas decisoes",
              },
            },
            {
              id: "feature-item-2-left",
              my: 2,
              image: {
                src: "/assets/work-with-us/importancia-da-qualidade.svg",
                height: 41,
                width: 41,
              },
              text: {
                children: "Qualidade: queremos ser os melhores, com eficiência",
              },
            },
          ]
        },
      ],
    },
    {
      id: "seja-um-de-nos",
      component: "SectionSingleNoPictures",
      bg: "brand.5",
      heading: {
        size: "lg",
        children: "Seja um de nós",
        lineDecoration: {
          transform: {
            lg: "translateX(-100px)",
            alignContent: "center"
          },
        },
      },
      containerProps: {
        textAlign: "center",
        mx: "auto",
        mb: 4,
      },
      text: {
        color: "gray.1",
        my: 10,
        children:
          "Se nossa visão, missão, valores ou qualquer outra coisa te chamou a atenção, sinta-se totalmente à vontade para entrar em contato. Mesmo que seu perfil não seja o que procuramos para as vagas que temos atualmente, adoraríamos conectar e conversar para outras vagas futuras ou simplesmente falar do mundo e da vida. Além disso, qualquer feedback sobre nossas ideias e produto são extremamente bem-vindos. Estamos 100% focados em aprender - é um dos nossos valores!"
      },
      cta: {
        children: "Saiba Mais",
        href: "https://www.notion.so/Vaga-Back-End-c98bc10f506f4c298f1a34827d4f9f18",
        target: "_blank",
        bg: "brand.1",
        color: "white",
        borderRadius: "full",
        px: 14,
        py: 4,
      },
    },
    {
      id: "tecnoligias",
      component: "SectionTechnologies",
      heading: {
        children: "Tecnologias que gostamos",
        textAlign: "center",
      },
      technologies: [
        {
          id: "aws",
          alt: "AWS Logo",
          src: "/assets/work-with-us/AWS.png",
          width: 180,
          height: 95,
          py: 3,
        },
        {
          id: "dotNet",
          alt: "Microsoft .NET Logo",
          src: "/assets/work-with-us/dotNet.png",
          width: 180,
          height: 95,
          py: 2,
        },
        {
          id: "nextJs",
          alt: "Next.js Logo",
          src: "/assets/work-with-us/NextJS.png",
          width: 170,
          height: 85,
          py: 4,
        },
        {
          id: "js_ts",
          alt: "JavaScript - TypeScript Logo",
          src: "/assets/work-with-us/TS_JS.png",
          width: 111,
          height: 111,
          py: 3,
        },
        {
          id: "xUnit",
          alt: "xUnit Logo",
          src: "/assets/work-with-us/xUnit.png",
          width: 211,
          height: 113,
          py: 3
        },
        {
          id: "jest",
          alt: "Jest Logo",
          src: "/assets/work-with-us/Jest.png",
          width: 143,
          height: 63,
          py: 8,
        },
      ],
    },
    {
      id: "rodape",
      component: "Footer",
    },
  ],
};
