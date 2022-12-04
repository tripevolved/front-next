export const aboutData = {
  sections: [
    {
      id: "navegacao",
      component: "Navbar",
    },
    {
      id: "sobre-nos",
      component: "SectionWithImage",
      reversed: false,
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
        children: "Sobre nós",
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
      cta: {
        mt: 5,
        children: "Encontrar minha trip",
      },
    },
    {
      id: "missao",
      component: "SectionFeaturesAbout",
      bg: "brand.5",
      heading: {
        children: "O que queremos?",
      },
      features: [
        {
          heading: {
            html: "Você, <br/>encantados",
          },
          text: {
            children:
              "Sabemos que uma viagem é sonhada por muito tempo. Nosso foco é que seus sonhos se transformem em realidades ainda melhores.",
          },
        },
        {
          heading: {
            html: "Lugares <br/>únicos",
          },
          text: {
            children:
              "A tecnologia permite o acesso e a descoberta de lugares únicos. Queremos proporcionar isso a vocês.",
          },
        },
        {
          heading: {
            html: "Acompanhamento",
          },
          text: {
            children:
              "A viagem não começa no embarque nem termina na volta para casa. Queremos que vocês tenham o acompanhamento completo, do início ao fim.",
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
