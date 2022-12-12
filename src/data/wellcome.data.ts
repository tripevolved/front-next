export const introData = {
  sections: [
    {
      id: "hero",
      component: "SectionLogoWithImage",
      bg: "brand.6",
      pt: [5, 20, 30, 30],
      pb: 0,
    },
    {
      id: "description",
      component: "SectionIntroDescription",
      bg: "brand.7",
      zIndex: 1000,
      title: {
        children: "Olá! ",
      },
      description: {
        textAlign: "center",
        color: "gray.2",
        children:
          "Separamos algumas perguntas para entender o peril de de viagem ideal para vocês. Responda a seguir e veja o resultado com as melhores indicações de destinos.",
      },
      cta: {
        id: "hero-cta",
        children: "Descobrir a trip ideal",
        width: "full",
      },
    },
  ],
};
