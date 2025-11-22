import type { CruiseShip } from "./cruise";

export const exploraII: CruiseShip = {
  name: "Explora II",
  company: "Explora Journeys",
  capacity: 922,
  yearBuilt: 2024,
  refurbished: undefined,
  length: "248 metros",
  width: "32 metros",
  decks: 13,
  image: "https://res.cloudinary.com/tripevolved/image/upload/v1763851425/1_x_1_ration-GettyImages-1341229201_V4-Amalfi_w4gwvb.jpg",
  features: [
    "5 piscinas aquecidas",
    "6 restaurantes",
    "12 bares e lounges",
    "1.25:1 passageiros por tripulante",
    "Ocean Wellness Spa",
    "Fitness center",
    "Performances de artistas de classe mundial",
    "Momentos culturais e esportivos",
  ],
  amenities: [
    {
      category: "Piscinas e Áreas Aquáticas",
      items: [
        "Piscina principal com vista panorâmica",
        "Piscina Infinity na popa",
        "Piscina coberta com teto retrátil",
        "Piscina para adultos com bar integrado",
        "Piscina para famílias",
        "6 Jacuzzis com vista para o mar",
        "Área de banho de sol com espreguiçadeiras de luxo",
      ],
    },
    {
      category: "Restaurantes",
      items: [
        "Emporium Marketplace - Restaurante principal",
        "Fil Rouge - Culinária francesa inspirada",
        "Sakura - Culinária japonesa e asiática",
        "Anthology - Experiência gastronômica exclusiva",
        "Marble & Co. Grill - Steakhouse premium",
        "Med Yacht Club - Culinária mediterrânea",
      ],
    },
    {
      category: "Bares e Lounges",
      items: [
        "Asti - Bar de champanhe e vinhos",
        "Lobby Bar - Bar central elegante",
        "Crystal Bar - Bar com vista panorâmica",
        "Sky Bar - Bar no deck superior",
        "Café Social - Café e bar de dia",
        "Cocktail Bar - Mixologia artesanal",
        "Wine Bar - Seleção de vinhos premium",
        "Pool Bar - Bar à beira da piscina",
        "Sunset Lounge - Lounge para pôr do sol",
        "Explora Lounge - Lounge principal",
        "Library Bar - Bar com biblioteca",
        "Champagne Bar - Bar especializado em champanhe",
      ],
    },
    {
      category: "Entretenimento",
      items: [
        "Explora Theatre - Teatro principal com shows",
        "Jazz Club - Música ao vivo",
        "Piano Bar - Música ambiente",
        "Cinema ao ar livre",
        "Sala de jogos e entretenimento",
        "Performances de artistas internacionais",
        "Shows de dança e música",
        "Palestras e workshops culturais",
      ],
    },
    {
      category: "Bem-estar e Spa",
      items: [
        "Ocean Wellness Spa - Spa completo",
        "Salas de tratamento individual",
        "Sauna e banho turco",
        "Sala de relaxamento",
        "Fitness center com equipamentos modernos",
        "Yoga e pilates",
        "Personal trainer",
        "Pista de corrida ao ar livre",
      ],
    },
    {
      category: "Compras",
      items: [
        "Boutique de luxo",
        "Loja de joias e relógios",
        "Loja de perfumes e cosméticos",
        "Loja de roupas e acessórios",
        "Loja de souvenirs e lembranças",
        "Loja duty-free",
      ],
    },
    {
      category: "Atividades e Esportes",
      items: [
        "Academia completa",
        "Pista de corrida",
        "Quadra de tênis",
        "Área de esportes aquáticos",
        "Biblioteca e sala de leitura",
        "Sala de jogos de tabuleiro",
        "Área de jogos para crianças",
        "Clube para adolescentes",
      ],
    },
  ],
  dining: [
    {
      name: "Emporium Marketplace",
      type: "main",
      description: "Restaurante principal com buffet internacional e variedade de pratos",
      included: true,
      image: "https://res.cloudinary.com/tripevolved/image/upload/v1763851455/Seaware_resize-TobyMitchell2025_EXPLORA_EMPORIUM_MARKETPLACE_01568_xakngk.jpg",
    },
    {
      name: "Fil Rouge",
      type: "specialty",
      description: "Culinária francesa inspirada com pratos refinados",
      included: true,
      image: "https://res.cloudinary.com/tripevolved/image/upload/v1763851419/Seaware_resize-TobyMitchell2025_EXPLORA_FIL_ROUGE_00442_bkowxd.jpg",
    },
    {
      name: "Sakura",
      type: "specialty",
      description: "Culinária japonesa e asiática autêntica",
      included: true,
      image: "https://res.cloudinary.com/tripevolved/image/upload/v1763851448/Seaware_resize-TobyMitchell2025_EXPLORA_SAKURA_01076_HR_dqyogm.jpg",
    },
    {
      name: "Marble & Co. Grill",
      type: "specialty",
      description: "Steakhouse premium com cortes selecionados",
      included: true,
      image: "https://res.cloudinary.com/tripevolved/image/upload/v1763851482/Seaware_resize-TobyMitchell2025_EXPLORA_MARBLE_CO_01780_bi6tao.jpg",
    },
    {
      name: "Med Yacht Club",
      type: "specialty",
      description: "Culinária mediterrânea com ingredientes frescos",
      included: true,
      image: "https://res.cloudinary.com/tripevolved/image/upload/v1763851542/Seaware_resize-TobyMitchell2025_EXPLORA_MED_YACHT_CLUB_00698_j1hj6l.jpg",
    },
    {
      name: "Anthology",
      type: "specialty",
      description: "Experiência gastronômica exclusiva com menu degustação (cobrada à parte)",
      included: false,
      image: "https://res.cloudinary.com/tripevolved/image/upload/v1763851493/Seaware_resize-TobyMitchell2025_EXPLORA_ANTHOLOGY_01629_fdojq3.jpg",
    },
  ],
  entertainment: [
    {
      name: "Journeys Lounge",
      type: "venue",
      description: "Lounge principal com shows e performances",
      image: "https://res.cloudinary.com/tripevolved/image/upload/v1763851494/Seaware_resize-TobyMitchell2025_EXPLORA_JOURNEYS_LOUNGE_02005_idcfc7.jpg",
    },
    {
      name: "Astern Lounge",
      type: "venue",
      description: "Lounge com música ao vivo e atmosfera social",
      image: "https://res.cloudinary.com/tripevolved/image/upload/v1763851521/Seaware_resize-TobyMitchell2025_EXPLORA_ASTERN_LOUNGE_02247_jh6oam.jpg",
    },
    {
      name: "Piano Bar",
      type: "venue",
      description: "Piano Steinway & Sons e música ambiente",
      image: "https://res.cloudinary.com/tripevolved/image/upload/v1763854148/Piano_Explora_II_balqph.jpg",
    },
    {
      name: "Clubes",
      type: "activity",
      description: "Clubes com pessoas parecidas com você",
      image: "https://explorajourneys.com/content/dam/explora/dm/entertainment/new-entertainment/Entertainment-39.jpg.transform/640x640/5a5d96501af294a6121b6e35c054bb44d9c01262/img.jpeg",
    },
    {
      name: "Sessões esportivas",
      type: "activity",
      description: "Sessões esportivas e atividades físicas",
      image: "https://explorajourneys.com/content/dam/explora/dm/entertainment/new-entertainment/Entertainment-6.jpg.transform/640x640/34db4102275a6a8c9da6b30c30068779384557ab/img.jpeg",
    },
  ],
};

export const ships: Record<string, CruiseShip> = {
  "Explora II": exploraII,
};

export function getShipByName(name: string): CruiseShip | undefined {
  return ships[name];
}

