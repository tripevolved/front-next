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
  travelers: "por Henrique Gasparotto",
  uniqueMoments: [
    {
      id: "culinary-class-alberobello",
      title: "Aula de Culinária em Alberobello",
      subtitle: "Sabores autênticos da Puglia",
      description: "Aprenda os segredos da culinária pugliese em uma aula de culinária tradicional em Alberobello. Prepare pratos autênticos como orecchiette, focaccia e burrata, usando ingredientes locais frescos e técnicas centenárias.",
      images: [
        "/assets/experiences/italia/culinary-class-1.jpg",
        "/assets/experiences/italia/culinary-class-2.jpg",
      ]
    },
    {
      id: "coffee-lecce",
      title: "Coffee L'Incontro em Lecce",
      subtitle: "O Pasticciotto perfeito",
      description: "Visite o histórico Coffee L'Incontro em Lecce, onde você experimentará o autêntico Pasticciotto Leccese, um doce tradicional da região. Uma experiência gastronômica que combina história, tradição e sabor único.",
      images: [
        "/assets/experiences/italia/coffee-lecce-1.jpg",
        "/assets/experiences/italia/coffee-lecce-2.jpg",
      ]
    }
  ],
  mapImage: "/assets/experiences/italia/puglia-mapa.png",
  itinerary: [
    {
      id: 1,
      date: '5 de outubro',
      activity: 'Lago di Como para Milão',
      image: '/assets/experiences/italia/lago-como.jpg',
      description: 'Início da jornada no deslumbrante Lago di Como, com suas vilas históricas e paisagens alpinas. Transfer para Milão, a capital da moda e do design italiano.',
      hotel: {
        name: 'Hotel Milano Scala',
        description: 'Hotel boutique no centro histórico de Milão, próximo ao Duomo e à Galleria Vittorio Emanuele II.',
        image: '/assets/experiences/italia/hotel-milano.jpg',
        details: {
          description: 'O Hotel Milano Scala está localizado no coração histórico de Milão, a poucos passos do Duomo e da famosa Galleria Vittorio Emanuele II. Com design contemporâneo e serviço personalizado, oferece uma base perfeita para explorar a capital da moda italiana.',
          highlight: 'Localização privilegiada no centro histórico, com fácil acesso às principais atrações de Milão.',
          images: [
            '/assets/experiences/italia/hotel-milano-2.jpg',
            '/assets/experiences/italia/hotel-milano-3.jpg',
            '/assets/experiences/italia/hotel-milano-4.jpg'
          ],
          includedServices: [
            'Café da manhã continental',
            'Wi-Fi gratuito',
            'Recepção 24 horas',
            'Bar no lobby',
            'Ar condicionado',
            'TV de tela plana',
            'Cofre no quarto',
            'Serviço de concierge'
          ]
        }
      },
      highlights: {
        description: 'A transição do sereno Lago di Como para a vibrante Milão oferece um contraste perfeito entre natureza e urbanidade.',
        videos: undefined
      }
    },
    {
      id: 2,
      date: '6 de outubro',
      activity: 'Milão para Alberobello de trem',
      image: '/assets/experiences/italia/train-journey.jpg',
      description: 'Viagem de trem em classe executiva de Milão para Alberobello, atravessando a bela paisagem italiana. Uma jornada de 9 horas que vale cada minuto.',
      hotel: {
        name: 'Trulli Resort & Spa',
        description: 'Resort único com trulli tradicionais da Puglia, oferecendo uma experiência autêntica da região.',
        image: '/assets/experiences/italia/trulli-resort.jpg',
        details: {
          description: 'O Trulli Resort & Spa oferece uma experiência única em trulli tradicionais da Puglia, as características casas cônicas de pedra da região. Cada trullo foi cuidadosamente restaurado para proporcionar conforto moderno mantendo a autenticidade histórica.',
          highlight: 'Hospedagem em trulli tradicionais, uma experiência única e autêntica da Puglia.',
          images: [
            '/assets/experiences/italia/trulli-resort-2.jpg',
            '/assets/experiences/italia/trulli-resort-3.jpg',
            '/assets/experiences/italia/trulli-resort-4.jpg'
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
        videos: undefined
      }
    },
    {
      id: 3,
      date: '6 a 9 de outubro',
      activity: 'Alberobello e Valle d\'Itria',
      image: '/assets/experiences/italia/alberobello.jpg',
      description: 'Exploração dos trulli de Alberobello, Patrimônio Mundial da UNESCO, e da encantadora Valle d\'Itria com suas paisagens de oliveiras.',
      hotel: {
        name: 'Trulli Resort & Spa',
        description: 'Continuação da estadia no resort de trulli tradicionais.',
        image: '/assets/experiences/italia/trulli-resort.jpg'
      },
      highlights: {
        description: 'Alberobello é um lugar de sonho, com seus trulli brancos e ruas de pedra. A Valle d\'Itria é simplesmente deslumbrante.',
        videos: undefined
      }
    },
    {
      id: 4,
      date: '9 a 10 de outubro',
      activity: 'Lecce - A Florença do Sul',
      image: '/assets/experiences/italia/lecce.jpg',
      description: 'Visita a Lecce, conhecida como a "Florença do Sul" por sua arquitetura barroca e rica história cultural.',
      hotel: {
        name: 'Palazzo dei Dondoli',
        description: 'Palazzo histórico no centro de Lecce, com arquitetura barroca e charme italiano.',
        image: '/assets/experiences/italia/palazzo-lecce.jpg',
        details: {
          description: 'O Palazzo dei Dondoli é um palácio histórico restaurado no coração de Lecce, oferecendo uma experiência única de hospedagem em um edifício barroco autêntico. Cada quarto é decorado com móveis antigos e detalhes arquitetônicos originais.',
          highlight: 'Hospedagem em um palácio histórico barroco no centro de Lecce.',
          images: [
            '/assets/experiences/italia/palazzo-lecce-2.jpg',
            '/assets/experiences/italia/palazzo-lecce-3.jpg',
            '/assets/experiences/italia/palazzo-lecce-4.jpg'
          ],
          includedServices: [
            'Café da manhã no jardim',
            'Wi-Fi gratuito',
            'Guia local incluído',
            'Restaurante no local',
            'Jardim histórico',
            'Biblioteca antiga',
            'Concierge personalizado',
            'Tour cultural'
          ]
        }
      },
      highlights: {
        description: 'Lecce é uma cidade de sonho, com sua arquitetura barroca e o famoso Coffee L\'Incontro para o Pasticciotto.',
        videos: undefined
      }
    },
    {
      id: 5,
      date: '10 a 12 de outubro',
      activity: 'Bari e Polignano a Mare',
      image: '/assets/experiences/italia/polignano-mare.jpg',
      description: 'Exploração de Bari, capital da Puglia, e Polignano a Mare, com suas praias deslumbrantes e centro histórico.',
      hotel: {
        name: 'Hotel Terranobile',
        description: 'Hotel boutique em Bari, próximo ao centro histórico e ao mar Adriático.',
        image: '/assets/experiences/italia/hotel-bari.jpg',
        details: {
          description: 'O Hotel Terranobile está localizado no centro de Bari, oferecendo fácil acesso ao centro histórico e ao mar Adriático. Com design moderno e serviço atencioso, é a base perfeita para explorar a capital da Puglia.',
          highlight: 'Localização central em Bari, com fácil acesso ao centro histórico e ao mar.',
          images: [
            '/assets/experiences/italia/hotel-bari-2.jpg',
            '/assets/experiences/italia/hotel-bari-3.jpg',
            '/assets/experiences/italia/hotel-bari-4.jpg'
          ],
          includedServices: [
            'Café da manhã buffet',
            'Wi-Fi gratuito',
            'Recepção 24 horas',
            'Bar no rooftop',
            'Academia',
            'Estacionamento',
            'Transfer para aeroporto',
            'Guia local'
          ]
        }
      },
      highlights: {
        description: 'Bari é vibrante e autêntica, enquanto Polignano a Mare é simplesmente deslumbrante com suas falésias.',
        videos: undefined
      }
    },
    {
      id: 6,
      date: '12 de outubro',
      activity: 'Bari para Liège, Bélgica',
      image: '/assets/experiences/italia/bari-airport.jpg',
      description: 'Voo de Bari para Bruxelas, seguido de transfer para Liège, na Bélgica, encerrando nossa jornada pela Puglia.',
      hotel: {
        name: 'Hotel Liège Palace',
        description: 'Hotel histórico no centro de Liège, próximo à estação de trem e ao centro histórico.',
        image: '/assets/experiences/italia/hotel-liege.jpg',
        details: {
          description: 'O Hotel Liège Palace está localizado no coração histórico de Liège, oferecendo uma base perfeita para explorar esta encantadora cidade belga. Com arquitetura clássica e serviço refinado.',
          highlight: 'Localização histórica no centro de Liège, com fácil acesso às principais atrações.',
          images: [
            '/assets/experiences/italia/hotel-liege-2.jpg',
            '/assets/experiences/italia/hotel-liege-3.jpg',
            '/assets/experiences/italia/hotel-liege-4.jpg'
          ],
          includedServices: [
            'Café da manhã continental',
            'Wi-Fi gratuito',
            'Recepção 24 horas',
            'Restaurante no local',
            'Bar elegante',
            'Sala de conferências',
            'Estacionamento',
            'Transfer para estação'
          ]
        }
      },
      highlights: {
        description: 'A transição da ensolarada Puglia para a charmosa Liège marca o fim de uma jornada inesquecível.',
        videos: undefined
      }
    }
  ],
  accommodations: [
    {
      name: "Hotel Milano Scala",
      image: "/assets/experiences/italia/hotel-milano.jpg",
      dates: "5 de outubro",
      description: "Hotel boutique no centro histórico de Milão, próximo ao Duomo"
    },
    {
      name: "Trulli Resort & Spa",
      image: "/assets/experiences/italia/trulli-resort.jpg",
      dates: "6-9 de outubro",
      description: "Resort único com trulli tradicionais da Puglia"
    },
    {
      name: "Palazzo dei Dondoli",
      image: "/assets/experiences/italia/palazzo-lecce.jpg",
      dates: "9-10 de outubro",
      description: "Palazzo histórico no centro de Lecce, com arquitetura barroca"
    },
    {
      name: "Hotel Terranobile",
      image: "/assets/experiences/italia/hotel-bari.jpg",
      dates: "10-12 de outubro",
      description: "Hotel boutique em Bari, próximo ao centro histórico e ao mar Adriático"
    },
    {
      name: "Hotel Liège Palace",
      image: "/assets/experiences/italia/hotel-liege.jpg",
      dates: "12 de outubro",
      description: "Hotel histórico no centro de Liège, próximo à estação de trem"
    }
  ],
  flights: [
    {
      fromAirport: "Milão Centrale (MIL)",
      toAirport: "Alberobello (ALB)",
      airline: "Trenitalia",
      class: "Executiva",
      baggage: "Bagagem de mão + despachada",
      departureDate: "6 de outubro",
      departureTime: "08:00",
      arrivalTime: "17:00",
      flightNumber: "FR 1234"
    },
    {
      fromAirport: "Bari (BRI)",
      toAirport: "Bruxelas (BRU)",
      airline: "Ryanair",
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
      title: "Transfer",
      details: "Transfer privativo aeroporto-hotel-aeroporto em Milão e Bari"
    },
    {
      title: "Trem",
      details: "Passagem de trem executiva Milão-Alberobello (9 horas de viagem)"
    },
    {
      title: "Guia Local",
      details: "Guia local em italiano e inglês em todas as cidades"
    },
    {
      title: "Seguro Viagem",
      details: "Seguro completo com cobertura médica, bagagem e cancelamento (Allianz)"
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
      amount: 12990,
      currency: "R$"
    },
    {
      type: "bonus",
      title: "Evolved Experiências",
      amount: 0,
      currency: "R$",
      description: "Guia personalizado da viagem com roteiro detalhado",
      originalAmount: 3000
    }
  ],
  description: "Uma jornada inesquecível pela Puglia, o coração da Itália, incluindo hospedagem em trulli tradicionais, cidades históricas e experiências gastronômicas únicas. Ideal para viajantes que buscam autenticidade, cultura e sabores tradicionais italianos.",
  cta: {
    text: "Reservar com especialista",
    action: "https://wa.me/?text=Olá! Gostaria de reservar a viagem para Puglia, Itália."
  }
}; 