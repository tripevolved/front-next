export interface UniqueMoment {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  images: string[];
}

export interface Accommodation {
  name: string;
  image: string;
  dates: string;
  description: string;
}

export interface Flight {
  fromAirport: string;
  toAirport: string;
  airline: string;
  class: string;
  baggage: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  flightNumber: string;
}

export interface OtherInclusion {
  title: string;
  details: string;
}

export interface PricingItem {
  type: 'fee' | 'price' | 'bonus';
  title: string;
  amount: number;
  currency: string;
  description?: string;
  originalAmount?: number;
}

import type { ItineraryItem } from "@/components/itineraries";

export interface PropostaData {
  id: string;
  title: string;
  dates: string;
  travelers: string;
  uniqueMoments: UniqueMoment[];
  itinerary: ItineraryItem[];
  mapImage?: string;
  accommodations: Accommodation[];
  flights: Flight[];
  otherInclusions: OtherInclusion[];
  potentialInclusions?: OtherInclusion[];
  pricing: PricingItem[];
  description: string;
  cta: {
    text: string;
    action: string;
  };
}

// Mock data for proposta page
export const mockPropostaData: PropostaData = {
  id: "16dd53cc-76dc-45f2-b697-4c1d920c5124",
  title: "Puglia: O coração da Itália",
  dates: "5 a 12 de Outubro, 2025",
  travelers: "para Lucia, por Henrique Gasparotto",
  uniqueMoments: [
    {
      id: "market-to-table-alberobello",
      title: "Do mercado para a mesa em Alberobello",
      subtitle: "Sabores autênticos da Puglia",
      description: "Vamos explorar o pitoresco mercado de Alberobello, onde as cores e aromas das frutas e verduras da estação nos recebem. Juntos, selecionamos ingredientes frescos para o nosso almoço. Em casa, preparamos um aperitivo com produtos locais, mergulhamos na tradição pugliese fazendo orecchiette frescas e terminamos criando o famoso tiramisu italiano. Um dia inesquecível de descoberta e culinária.",
      images: [
        "https://ucarecdn.com/d0533fe9-fd50-4b2a-9468-e0e65c8453df/-/format/auto/-/stretch/off/-/progressive/yes/-/resize/1920x/-/quality/smart/",
        "https://ucarecdn.com/fd092a72-0e2c-492e-98e3-d1816c3c7cd7/-/format/auto/-/stretch/off/-/progressive/yes/-/resize/1920x/-/quality/smart/",
      ]
    },
    {
      id: "coffee-lecce",
      title: "Caffè L'Incontro em Lecce",
      subtitle: "O Pasticciotto perfeito",
      description: "Visite o histórico Coffee L'Incontro em Lecce, onde você experimentará o autêntico Pasticciotto Leccese, um doce tradicional da região. Uma experiência gastronômica que combina história, tradição e sabor único.",
      images: [
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f9/ff/e5/img-20200222-213953-largejpg.jpg?w=900&h=-1&s=1",
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/ba/6e/48/photo2jpg.jpg?w=1200&h=-1&s=1",
      ]
    }
  ],
  mapImage: "https://res.cloudinary.com/tripevolved/image/upload/v1753530175/Captura_de_tela_2025-07-26_084221_ae1pfm.png",
  itinerary: [
    {
      id: 1,
      date: '5 de outubro',
      activity: 'Lago di Como para Milão',
      image: 'https://res.cloudinary.com/tripevolved/image/upload/v1753530462/724_1_j9m2qd.jpg',
      description: 'Ida para Milão é uma decisão logística, já que você estará no Lago di Como. Uma noite em Milão, bem localizada para jantar próximo ao Duomo e pegar o trem no dia seguinte.',
      hotel: {
        name: 'Hotel Cavour',
        description: 'Hotel elegante no centro de Milão, a poucos minutos do Duomo e da estação central.',
        image: 'https://res.cloudinary.com/tripevolved/image/upload/v1753698629/cavour_externo_i0bwfk.jpg',
        details: {
          description: 'O Hotel Cavour oferece conforto e localização privilegiada no coração de Milão, ideal para uma noite estratégica antes de seguir viagem.',
          highlight: 'Localização central, ideal para jantar próximo ao Duomo e fácil acesso à estação de trem.',
          images: [
            'https://res.cloudinary.com/tripevolved/image/upload/v1753698629/cavour_quarto_sfqkxc.jpg',
            'https://res.cloudinary.com/tripevolved/image/upload/v1753698628/cavour_area_phl39a.jpg',
            'https://res.cloudinary.com/tripevolved/image/upload/v1753698628/cavour_cafe_bdailt.jpg',
            'https://res.cloudinary.com/tripevolved/image/upload/v1753698628/cavour_fitness_icccju.jpg',
            'https://res.cloudinary.com/tripevolved/image/upload/v1753698628/cavour_extra_fjap8v.jpg'
          ],
          includedServices: [
            'Café da manhã incluso',
            'Wi-Fi gratuito',
            'Recepção 24 horas',
            'Restaurante e bar',
            'Academia'
          ]
        }
      },
      highlights: {
        description: 'Uma noite estratégica em Milão para facilitar a logística da viagem.',
        details: 'A decisão de parar uma noite em Milão é logística, mas a escolha da hospedagem é para que vocês estejam bem localizados para curtir um pouco da cidade antes da viagem rumo ao Sul.',
        videos: undefined
      }
    },
    {
      id: 2,
      date: '6 de outubro',
      activity: 'Milão para Alberobello de trem',
      image: 'https://res.cloudinary.com/tripevolved/image/upload/v1753698966/trem_italo_p07p0w.webp',
      description: 'Viagem de trem em classe executiva de Milão para Alberobello, atravessando a bela paisagem italiana. Uma jornada de 9 horas que vale cada minuto.',
      hotel: {
        name: 'Abate Masseria & Resort',
        description: 'Masseria histórica restaurada, oferecendo uma experiência autêntica da Puglia em uma estrutura rural tradicional.',
        image: 'https://res.cloudinary.com/tripevolved/image/upload/v1753699783/abate_externo_znbl5f.jpg',
        details: {
          description: 'O Abate Masseria & Resort é uma masseria histórica cuidadosamente restaurada, preservando a arquitetura rural tradicional da Puglia. Esta estrutura centenária oferece uma experiência única de hospedagem em uma propriedade rural autêntica, combinando charme histórico com conforto moderno.',
          highlight: 'Hospedagem em uma masseria histórica restaurada, uma experiência única da arquitetura rural pugliese.',
          images: [
            'https://res.cloudinary.com/tripevolved/image/upload/v1753699783/abate_quarto_ioi8mt.jpg',
            'https://res.cloudinary.com/tripevolved/image/upload/v1753699783/abate_banheiro_d9fyxd.jpg',
            'https://res.cloudinary.com/tripevolved/image/upload/v1753699782/abate_externo_2_j5bcyp.jpg',
            'https://res.cloudinary.com/tripevolved/image/upload/v1753699782/abate_piscina_tqyg7a.jpg'
          ],
          includedServices: [
            'Café da manhã regional',
            'Wi-Fi gratuito',
            'Spa e piscina',
            'Restaurante tradicional',
            'Aula de culinária',
            'Jardim mediterrâneo',
            'Estacionamento',
            'Transfer para Alberobello'
          ]
        }
      },
      highlights: {
        description: 'A viagem de trem oferece vistas deslumbrantes da paisagem italiana, e a chegada em Alberobello é mágica.',
        details: 'Esta jornada de 9 horas pela Itália é muito mais que um simples deslocamento - é uma transição do norte industrial para o sul rural. O trem corta vales, atravessa vilarejos medievais e revela a diversidade da paisagem italiana. Para quem busca entender a alma do país, esta viagem oferece uma perspectiva única: a transformação gradual da cultura, arquitetura e até mesmo da luz conforme se avança para o sul. A chegada em Alberobello, com seus trulli brancos emergindo na paisagem, é o momento em que a magia da Puglia se revela completamente.',
        videos: undefined
      }
    },
    {
      id: 3,
      date: '6 a 9 de outubro',
      activity: 'Alberobello e Valle d\'Itria',
      image: 'https://res.cloudinary.com/tripevolved/image/upload/v1753699920/14383_kh0pry.jpg',
      description: 'Exploração dos trulli de Alberobello, Patrimônio Mundial da UNESCO, e do encantador Valle d\'Itria com suas paisagens únicas.',
      hotel: {
        name: 'Abate Masseria & Resort',
        description: 'Masseria histórica restaurada, oferecendo uma experiência autêntica da Puglia em uma estrutura rural tradicional.',
        image: 'https://res.cloudinary.com/tripevolved/image/upload/v1753699783/abate_externo_znbl5f.jpg',
        details: {
          description: 'O Abate Masseria & Resort é uma masseria histórica cuidadosamente restaurada, preservando a arquitetura rural tradicional da Puglia. Esta estrutura centenária oferece uma experiência única de hospedagem em uma propriedade rural autêntica, combinando charme histórico com conforto moderno.',
          highlight: 'Hospedagem em uma masseria histórica restaurada, uma experiência única da arquitetura rural pugliese.',
          images: [
            'https://res.cloudinary.com/tripevolved/image/upload/v1753699783/abate_quarto_ioi8mt.jpg',
            'https://res.cloudinary.com/tripevolved/image/upload/v1753699783/abate_banheiro_d9fyxd.jpg',
            'https://res.cloudinary.com/tripevolved/image/upload/v1753699782/abate_externo_2_j5bcyp.jpg',
            'https://res.cloudinary.com/tripevolved/image/upload/v1753699782/abate_piscina_tqyg7a.jpg'
          ],
          includedServices: [
            'Café da manhã regional',
            'Wi-Fi gratuito',
            'Spa e piscina',
            'Restaurante tradicional',
            'Aula de culinária',
            'Jardim mediterrâneo',
            'Estacionamento',
            'Transfer para Alberobello'
          ]
        }
      },
      highlights: {
        description: 'Alberobello é um lugar de sonho, com seus trulli brancos e ruas de pedra. O Valle d\'Itria é simplesmente deslumbrante.',
        videos: [
          "rhRYFZQlZfofBmivbt5Xz02oXZBR9CQOrSvStCrB5JYE",
          "WldIJp27fp013FLvvKUp9u00BJierDgJX4pGOdK2a71hM"
        ]
      }
    },
    {
      id: 4,
      date: '9 a 10 de outubro',
      activity: 'Lecce - A Florença do Sul',
      image: 'https://res.cloudinary.com/tripevolved/image/upload/v1753701331/lecce_zq7zj5.jpg',
      description: 'Visita a Lecce, conhecida como a "Florença do Sul" por sua arquitetura barroca e rica história cultural.',
      hotel: {
        name: 'Risorgimento Resort',
        description: 'Membro do WorldHotels Elite, localizado no centro da cidade, próximo às estruturas gregas de Lecce.',
        image: 'https://res.cloudinary.com/tripevolved/image/upload/v1753701465/risorgimento_resort_externo_2_zwpmdf.jpg',
        details: {
          description: 'O Risorgimento Resort, membro do WorldHotels Elite, oferece uma experiência de luxo no coração de Lecce. Localizado no centro da cidade, está próximo às impressionantes estruturas gregas que fazem parte do rico patrimônio histórico da região.',
          highlight: 'Hotel de luxo no centro de Lecce, próximo às estruturas gregas históricas.',
          images: [
            'https://res.cloudinary.com/tripevolved/image/upload/v1753701466/risorgimento_resort_externo_cmdv0p.jpg',
            'https://res.cloudinary.com/tripevolved/image/upload/v1753701463/risorgimento_resort_banheiro_r2y7mw.jpg',
            'https://res.cloudinary.com/tripevolved/image/upload/v1753701461/risorgimento_resort_jantar_zwuod6.jpg',
            'https://res.cloudinary.com/tripevolved/image/upload/v1753701459/risorgimento_resort_quarto_gmlpc4.jpg',
            'https://res.cloudinary.com/tripevolved/image/upload/v1753701458/risorgimento_resort_vista_yealmo.jpg',
            'https://res.cloudinary.com/tripevolved/image/upload/v1753701456/risorgimento_resort_cafe_pacuhd.jpg'
          ],
          includedServices: [
            'Café da manhã buffet',
            'Wi-Fi gratuito',
            'Recepção 24 horas',
            'Restaurante gourmet',
            'Spa e wellness',
            'Academia',
            'Bar elegante',
            'Serviço de concierge'
          ]
        }
      },
      highlights: {
        description: 'Lecce é uma cidade incrível, com muita história. E, claro, tem na gastronomia o Pasticciotto Leccese, que não pode ser deixado de fora da experiência.',
        details: 'Conhecida como a "Florença do Sul", Lecce é um tesouro  que convida à descoberta. Suas ruas revelam séculos de história, desde os romanos até o esplendor do século XVII. Para quem busca entender a alma da Puglia, cada esquina conta uma história - e o Pasticciotto Leccese é apenas o começo de uma jornada gastronômica que vai muito além do doce.',
        videos: undefined
      }
    },
    {
      id: 5,
      date: '10 a 12 de outubro',
      activity: 'Bari e Polignano a Mare',
      image: 'https://res.cloudinary.com/tripevolved/image/upload/v1753701694/bari_eipfpq.jpg',
      description: 'Exploração de Bari, capital da Puglia, e Polignano a Mare, com suas praias deslumbrantes e centro histórico.',
      hotel: {
        name: 'Mercure Villa Romanazzi Carducci Bari',
        description: 'Hotel 4 estrelas bem localizado em Bari, oferecendo conforto e conveniência.',
        image: 'https://res.cloudinary.com/tripevolved/image/upload/v1753701839/mercure_villa_romanazzi_externo_mps8ih.jpg',
        details: {
          description: 'O Mercure Villa Romanazzi Carducci Bari é um hotel 4 estrelas estrategicamente localizado, oferecendo o equilíbrio perfeito entre conforto moderno e conveniência. Com instalações de qualidade e serviço profissional, é a base ideal para explorar a capital da Puglia.',
          highlight: 'Hotel 4 estrelas bem localizado, oferecendo conforto e conveniência em Bari.',
          images: [
            'https://res.cloudinary.com/tripevolved/image/upload/v1753701837/mercure_villa_romanazzi_quarto_deluxe_r3z3zj.jpg',
            'https://res.cloudinary.com/tripevolved/image/upload/v1753701835/mercure_villa_romanazzi_externo2_ho03m5.jpg',
            'https://res.cloudinary.com/tripevolved/image/upload/v1753701833/mercure_villa_romanazzi_cafe_y9gvua.jpg',
            'https://res.cloudinary.com/tripevolved/image/upload/v1753701831/mercure_villa_romanazzi_piscina_whrp7u.jpg',
            'https://res.cloudinary.com/tripevolved/image/upload/v1753701829/mercure_villa_romanazzi_restaurante_arsipi.jpg',
            'https://res.cloudinary.com/tripevolved/image/upload/v1753701827/mercure_villa_romanazzi_restaurante2_aw8ylw.jpg'
          ],
          includedServices: [
            'Café da manhã buffet',
            'Wi-Fi gratuito',
            'Recepção 24 horas',
            'Restaurante no local',
            'Bar',
            'Academia',
            'Estacionamento',
            'Transfer para aeroporto'
          ]
        }
      },
      highlights: {
        description: 'Bari é vibrante e autêntica, enquanto Polignano a Mare é simplesmente deslumbrante com suas falésias.',
        videos: [
          'o01tpinhD2AMkkwTbMTzfvXwq6W9pX1iJ3mz8X9en00UY',
          'ofvDl02Lb4tfwp7wQgz5EMmfNv4w3klX5KGR9RXeXjAg'
        ]
      }
    },
    {
      id: 6,
      date: '12 de outubro',
      activity: 'Bari para Liège, Bélgica',
      image: 'https://res.cloudinary.com/tripevolved/image/upload/v1753702534/410_lk4p6m.jpg',
      description: 'Voo de Bari para Bruxelas, seguido de transfer para Liège, na Bélgica, encerrando nossa jornada pela Puglia.',
      hotel: undefined,
      highlights: {
        description: 'A transição da ensolarada Puglia para a charmosa Liège marca o fim de uma jornada inesquecível.',
        details: 'A melhor opção foi o voo Bari - Bruxelas, com conexão em Roma. Com isso, precisamos alinhar a chegada a Liége a partir do aeroporto de Bruxelas.',
        videos: undefined
      }
    }
  ],
  accommodations: [
    {
      name: "Hotel Cavour",
      image: "https://res.cloudinary.com/tripevolved/image/upload/v1753698629/cavour_externo_i0bwfk.jpg",
      dates: "5 de outubro",
      description: "Hotel elegante no centro de Milão, ideal para jantar próximo ao Duomo e seguir viagem de trem."
    },
    {
      name: "Abate Masseria & Resort",
      image: "https://res.cloudinary.com/tripevolved/image/upload/v1753699783/abate_externo_znbl5f.jpg",
      dates: "6-9 de outubro",
      description: "Masseria histórica restaurada, experiência autêntica da Puglia"
    },
    {
      name: "Risorgimento Resort",
      image: "https://res.cloudinary.com/tripevolved/image/upload/v1753701465/risorgimento_resort_externo_2_zwpmdf.jpg",
      dates: "9-10 de outubro",
      description: "Membro do WorldHotels Elite, no centro de Lecce, próximo às estruturas gregas"
    },
    {
      name: "Mercure Villa Romanazzi Carducci Bari",
      image: "https://res.cloudinary.com/tripevolved/image/upload/v1753701839/mercure_villa_romanazzi_externo_mps8ih.jpg",
      dates: "10-12 de outubro",
      description: "Hotel 4 estrelas bem localizado em Bari"
    }
  ],
  flights: [
    {
      fromAirport: "Bari (BRI)",
      toAirport: "Bruxelas (BRU)",
      airline: "Ita",
      class: "Econômica",
      baggage: "Bagagem de mão + despachada",
      departureDate: "12 de outubro",
      departureTime: "14:30",
      arrivalTime: "17:45",
      flightNumber: "FR 5678"
    }
  ],
  otherInclusions: [
    {
      title: "Trem",
      details: "Passagem de trem executiva Milão-Alberobello (9 horas de viagem)"
    },
    {
      title: "Experiência 'Do mercado para a mesa' em Alberobello",
      details: "Sabores autênticos da Puglia"
    },
    {
      title: "Seguro Viagem",
      details: "Seguro completo para duas pessoas com cobertura médica, bagagem e cancelamento ate EUR 30.000,00"
    }
  ],
  potentialInclusions: [
    {
      title: "Transfers em Milão e Bari",
      details: "Transfer privativo aeroporto-hotel-aeroporto em Milão e Bari"
    },
    {
      title: "Transfer Bruxelas-Liège",
      details: "Transfer privativo aeroporto de Bruxelas para Liège"
    },
    {
      title: "Guia Local",
      details: "Guia local para passeios, especialmente em Lecce e Alberobello"
    },
    {
      title: "Passeios pelo Valle D'Itria",
      details: "Pode ser feito por aluguel de carro ou passeios marcados, privados, são várias possibilidades."
    }
  ],
  pricing: [
    {
      type: "fee",
      title: "Taxa de consultoria Jornada Evolved",
      amount: 1200,
      currency: "R$"
    },
    {
      type: "price",
      title: "Viagem",
      amount: 18128,
      currency: "R$"
    },
    {
      type: "bonus",
      title: "Evolved Experiências",
      amount: 0,
      currency: "R$",
      description: "Guia personalizado da viagem com roteiro detalhado",
      originalAmount: 2100
    }
  ],
  description: "Uma jornada inesquecível pela Puglia, o coração da Itália, incluindo hospedagem em trulli tradicionais, cidades históricas e experiências gastronômicas únicas. Ideal para viajantes que buscam autenticidade, cultura e sabores tradicionais italianos.",
  cta: {
    text: "Reservar com especialista",
    action: "https://wa.me/?text=Olá! Gostaria de reservar a viagem para Puglia, Itália."
  }
}; 