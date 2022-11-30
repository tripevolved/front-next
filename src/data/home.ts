export const home = {
  sections: [
    {
      component: "SectionHero",
      backgroundColor: "white",
      title: {
        html: `<span class="color-primary">Sua trip a dois precisa <br />ser mais do que um <br /></span>pacote pronto`,
      },
      text: {
        className: "color-text-secondary",
        children:
          "Utilizamos tecnologia para recomendar destinos e experiências únicas. Simule e descubra sua trip ideal.",
      },
      cta: {
        children: "Encontrar minha trip",
      },
      image: {
        width: 669,
        height: 374,
        src: "/assets/home/img-hero.png",
        alt: "Imagem com de um casal na praia",
      },
    },
  ],
};
