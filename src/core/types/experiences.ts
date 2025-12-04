import type { Cruise } from "./cruise";
import { exploraII } from "./ships";

export interface Experience {
  name: string;
  title: string;
  travelers: string;
  description: string;
  type: "day-by-day" | "by-period";
  isVisible: boolean;
  images: string[];
  mapImage?: string;
  googleLink?: string;
  uniqueMoments?: {
    title: string;
    description: string;
    image: string;
  }[];
  price?: {
    included: string[];
    notIncluded: string[];
    pricePerPerson: number;
    total: number;
    currency: string;
  };
  itinerary: {
    period: number;
    date: string;
    activity: string;
    image: string;
    description: string;
    hotel?: {
      name: string;
      description: string;
      image: string;
    };
    experience?: {
      name: string;
      description: string;
      image: string;
    };
    cruise?: Cruise;
    highlights: {
      description: string;
      videos?: string[];
    };
  }[];
}

export const mockExperiences: Experience[] = [
  {
    name: "curacao",
    title: "Curaçao tem tudo que você imagina",
    travelers: "por Henrique Gasparotto",
    type: "day-by-day",
    isVisible: true,
    description:
      "Uma jornada incrível por Curaçao, uma ilha que é muito mais que só praias e resorts! Além de uma passadinha rápida pelos encantos da Cidade do Panamá.",
    mapImage: "/assets/experiences/curacao/curacao-mapa.png",
    uniqueMoments: [
      {
        title: "Klein Curaçao",
        description:
          "Uma ilha deserta com praias de areia branca e águas cristalinas, perfeita para mergulho e snorkel.",
        image: "/assets/experiences/curacao/klein-curacao.png",
      },
      {
        title: "Pôr do sol no Karakter",
        description:
          "Um jantar romântico à beira-mar com vista deslumbrante para o pôr do sol caribenho.",
        image: "/assets/experiences/curacao/curacao-punda.png",
      },
    ],
    images: [
      "/assets/experiences/curacao/klein-curacao.png",
      "/assets/experiences/curacao/curacao-punda.png",
      "/assets/experiences/curacao/kenepa-grandi.png",
    ],
    itinerary: [
      {
        period: 1,
        date: "Dia 1",
        activity: "Canal do Panamá e um pouquinho do Casco Viejo",
        image: "/assets/experiences/curacao/casco-viejo.png",
        description:
          "O dia começou cedo, com a visita ao impressionante Canal do Panamá ainda pela manhã. À tarde, exploramos um pouco (ou muito) do Casco Viejo.",
        hotel: {
          name: "Baluarte Boutique Hotel",
          description: "Um hotel boutique simples e charmoso localizado no coração do Casco Viejo.",
          image: "/assets/experiences/curacao/hotel-baluarte.jpg",
        },
        highlights: {
          description:
            "O Canal do Panamá é sensacional e surpreendeu, mas o charme do Casco Viejo nos conquistou.",
          videos: undefined,
        },
      },
      {
        period: 2,
        date: "Dia 2",
        activity: "Uma corridinha matinal pela Costanera e partiu centro!",
        image: "/assets/experiences/curacao/costanera.png",
        description:
          "A experiência de correr pela Costanera foi muito legal! Tirando o cheiro em torno do mercado de peixes, é claro.",
        hotel: {
          name: "AC Hotel by Marriott Panama City",
          description:
            "Um hotel moderno com vista panorâmica da cidade, localizado no centro financeiro da Cidade do Panamá.",
          image: "/assets/experiences/curacao/ac-hotel-panama.jpg",
        },
        highlights: {
          description:
            "A estrutura da Costanera é incrível. Um lugar perfeito para um bom exercício matinal.",
          videos: undefined,
        },
      },
      {
        period: 3,
        date: "Dia 3",
        activity: "Oi, Curaçao!",
        image: "/assets/experiences/curacao/oi-curacao.png",
        description:
          "O primeiro contato com Curaçao foi quase um susto. Muita natureza e um mar espetacular!",
        hotel: {
          name: "Coral Estate Luxury Resort",
          description:
            "Um resort exclusivo à beira-mar, com uma vista privilegiada e acesso direto a uma praia paradisíaca e super tranquila.",
          image: "/assets/experiences/curacao/coral-estate.png",
        },
        highlights: {
          description:
            "A chegada no Coral Estate. O resort está aninhado em um morro à beira-mar, o que proporciona uma vista espetacular.",
          videos: undefined,
        },
      },
      {
        period: 4,
        date: "Dia 4",
        activity: "Cas Abao, Porto Marie e um pôr do sol a dois",
        image: "/assets/experiences/curacao/cas-abao.png",
        description:
          "O norte de Curaçao tem ilhas que são espetáculos e Cas Abao e Porto Marie não poderiam ser deixadas de fora.",
        hotel: {
          name: "Coral Estate Luxury Resort",
          description:
            "Um resort exclusivo à beira-mar, com uma vista privilegiada e acesso direto a uma praia paradisíaca e super tranquila.",
          image: "/assets/experiences/curacao/coral-estate.png",
        },
        highlights: {
          description:
            "O jantar ao pôr do sol, no Karakter, foi uma experiência incrível. A comida e o atendimento, impecáveis, mas a paisagem é o que faz toda a diferença.",
          videos: undefined,
        },
      },
      {
        period: 5,
        date: "Dia 5",
        activity: "Oi, Kenepas! Oi, Playa Lagun!",
        image: "/assets/experiences/curacao/kenepa-grandi.png",
        description:
          "A Playa Lagun foi a maior surpresa da viagem. Que lugar: água mais profunda, perfeita para mergulhos, mas com um mar tranquilo demais!",
        hotel: {
          name: "Lagun Blou Resort",
          description:
            "Um resort boutique com vista deslumbrante para a Playa Lagun, em um ambiente tranquilo e perfeito para mergulhar e relaxar.",
          image: "/assets/experiences/curacao/lagun-blou.png",
        },
        highlights: {
          description: "E a vista do Lagun Blou Resort foi uma surpresa muito positiva. Que lugar!",
          videos: undefined,
        },
      },
      {
        period: 6,
        date: "Dia 6",
        activity: "Partiu Pietermaai",
        image: "/assets/experiences/curacao/pietermaai-culture.png",
        description:
          "Desde o começo, sabíamos que queríamos conhecer Willemstad, viver a cultura. E já começamos bem, ficando muito bem localizados em Pietermaai.",
        hotel: {
          name: "Pietermaai Boutique Hotel",
          description:
            "Um hotel boutique histórico no coração do bairro mais charmoso de Willemstad. As casas antigas, reformadas e conectadas para formar o hotel, são o ponto alto.",
          image: "/assets/experiences/curacao/pietermaai-boutique.png",
        },
        highlights: {
          description: "O bairro histórico de Pietermaai é muito vibrante e tem tudo pertinho.",
          videos: undefined,
        },
      },
      {
        period: 7,
        date: "Dia 7",
        activity: "Punda, Otrobanda e uma cultura única!",
        image: "/assets/experiences/curacao/punda-fort.png",
        description:
          "Punda e Otrobanda, o coração de Willemstad. Atravessar a ponte Rainha Emma é uma experiência incrível. Dá até pra ver o pessoal correndo quando o sino toca!",
        hotel: {
          name: "Pietermaai Boutique Hotel",
          description:
            "Um hotel boutique histórico no coração do bairro mais charmoso de Willemstad. As casas antigas, reformadas e conectadas para formar o hotel, são o ponto alto.",
          image: "/assets/experiences/curacao/pietermaai-boutique.png",
        },
        highlights: {
          description:
            "Otrobanda tem alguns lugares incríveis, como a Kura Hulanda Village, que tem um centro comercial muito charmoso e com restaurantes ótimos.",
          videos: undefined,
        },
      },
      {
        period: 8,
        date: "Dia 8",
        activity: "Klein Curaçao: que paraíso!",
        image: "/assets/experiences/curacao/klein-curacao-2.png",
        description:
          "Imperdível: Klein Curaçao merece cada segundo da visita. É natureza quase intocada.",
        hotel: {
          name: "Pietermaai Boutique Hotel",
          description:
            "Um hotel boutique histórico no coração do bairro mais charmoso de Willemstad. As casas antigas, reformadas e conectadas para formar o hotel, são o ponto alto.",
          image: "/assets/experiences/curacao/pietermaai-boutique.png",
        },
        highlights: {
          description: "O ponto alto tem que ser Klein Curaçao, certo?",
          videos: undefined,
        },
      },
      {
        period: 9,
        date: "Dia 9",
        activity: "Últimos passeios e curtir o hotel",
        image: "/assets/experiences/curacao/curacao.png",
        description:
          "O dia de passear pela manhã, comprar as últimas lembrancinhas e, claro, relaxamento no hotel, aproveitando as últimas horas em Curaçao.",
        hotel: {
          name: "Pietermaai Boutique Hotel",
          description:
            "Um hotel boutique histórico no coração do bairro mais charmoso de Willemstad. As casas antigas, reformadas e conectadas para formar o hotel, são o ponto alto.",
          image: "/assets/experiences/curacao/pietermaai-boutique.png",
        },
        highlights: {
          description: "Curtir a piscina do hotel!",
          videos: undefined,
        },
      },
    ],
  },
  {
    name: 'reveillon-explora-ii',
    title: 'Réveillon com exclusividade no mar do caribe',
    travelers: 'por Henrique Gasparotto',
    type: 'by-period',
    isVisible: true,
    description:
      "Uma experiência única a bordo do Explora II para uma virada de ano espetacular: exclusividade, gastronomia de altíssimo nível e serviço de quarto 24h. Tudo combinado com a história de San Juan e o agito de Miami.",
    mapImage: "https://res.cloudinary.com/tripevolved/image/upload/v1764843469/SJUMIA-07-V1-map-en-1_j9tswa.webp",
    googleLink: "aaaa",
    uniqueMoments: [
      {
        title: "O Explora II",
        description:
          "7 noites a bordo do Explora II, passando por destinos paradisíacos, com festas de Ano Novo, paradas pelo Caribe e todos os serviços inclusivos - e exclusivos - da Explora Journeys.",
        image: "https://res.cloudinary.com/tripevolved/image/upload/v1763851529/Seaware_resize-EXPLORA_I_ATOLL_05_kp5mnn.jpg",
      },
      {
        title: "Miami",
        description:
          "A cidade dispensa apresentações, e você estará no centro da ação, em Brickell, um bairro moderno e vibrante, com uma atmosfera urbana e fácil acesso aos principais pontos da cidade.",
        image: "https://res.cloudinary.com/tripevolved/image/upload/v1764845549/sunset-with-business-residential-buildings-miami-panoramic-view-usa_h2onkl.jpg",
      },
    ],
    images: [
      "https://res.cloudinary.com/tripevolved/image/upload/v1763851541/Seaware_resize-EXPLORA_I_ATOLL_06_lezsvm.jpg",
      "https://res.cloudinary.com/tripevolved/image/upload/v1763851531/Seaware_resize-TobyMitchell2025_EXPLORA_OCEAN_TERRACE_SUITE_00548_zbnnfs.jpg",
      "https://res.cloudinary.com/tripevolved/image/upload/v1764845147/VICZB_qo3tc8.webp",
      "https://res.cloudinary.com/tripevolved/image/upload/v1764845333/d6cd213b_ml999u.webp",
    ],
    price: {
      included: [
        "Voos internacionais ida e volta (São Paulo - Miami)",
        "5 noites no Freedom of the Seas em cabine externa com vista para o mar",
        "3 noites no Fontainebleau Miami Beach com café da manhã",
        "Todas as refeições no restaurante principal do cruzeiro",
        "Entretenimento e shows a bordo",
        "Uso de piscinas, academia e atividades do navio",
        "2 noites no JW Marriott Marquis Miami",
        "City tour completo por Miami",
        "Jantar no Hard Rock Café",
        "Assistência de viagem",
      ],
      notIncluded: [
        "Bebidas alcoólicas no cruzeiro",
        "Restaurantes especializados do navio",
        "Excursões em terra (Nassau, Cozumel, Costa Maya)",
        "Spa e tratamentos a bordo",
        "Gorjetas do cruzeiro",
        "Despesas pessoais",
        "Seguro viagem",
        "Refeições não mencionadas",
      ],
      pricePerPerson: 12500,
      total: 25000,
      currency: "BRL",
    },
    itinerary: [
      {
        period: 1,
        date: "27 a 29 de dezembro de 2025",
        activity: "San Juan - A capital histórica de Porto Rico",
        image: "https://res.cloudinary.com/tripevolved/image/upload/v1764844817/default_ab884e.webp",
        description:
          "2 noites em San Juan, a capital histórica de Porto Rico, com café da manhã incluso. Explore a fortaleza de San Felipe del Morro, a baía de San Juan e o bairro de Old San Juan, repleto de arquitetura colonial e culinária local.",
        hotel: {
          name: "Palacio Provincial San Juan, Curio Collection by Hilton",
          description: "Um hotel histórico em Old San Juan, localizado próximo ao emblemático Castillo San Felipe del Morro. A localização é ideal para conhecer a cultura de San Juan, com fácil acesso às principais atrações históricas, restaurantes tradicionais e o charme colonial do bairro. O quarto Emissary oferece uma experiência única com varanda privativa, além de café da manhã incluso. O hotel também possui piscina no terraço com vista para a baía de San Juan.",
          image: "https://res.cloudinary.com/tripevolved/image/upload/v1764844379/0aeda2cf_dzgxwq.avif",
        },
        highlights: {
          description: "A experiência em San Juan começa pela localização privilegiada do hotel, próximo ao icônico Castillo San Felipe del Morro, uma das fortalezas históricas mais impressionantes do Caribe. Old San Juan revela sua essência através das ruas de paralelepípedos, arquitetura colonial colorida e uma atmosfera única que transporta os visitantes para outra época. A baía de San Juan oferece vistas espetaculares, enquanto os restaurantes locais permitem descobrir a autêntica culinária porto-riquenha.",
          videos: undefined,
        },
      },
      {
        period: 2,
        date: "29 de dezembro de 2025 - 5 de janeiro de 2026",
        activity: "Explora II - Réveillon no Caribe rumo a Miami",
        image: "https://res.cloudinary.com/tripevolved/image/upload/v1763851418/Seaware_resize-EJ_-_HR-143_nc5oqr.jpg",
        description:
          "7 noites a bordo do Explora II, embarcando em San Juan no dia 29 de dezembro e chegando a Miami em 5 de janeiro, com festas de Ano Novo, paradas pelo Caribe e todos os serviços inclusivos do Explora Journeys.",
        cruise: {
          name: "Explora II",
          description:
            "Com seu ar de hotel boutique 5 estrelas, traz 11 experiências culinárias distintas (9 inclusas), bares elegantes, Ocean Wellness e entretenimento de alto nível.",
          images: [
            "https://res.cloudinary.com/tripevolved/image/upload/v1763851425/1_x_1_ration-GettyImages-1341229201_V4-Amalfi_w4gwvb.jpg",
            "https://res.cloudinary.com/tripevolved/image/upload/v1763851529/Seaware_resize-EXPLORA_I_ATOLL_05_kp5mnn.jpg",
            "https://res.cloudinary.com/tripevolved/image/upload/v1763851541/Seaware_resize-EXPLORA_I_ATOLL_06_lezsvm.jpg",
            "https://res.cloudinary.com/tripevolved/image/upload/v1763851531/Seaware_resize-TobyMitchell2025_EXPLORA_OCEAN_TERRACE_SUITE_00548_zbnnfs.jpg",
          ],
          duration: "7 noites",
          details: {
            main: {
              departurePort: "San Juan, Porto Rico",
              arrivalPort: "Miami, FL",
              departureDate: "29 de dezembro, 2025",
              arrivalDate: "5 de janeiro, 2026",
              cabinType: "Ocean Terrace Suite",
              price: "A partir de R$26.600 por pessoa",
              highlights: [
                "Réveillon com fogos em San Juan",
                "11 experiências culinárias e classes no Chef's Kitchen",
                "12 lounges e bares com música ao vivo",
                "Ocean Wellness Spa com rituais e termas",
                "Tranquilidade e espaço a bordo, sem multidões"
              ],
              included: [
                "9 experiências culinárias distintas",
                "Bebidas premium ilimitadas",
                "Acesso ao Ocean Wellness thermal spa",
                "Wi-Fi de alta velocidade",
                "Programas de bem-estar e fitness",
                "Gorjetas",
                "Serviço de quarto 24h",
              ],
              notIncluded: [
                "Excursões privativas em terra",
                "Tratamentos no Ocean Wellness Spa",
                "Chef's Kitchen em formato privativo",
                "Restaurante Anthology",
                "Compras nas boutiques a bordo",
                "Transfers aéreos não contratados com a Explora",
              ],
            },
            itinerary: {
              totalDays: 7,
              daysAtSea: 1,
              ports: [
                {
                  name: "San Juan",
                  country: "Porto Rico",
                  arrivalTime: "09:00",
                  departureTime: "19:00",
                  duration: "Embarque",
                  image: "https://res.cloudinary.com/tripevolved/image/upload/v1764844745/243405-Puerto-Rico-Island_gb8qzb.jpg",
                  highlights: [
                    "Passeio vespertino por Old San Juan",
                    "Embarque e saída ao pôr do sol (19h)",
                  ],
                },
                {
                  name: "Road Bay",
                  country: "Anguila",
                  arrivalTime: "09:00",
                  departureTime: "19:00",
                  duration: "10 horas",
                  image: "https://res.cloudinary.com/tripevolved/image/upload/v1764845135/AIRBY-1_vv1shd.webp",
                  highlights: [
                    "Praias de areia branca e mar azul-turquesa",
                    "Beach clubs intimistas",
                  ],
                },
                {
                  name: "Cruz Bay (St. John)",
                  country: "Ilhas Virgens Americanas",
                  arrivalTime: "08:00",
                  departureTime: "17:00",
                  duration: "9 horas",
                  image: "https://res.cloudinary.com/tripevolved/image/upload/v1764845147/VICZB_qo3tc8.webp",
                  highlights: [
                    "Trunk Bay e Virgin Islands National Park",
                    "Snorkel em recifes preservados",
                  ],
                },
                {
                  name: "San Juan (Réveillon)",
                  country: "Porto Rico",
                  arrivalTime: "23:00",
                  departureTime: "02:00",
                  duration: "3 horas",
                  image: "https://res.cloudinary.com/tripevolved/image/upload/v1764846162/PRSFW-1_xrpmjk.webp",
                  highlights: [
                    "Fogos de Réveillon sobre a baía"
                  ],
                },
                {
                  name: "Puerto Plata",
                  country: "República Dominicana",
                  arrivalTime: "09:00",
                  departureTime: "17:00",
                  duration: "8 horas",
                  image: "https://res.cloudinary.com/tripevolved/image/upload/v1764846222/DOPOP-1_wwzyvm.webp",
                  highlights: [
                    "Teleférico ao Monte Isabel de Torres",
                    "Passeios históricos no centro colonial",
                  ],
                },
                {
                  name: "Dia em Alto Mar",
                  country: "Caribe",
                  arrivalTime: "-",
                  departureTime: "-",
                  duration: "1 dia",
                  image: "https://res.cloudinary.com/tripevolved/image/upload/v1763851455/Seaware_resize-TobyMitchell2025_EXPLORA_OCEAN_WELLNESS_SPA_00728_1_jh3azl.jpg",
                  highlights: [
                    "Ocean Wellness Spa e termas",
                    "Culinary classes at the Chef's Kitchen",
                  ],
                },
                {
                  name: "Key West",
                  country: "Estados Unidos",
                  arrivalTime: "10:00",
                  departureTime: "17:00",
                  duration: "7 horas",
                  image: "https://res.cloudinary.com/tripevolved/image/upload/v1764846443/USEYW_vxg8a4.webp",
                  highlights: [
                    "Passeios por Duval Street",
                    "Dry Tortugas e Mallory Square",
                  ],
                },
                {
                  name: "Miami",
                  country: "Estados Unidos",
                  arrivalTime: "07:00",
                  departureTime: "-",
                  duration: "Desembarque",
                  image: "https://res.cloudinary.com/tripevolved/image/upload/v1764846521/miami-south-beach-sunrise_khu7nk.jpg",
                  highlights: [
                    "Chegada com concierge Explora para transfers",
                    "Tempo livre em South Beach",
                  ],
                },
              ],
              route: "San Juan → Anguilla → St. John → San Juan (Réveillon) → Puerto Plata → Dia em alto mar → Key West → Miami",
            },
            experiences: [
              {
                name: "Chef's Kitchen",
                description: "Aulas culinárias interativas com chefs do Explora II",
                duration: "Variável",
                category: "dining",
                image: "https://res.cloudinary.com/tripevolved/image/upload/v1764848348/OEX-CHEF-S-KITCHEN_c6pfqq.webp",
                included: false,
              },
              {
                name: "Ocean Wellness Spa",
                description: "Rituais inspirados no mar com acesso ao circuito thermal",
                duration: "Variável",
                category: "onboard",
                image: "https://res.cloudinary.com/tripevolved/image/upload/v1763851485/Seaware_resize-TobyMitchell2025_EXPLORA_OCEAN_WELLNESS_SPA_00748_u0qote.jpg",
                included: false,
              },
              {
                name: "Journeys Lounge",
                description: "Performances musicais e shows autorais todas as noites",
                duration: "Variável",
                category: "entertainment",
                image: "https://res.cloudinary.com/tripevolved/image/upload/v1763851451/1_x_1_ration-Digital_Retouched_-_HR-19_v7i9q2.jpg",
                included: true,
              },
              {
                name: "Bespoke Shopping",
                description: "Compras curadas com marcas parceiras e artesãos locais",
                duration: "Variável",
                category: "shore",
                image: "https://res.cloudinary.com/tripevolved/image/upload/v1763851471/Seaware_resize-TobyMitchell2025_EXPLORA_RETAIL_01820_oj7sqz.jpg",
                included: false,
                price: "Sob consulta",
              },
              {
                name: "Curated Tastings",
                description: "Lounges com vinhos e destilados premium",
                duration: "Variável",
                category: "dining",
                image: "https://res.cloudinary.com/tripevolved/image/upload/v1763851470/Seaware_resize-TobyMitchell2025_EXPLORA_LOBBY_00622_bijl82.jpg",
                included: true,
              },
              {
                name: "State-of-the-art Fitness",
                description: "Sessões esportivas assinadas pela Technogym",
                duration: "60 minutos",
                category: "onboard",
                image: "https://res.cloudinary.com/tripevolved/image/upload/v1763851482/Seaware_resize-TobyMitchell2025_EXPLORA_FITNESS_CENTRE_02268_e5mm5y.jpg",
                included: true,
                price: "Sob consulta",
              },
            ],
            ship: exploraII,
          },
        },
        highlights: {
          description:
            "Paradas em Anguilla, St. John e Puerto Plata, além de dias no mar com atividades a bordo, shows, jantares especiais e experiências únicas no Caribe. E, claro, o show de fogos na baía de San Juan: incrível!",
          videos: undefined,
        },
      },
      {
        period: 3,
        date: "Dias 11 e 12",
        activity: "Miami Final e Retorno",
        image: "/assets/experiences/miami/miami-last-day.png",
        description:
          "2 noites no JW Marriott Marquis Miami no centro da cidade, tempo para compras finais e voo de retorno.",
        hotel: {
          name: "JW Marriott Marquis Miami",
          description:
            "Hotel de luxo no centro de Miami, próximo ao Bayfront Park e Bayside Marketplace.",
          image: "/assets/experiences/miami/jw-marriott.png",
        },
        highlights: {
          description:
            "Compras no Bayside Marketplace, tempo livre para explorar Miami e voo de retorno saindo às 21:05.",
          videos: undefined,
        },
      },
    ],
  },
  {
    name: "california-b",
    title: "A Califórnia que poucos falam",
    travelers: "por Henrique Gasparotto",
    type: "day-by-day",
    isVisible: true,
    description:
      "A road trip para curtir o melhor das paisagens californianas, saindo de Los Angeles e chegando em San Francisco - mas de um jeito diferente.",
    mapImage: "/assets/experiences/california/california-map.png",
    uniqueMoments: [
      {
        title: "Yosemite National Park",
        description:
          "Paisagens deslumbrantes com sequoias gigantes, cachoeiras e vistas panorâmicas de tirar o fôlego.",
        image: "/assets/experiences/california/yosemite.png",
      },
      {
        title: "Lake Tahoe",
        description:
          "Um lago alpino cristalino cercado por montanhas nevadas, perfeito para relaxar e apreciar a natureza.",
        image: "/assets/experiences/california/lake-tahoe.png",
      },
    ],
    images: [
      "/assets/experiences/california/la-griffith.png",
      "/assets/experiences/california/lake-tahoe.png",
      "/assets/experiences/california/san-francisco.png",
      "/assets/experiences/california/yosemite.png",
    ],
    itinerary: [
      {
        period: 1,
        date: "Dia 1",
        activity: "LA só de passagem",
        image: "/assets/experiences/california/la-griffith.png",
        description:
          "O dia em Los Angeles foi só de passagem, mas com uma chegada no Observatório Griffith antes de partir rumo a Morro Bay.",
        hotel: {
          name: "Holland Inn & Suites",
          description:
            "Um hotel simples e funcional em Morro Bay, com fácil acesso às principais atrações da cidade.",
          image: "/assets/experiences/california/holland-inn.jpg",
        },
        highlights: {
          description:
            "A viagem era o atrativo do dia: o Observatório Griffith para começar. Depois, Highway 1, Topanga State Park e paisagens incríveis pela Los Padres National Forest.",
          videos: undefined,
        },
      },
      {
        period: 2,
        date: "Dia 2",
        activity: "Uma manhã única em Morro Bay e partiu rumo Fresno",
        image: "/assets/experiences/california/morro-rock.png",
        description:
          "A manhã em Morro Bay foi incrível. A cidadezinha é muito tranquila, com a vista para a Morro Rock sendo um show à parte.",
        hotel: {
          name: "Hotel Piccadilly",
          description:
            "Um hotel charmoso, bem localizado, em Fresno, com fácil acesso à rodovia e aos parques nacionais.",
          image: "/assets/experiences/california/hotel-piccadilly.jpg",
        },
        highlights: {
          description:
            "Morro Bay. Uma parada um tanto aleatória na nossa viagem, mas foi muito legal conhecer um pouco mais do estilo por lá. Completamente diferente de tudo que vemos nos filmes, que normalmente se passam em LA ou San Francisco.",
          videos: undefined,
        },
      },
      {
        period: 3,
        date: "Dia 3",
        activity: "Sequoia & Kings Canyon - Que lugar! E para fechar, Yosemite no fim da tarde",
        image: "/assets/experiences/california/sequoia.png",
        description:
          "Fresno é a porta de entrada para alguns dos parques nacionais mais impressionantes dos EUA: Sequoia & Kings Canyon e o mundialmente famoso Yosemite National Park. Os lugares valem cada segundo da visita.",
        hotel: {
          name: "Fairfield Inn & Suites Oakhurst Yosemite",
          description:
            "Um hotel confortável e moderno, localizado estrategicamente para explorar o Yosemite National Park, com piscina aquecida e café da manhã incluso.",
          image: "/assets/experiences/california/hotel-fairfield.jpg",
        },
        highlights: {
          description:
            "A manhã começou por visitar as Sequoias e elas fazem você se sentir pequeno. Natureza pura! Mas o ponto alto do alto foi a vista de El Capitan no fim do dia, já em Yosemite. Sensacional!",
          videos: undefined,
        },
      },
      {
        period: 4,
        date: "Dia 4",
        activity: "Yosemite e ponto final",
        image: "/assets/experiences/california/yosemite-2.png",
        description:
          "Sabíamos que Yosemite merecia mais do que uma visita rápida de fim de dia e não nos decepcionamos. É um espetáculo atrás do outro.",
        hotel: {
          name: "Fairfield Inn & Suites Oakhurst Yosemite",
          description:
            "Um hotel confortável e moderno, localizado estrategicamente para explorar o Yosemite National Park, com piscina aquecida e café da manhã incluso.",
          image: "/assets/experiences/california/hotel-fairfield.jpg",
        },
        highlights: {
          description:
            "Queríamos uma trilha tranquila - mas erramos a curva e não foi tão tranquilo. A compensação foi chegarmos ao topo da Vernal Fall e ao Clark Point: são realmente espetaculares. Depois, descobrimos que pegamos a John Muir Trail.",
          videos: undefined,
        },
      },
      {
        period: 5,
        date: "Dia 5",
        activity: "Lake Tahoe - (quase) ainda na Califórnia!",
        image: "/assets/experiences/california/lake-tahoe.png",
        description:
          "Um pouco mais ao norte, Lake Tahoe é uma das maravilhas naturais da Califórnia. Partimos cedo de Oakhurst, passamos pela Eldorado National Forest e chegamos em South Lake Tahoe, nossa base para conhecer esse lugar lindo.",
        hotel: {
          name: "Station House Inn",
          description:
            "Um hotel tranquilo em South Lake Tahoe, com fácil acesso às praias e atrações do lago.",
          image: "/assets/experiences/california/station-house-inn.jpg",
        },
        highlights: {
          description:
            "Passar ao lado de Nevada e achar um cantinho lindo, cheio de pedras, para só curtir a vista do lago.",
          videos: undefined,
        },
      },
      {
        period: 6,
        date: "Dia 6",
        activity: "Dia de praia em Tahoe!",
        image: "/assets/experiences/california/lake-tahoe-2.png",
        description:
          "Num cantinho pertinho de Kings Beach, descobrimos uma praia tranquila para relaxar e curtir o dia. O que dizer da água: gelada, muito gelada! Mas tínhamos que mergulhar um pouco, certo?",
        hotel: {
          name: "Station House Inn",
          description:
            "Um hotel tranquilo em South Lake Tahoe, com fácil acesso às praias e atrações do lago.",
          image: "/assets/experiences/california/station-house-inn.jpg",
        },
        highlights: {
          description:
            "Ponto alto também para Emerald Bay, um cantinho do lago com uma vista espetacular para uma ilhota, que cria um cenário lindo.",
          videos: undefined,
        },
      },
      {
        period: 7,
        date: "Dia 7",
        activity: "São Francisco - A cidade da baía",
        image: "/assets/experiences/california/san-francisco.png",
        description:
          "A chegada em São Francisco tinha que ser pela Golden Gate Bridge, certo? Fizemos questão que nosso caminho nos trouxesse por lá.",
        hotel: {
          name: "The Donatello",
          description:
            "Um hotel elegante no centro de São Francisco, próximo à Union Square, com quartos espaçosos e vista para a cidade. O ponto alto é o lounge, no topo do hotel.",
          image: "/assets/experiences/california/the-donatello.jpg",
        },
        highlights: {
          description:
            "Estávamos muito bem localizados, pertinho de Union Square e dos principais pontos. O Ferry Building foi o ponto alto do dia, com direito a empanada argentina!",
          videos: undefined,
        },
      },
      {
        period: 8,
        date: "Dia 8",
        activity: "Piers, muitos piers. E, claro, Alcatraz!",
        image: "/assets/experiences/california/alcatraz.png",
        description:
          "São Francisco oferece muitas vistas da Baía, e tínhamos que aproveitar. Coit Tower, Palace of Fine Arts... Mas, principalmente, os piers em torno do Fisherman's Wharf.",
        hotel: {
          name: "The Donatello",
          description:
            "Um hotel elegante no centro de São Francisco, próximo à Union Square, com quartos espaçosos e vista para a cidade. O ponto alto é o lounge, no topo do hotel.",
          image: "/assets/experiences/california/the-donatello.jpg",
        },
        highlights: {
          description:
            "A viagem para Alcatraz foi uma das mais legais de toda a viagem. A experiência toda, com as histórias contadas lá dentro, vale muito a pena. E as vistas do trajeto de barco...",
          videos: undefined,
        },
      },
    ],
  },
  {
    name: "puglia",
    title: "Puglia: O coração da Itália",
    travelers: "por Henrique Gasparotto",
    type: "by-period",
    isVisible: false,
    description:
      "Uma jornada inesquecível pela Puglia, o coração da Itália, incluindo hospedagem em trulli tradicionais, cidades históricas e experiências gastronômicas únicas. Ideal para viajantes que buscam autenticidade, cultura e sabores tradicionais italianos.",
    mapImage:
      "https://res.cloudinary.com/tripevolved/image/upload/v1753530175/Captura_de_tela_2025-07-26_084221_ae1pfm.png",
    uniqueMoments: [
      {
        title: "Do mercado para a mesa em Alberobello",
        description:
          "Vamos explorar o pitoresco mercado de Alberobello, onde as cores e aromas das frutas e verduras da estação nos recebem. Juntos, selecionamos ingredientes frescos para o nosso almoço.",
        image:
          "https://ucarecdn.com/d0533fe9-fd50-4b2a-9468-e0e65c8453df/-/format/auto/-/stretch/off/-/progressive/yes/-/resize/1920x/-/quality/smart/",
      },
      {
        title: "Caffè L'Incontro em Lecce",
        description:
          "Visite o histórico Coffee L'Incontro em Lecce, onde você experimentará o autêntico Pasticciotto Leccese, um doce tradicional da região.",
        image:
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f9/ff/e5/img-20200222-213953-largejpg.jpg?w=900&h=-1&s=1",
      },
    ],
    images: [
      "https://res.cloudinary.com/tripevolved/image/upload/v1753699920/14383_kh0pry.jpg",
      "https://res.cloudinary.com/tripevolved/image/upload/v1753701331/lecce_zq7zj5.jpg",
      "https://res.cloudinary.com/tripevolved/image/upload/v1753701694/bari_eipfpq.jpg",
      "https://ucarecdn.com/d0533fe9-fd50-4b2a-9468-e0e65c8453df/-/format/auto/-/stretch/off/-/progressive/yes/-/resize/1920x/-/quality/smart/",
    ],
    itinerary: [
      {
        period: 1,
        date: "Dias 1 a 2",
        activity: "Milão - A capital da moda e da cultura italiana",
        image: "https://res.cloudinary.com/tripevolved/image/upload/v1753530462/724_1_j9m2qd.jpg",
        description:
          "Dois dias em Milão para explorar a capital da moda italiana. Visite o Duomo, a Galleria Vittorio Emanuele II, o Teatro La Scala e as boutiques de luxo da Via Montenapoleone. Aproveite a gastronomia local nos restaurantes tradicionais e modernos da cidade.",
        hotel: {
          name: "Hotel Cavour",
          description:
            "Hotel elegante no centro de Milão, a 15 minutos a pé da Catedral de Milão. Tem um buffet de café da manhã variado com opções sem glúten, ideal para comer bem e sair para curtir Milão. O Restaurante Conte Camillo serve especialidades da culinária italiana. Fica a apenas 700 metros do Teatro La Scala. Especial para viagens a dois.",
          image:
            "https://res.cloudinary.com/tripevolved/image/upload/v1753698629/cavour_externo_i0bwfk.jpg",
        },
        highlights: {
          description:
            "Milão oferece uma combinação perfeita de história, moda e gastronomia. Do Duomo gótico à Galleria Vittorio Emanuele II, cada esquina revela a elegância italiana. A Via Montenapoleone é o paraíso das compras de luxo, enquanto o Teatro La Scala representa a excelência cultural da cidade.",
          videos: undefined,
        },
      },
      {
        period: 2,
        date: "Dia 3",
        activity: "Milão para Alberobello de trem",
        image:
          "https://res.cloudinary.com/tripevolved/image/upload/v1753698966/trem_italo_p07p0w.webp",
        description:
          "Viagem de trem em classe executiva de Milão para Alberobello, atravessando a bela paisagem italiana. Uma jornada de 9 horas que vale cada minuto.",
        hotel: {
          name: "Abate Masseria & Resort",
          description:
            "Masseria histórica restaurada, oferecendo uma experiência autêntica da Puglia em uma estrutura rural tradicional.",
          image:
            "https://res.cloudinary.com/tripevolved/image/upload/v1753699783/abate_externo_znbl5f.jpg",
        },
        highlights: {
          description:
            "Esta jornada de 9 horas pela Itália é muito mais que um simples deslocamento - é uma transição do norte industrial para o sul rural. O trem corta vales, atravessa vilarejos medievais e revela a diversidade da paisagem italiana. Para quem busca entender a alma do país, esta viagem oferece uma perspectiva única: a transformação gradual da cultura, arquitetura e até mesmo da luz conforme se avança para o sul. A chegada em Alberobello, com seus trulli brancos emergindo na paisagem, é o momento em que a magia da Puglia se revela completamente.",
          videos: undefined,
        },
      },
      {
        period: 3,
        date: "Dias 3 a 5",
        activity: "Alberobello e Valle d'Itria",
        image: "https://res.cloudinary.com/tripevolved/image/upload/v1753699920/14383_kh0pry.jpg",
        description:
          "Exploração dos trulli de Alberobello, Patrimônio Mundial da UNESCO, e do encantador Valle d'Itria com suas paisagens únicas.",
        hotel: {
          name: "Abate Masseria & Resort",
          description:
            "Masseria histórica restaurada, oferecendo uma experiência autêntica da Puglia em uma estrutura rural tradicional.",
          image:
            "https://res.cloudinary.com/tripevolved/image/upload/v1753699783/abate_externo_znbl5f.jpg",
        },
        highlights: {
          description:
            "Alberobello é um lugar de sonho, com seus trulli brancos e ruas de pedra. O Valle d'Itria é simplesmente deslumbrante.",
          videos: [
            "rhRYFZQlZfofBmivbt5Xz02oXZBR9CQOrSvStCrB5JYE",
            "WldIJp27fp013FLvvKUp9u00BJierDgJX4pGOdK2a71hM",
          ],
        },
      },
      {
        period: 4,
        date: "Dia 6",
        activity: "Lecce - A Florença do Sul",
        image: "https://res.cloudinary.com/tripevolved/image/upload/v1753701331/lecce_zq7zj5.jpg",
        description:
          'Visita a Lecce, conhecida como a "Florença do Sul" por sua arquitetura barroca e rica história cultural.',
        hotel: {
          name: "Risorgimento Resort",
          description:
            "Membro do WorldHotels Elite, localizado no centro da cidade, próximo às estruturas gregas de Lecce.",
          image:
            "https://res.cloudinary.com/tripevolved/image/upload/v1753701465/risorgimento_resort_externo_2_zwpmdf.jpg",
        },
        highlights: {
          description:
            "Lecce é uma cidade incrível, com muita história. E, claro, tem na gastronomia o Pasticciotto Leccese, que não pode ser deixado de fora da experiência.",
          videos: undefined,
        },
      },
      {
        period: 5,
        date: "Dias 7 a 8",
        activity: "Bari e Polignano a Mare",
        image: "https://res.cloudinary.com/tripevolved/image/upload/v1753701694/bari_eipfpq.jpg",
        description:
          "Exploração de Bari, capital da Puglia, e Polignano a Mare, com suas praias deslumbrantes e centro histórico.",
        hotel: {
          name: "Mercure Villa Romanazzi Carducci Bari",
          description:
            "Hotel 4 estrelas bem localizado em Bari, oferecendo conforto e conveniência.",
          image:
            "https://res.cloudinary.com/tripevolved/image/upload/v1753701839/mercure_villa_romanazzi_externo_mps8ih.jpg",
        },
        highlights: {
          description:
            "Bari é vibrante e autêntica, enquanto Polignano a Mare é simplesmente deslumbrante com suas falésias.",
          videos: [
            "o01tpinhD2AMkkwTbMTzfvXwq6W9pX1iJ3mz8X9en00UY",
            "ofvDl02Lb4tfwp7wQgz5EMmfNv4w3klX5KGR9RXeXjAg",
          ],
        },
      },
    ],
  },
];

export function getExperienceByName(name: string): Experience | null {
  return mockExperiences.find((exp) => exp.name === name) || null;
}
