import type { Cruise } from "./cruise";

export interface Experience {
  name: string;
  title: string;
  travelers: string;
  description: string;
  type: "day-by-day" | "by-period";
  isVisible: boolean;
  images: string[];
  mapImage?: string;
  uniqueMoments?: {
    title: string;
    description: string;
    image: string;
  }[];
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
    name: "miami-cruise",
    title: "Miami com cruzeiro no Caribe",
    travelers: "por Deborah Eppi",
    type: "by-period",
    isVisible: false,
    description:
      "Uma experiência única combinando a vibrante cidade de Miami com um cruzeiro pelo Caribe no Freedom of the Seas. Do luxo dos hotéis de Miami Beach às águas cristalinas do Caribe.",
    mapImage: "/assets/experiences/miami/miami-map.png",
    uniqueMoments: [
      {
        title: "Freedom of the Seas",
        description:
          "5 noites a bordo de um dos maiores navios de cruzeiro do mundo, com cabine externa e vista para o mar.",
        image: "/assets/experiences/miami/freedom-of-seas.png",
      },
      {
        title: "Miami Beach",
        description:
          "3 noites no icônico Fontainebleau Miami Beach, um dos hotéis mais luxuosos da costa leste.",
        image: "/assets/experiences/miami/fontainebleau.png",
      },
    ],
    images: [
      "/assets/experiences/miami/miami-beach.png",
      "/assets/experiences/miami/freedom-of-seas.png",
      "/assets/experiences/miami/caribbean-islands.png",
      "/assets/experiences/miami/hard-rock-cafe.png",
    ],
    itinerary: [
      {
        period: 1,
        date: "Dias 1 a 3",
        activity: "Miami Beach - Luxo e Praia",
        image: "/assets/experiences/miami/miami-beach.png",
        description:
          "Voo noturno saindo de São Paulo às 23:15 e chegada em Miami às 06:55. 3 noites no icônico Fontainebleau Miami Beach com café da manhã incluso.",
        experience: {
          name: "FlowRider",
          description: "Simulador de surf a bordo do navio",
          image: "/assets/experiences/miami/fontainebleau.png",
        },
        highlights: {
          description:
            "Exploração de Miami Beach, Art Deco District, Lincoln Road Mall, city tour completo por Miami e jantar no Hard Rock Café.",
          videos: undefined,
        },
      },
      {
        period: 2,
        date: "Dias 4 a 8",
        activity: "Freedom of the Seas - 5 noites no Caribe",
        image: "/assets/experiences/miami/freedom-of-seas.png",
        description:
          "5 noites a bordo do Freedom of the Seas, um dos maiores navios de cruzeiro do mundo, com cabine externa e vista para o mar.",
        cruise: {
          name: "Freedom of the Seas",
          description:
            "Um dos maiores navios de cruzeiro do mundo, com cabine externa, múltiplas piscinas, shows, restaurantes e atividades para todos os gostos.",
          image: "/assets/experiences/miami/freedom-cabin.png",
          duration: "5 noites",
          details: {
            main: {
              departurePort: "Miami, FL",
              arrivalPort: "Miami, FL",
              departureDate: "17 de outubro, 2025",
              arrivalDate: "22 de outubro, 2025",
              cabinType: "Cabine Externa com Vista para o Mar",
              price: "A partir de R$ 2.500 por pessoa",
              highlights: [
                "Cabine externa com vista para o mar",
                "Todas as refeições incluídas",
                "Entretenimento a bordo",
                "3 paradas em ilhas caribenhas",
              ],
              included: [
                "Hospedagem em cabine externa",
                "Todas as refeições no restaurante principal",
                "Entretenimento e shows",
                "Uso de piscinas e academia",
                "Atividades para crianças e adolescentes",
              ],
              notIncluded: [
                "Bebidas alcoólicas",
                "Restaurantes especializados",
                "Excursões em terra",
                "Spa e tratamentos",
                "Gorjetas",
              ],
            },
            itinerary: {
              totalDays: 5,
              daysAtSea: 2,
              ports: [
                {
                  name: "Nassau",
                  country: "Bahamas",
                  arrivalTime: "08:00",
                  departureTime: "17:00",
                  duration: "9 horas",
                  highlights: [
                    "Praias de areia branca",
                    "Mergulho com snorkel",
                    "Compras duty-free",
                    "Passeio pela cidade histórica",
                  ],
                },
                {
                  name: "Cozumel",
                  country: "México",
                  arrivalTime: "07:00",
                  departureTime: "18:00",
                  duration: "11 horas",
                  highlights: [
                    "Recifes de coral para mergulho",
                    "Ruínas maias",
                    "Praias paradisíacas",
                    "Gastronomia mexicana",
                  ],
                },
                {
                  name: "Costa Maya",
                  country: "México",
                  arrivalTime: "08:00",
                  departureTime: "16:00",
                  duration: "8 horas",
                  highlights: [
                    "Parque aquático",
                    "Visita às ruínas de Chacchoben",
                    "Praias exclusivas",
                    "Atividades aquáticas",
                  ],
                },
              ],
              route: "Miami → Nassau → Costa Maya → Cozumel → Miami",
            },
            experiences: [
              {
                name: "FlowRider",
                description: "Simulador de surf a bordo do navio",
                duration: "1 hora",
                category: "onboard",
                included: true,
              },
              {
                name: "Rock Climbing Wall",
                description: "Parede de escalada de 13 metros",
                duration: "30 minutos",
                category: "onboard",
                included: true,
              },
              {
                name: "Ice Skating",
                description: "Pista de patinação no gelo",
                duration: "1 hora",
                category: "onboard",
                included: true,
              },
              {
                name: "Broadway Shows",
                description: "Shows musicais da Broadway",
                duration: "90 minutos",
                category: "entertainment",
                included: true,
              },
              {
                name: "Excursão em Nassau",
                description: "Tour pela cidade e praias",
                duration: "4 horas",
                category: "shore",
                price: "R$ 150",
                included: false,
              },
              {
                name: "Mergulho em Cozumel",
                description: "Mergulho nos recifes de coral",
                duration: "3 horas",
                category: "shore",
                price: "R$ 200",
                included: false,
              },
            ],
            ship: {
              name: "Freedom of the Seas",
              company: "Royal Caribbean International",
              capacity: 3634,
              yearBuilt: 2006,
              refurbished: 2020,
              length: "339 metros",
              width: "56 metros",
              decks: 15,
              features: [
                "FlowRider surf simulator",
                "Rock climbing wall",
                "Ice skating rink",
                "Mini golf course",
                "Basketball court",
                "Fitness center",
                "Spa and wellness center",
              ],
              amenities: [
                {
                  category: "Piscinas",
                  items: [
                    "Piscina principal",
                    "Piscina para adultos",
                    "Piscina infantil",
                    "Jacuzzis",
                  ],
                },
                {
                  category: "Esportes",
                  items: [
                    "Academia completa",
                    "Quadra de basquete",
                    "Parede de escalada",
                    "FlowRider",
                  ],
                },
                {
                  category: "Entretenimento",
                  items: ["Teatro principal", "Casino", "Discoteca", "Karaokê"],
                },
              ],
              dining: [
                {
                  name: "Main Dining Room",
                  type: "main",
                  description: "Restaurante principal com menu variado",
                  included: true,
                },
                {
                  name: "Windjammer Café",
                  type: "casual",
                  description: "Buffet internacional",
                  included: true,
                },
                {
                  name: "Chops Grille",
                  type: "specialty",
                  description: "Steakhouse premium",
                  included: false,
                },
                {
                  name: "Giovanni's Table",
                  type: "specialty",
                  description: "Culinária italiana autêntica",
                  included: false,
                },
              ],
              entertainment: [
                {
                  name: "AquaTheater",
                  type: "show",
                  description: "Shows aquáticos com acrobatas",
                },
                {
                  name: "Studio B",
                  type: "venue",
                  description: "Teatro para shows de gelo",
                },
                {
                  name: "Promenade",
                  type: "venue",
                  description: "Área central com lojas e cafés",
                },
                {
                  name: "Casino Royale",
                  type: "activity",
                  description: "Casino com jogos de mesa e slots",
                },
              ],
            },
          },
        },
        highlights: {
          description:
            "3 paradas em ilhas caribenhas, dias no mar com atividades a bordo, shows, jantares especiais e experiências únicas no Caribe.",
          videos: undefined,
        },
      },
      {
        period: 3,
        date: "Dias 9 a 11",
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
