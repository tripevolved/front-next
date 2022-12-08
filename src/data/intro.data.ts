export const introData = {
	sections: [
		{
			id: "hero",
			component: "SectionLogoWithImage",
			bg: "brand.6",
		},
		{
			id: "description",
			component: "SectionIntroDescription",
			bg: "brand.5",
			borderTopLeftRadius: "50px",
			mt: "-50px",
			title: {
				id: "titulo",
				children: "Olá! "
			},
			description: {
				id: "description",
				textAilgn: "center",
				color: "gray.2",
				children:
					"Separamos algumas perguntas para entender o peril de de viagem ideal para vocês. Responda a seguir e veja o resultado com as melhores indicações de destinos.",
			},
			cta: {
				id: "hero-cta",
				children: "Descobrir a trip ideal"
			},
		},
	],
};
