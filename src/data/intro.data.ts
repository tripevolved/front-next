export const introData = {
	sections: [
		{
			id: "hero",
			component: "SectionLogoWithImage",
			bg: "brand.6",
			mt: { lg: -45 },
		},
		{
			id: "description",
			component: "SectionIntroDescription",
			bg: "brand.5",
			borderTopLeftRadius: "50px",
			mt: { base: "-48px", md: "-23px", lg: "-88px" },
			pt: { base: "10px", lg: "20px" },
			title: {
				id: "titulo",
				children: "Olá! "
			},
			description: {
				id: "description",
				textAlign: "center",
				color: "gray.2",
				children:
					"Separamos algumas perguntas para entender o peril de de viagem ideal para vocês. Responda a seguir e veja o resultado com as melhores indicações de destinos.",
			},
			cta: {
				id: "hero-cta",
				children: "Descobrir a trip ideal",
				width: "full"
			},
		},
	],
};
