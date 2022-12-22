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
          src: "/assets/sobre/image-1.png",
          height: 456,
          width: 731,
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
          "A Trip Evolved nasceu para ser o lugar em que as pessoas constroem experiências de viagem incríveis e inesperadas. Combinamos o melhor da tecnologia ao melhor das pessoas para entregar uma experiência completa, unindo uma curadoria feita por pessoas a um poderoso sistema de recomendação que existe para unir o que você deseja para a viagem às melhores experiências e lugares do mundo.",
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
          src: "/assets/sobre/image-1.png",
          height: 456,
          width: 731,
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
          "A Trip Evolved nasceu para ser o lugar em que as pessoas constroem experiências de viagem incríveis e inesperadas. Combinamos o melhor da tecnologia ao melhor das pessoas para entregar uma experiência completa, unindo uma curadoria feita por pessoas a um poderoso sistema de recomendação que existe para unir o que você deseja para a viagem às melhores experiências e lugares do mundo.",
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
            children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
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
                children: "Constante busca por aprender entender o porquê das coisas",
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
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
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
                children: "Importância da qualidade: buscando ser os melhores e com eficiencia!",
              },
            },
          ]
        },
      ],
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
          width: 220,
          height: 135,
          py: 6,
        },
        {
          id: "dotNet",
          alt: "Microsoft .NET Logo",
          src: "/assets/work-with-us/dotNet.png",
          width: 220,
          height: 135,
          py: 2,
        },
        {
          id: "mySql",
          alt: "MySQL Logo",
          src: "/assets/work-with-us/MySQL.png",
          width: 220,
          height: 135,
          py: 6
        },
        {
          id: "documentDb",
          alt: "Amazon DocumentDB Logo",
          src: "/assets/work-with-us/DocumentDB.png",
          width: 220,
          height: 135,
        },
        {
          id: "nextJs",
          alt: "Next.js Logo",
          src: "/assets/work-with-us/NextJS.png",
          width: 220,
          height: 135,
          py: 7,
        },
        {
          id: "js_ts",
          alt: "JavaScript - TypeScript Logo",
          src: "/assets/work-with-us/TS_JS.png",
          width: 161,
          height: 161,
          py: 3,
        },
        {
          id: "xUnit",
          alt: "xUnit Logo",
          src: "/assets/work-with-us/xUnit.png",
          width: 271,
          height: 173,
          py: 3
        },
        {
          id: "jest",
          alt: "Jest Logo",
          src: "/assets/work-with-us/Jest.png",
          width: 183,
          height: 103,
          py: 10,
        },
      ],
    },
    {
      id: "valores-e-cultura",
      component: "SectionWithImage",
      reversed: false,
      bg: "brand.5",
      gap: { base: 0, lg: 10 },
      image: {
        mb: 5,
        base: {
          src: "/assets/sobre/image-1.png",
          height: 456,
          width: 731,
        },
      },
      heading: {
        children: "Valores e cultura",
        lineDecoration: {
          transform: {
            lg: "translateX(-100px)",
          },
        },
      },
      text: {
        size: "sm",
        html:
          `<ul>
            <li>
              Lorem ipsum dolor sit amet, consectetur 
              adipiscing elit;
            </li>
            <li>
              Sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua
            </li>
            <li>
              Ut enim ad minim veniam
            </li>
          </ul>`,
      },
    },
    {
      id: "rodape",
      component: "Footer",
    },
  ],
};
