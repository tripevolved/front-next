export const introData = {
  sections: [
    {
      id: "bem-vindo-hero",
      component: "SectionImage",
      bg: "brand.6",
      textAlign: "center",
      pyAuto: "none",
      image: {
        src: "/assets/bem-vindo/hero.png",
        height: 360,
        width: 350,
        mb: "-8px",
      },
    },
    {
      id: "bem-vindo-description",
      component: "SectionWithImage",
      justifyContent: "center",
      containerProps: {
        textAlign: "center",
      },
      heading: {
        html: "Olá! <img style='display: inline;' src='/assets/bem-vindo/icon-hand.png'>",
      },
      text: {
        children:
          "Separamos algumas perguntas para entender o peril de de viagem ideal para vocês. Responda a seguir e veja o resultado com as melhores indicações de destinos.",
      },
      cta: {
        id: "bem-vindo-cta",
        children: "Descobrir a trip ideal",
      },
    },
  ],
};
