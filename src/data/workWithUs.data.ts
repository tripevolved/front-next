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
  ],
};
