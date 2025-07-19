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
  id: "curacao-proposta",
  title: "Curaçao tem tudo que você imagina",
  dates: "11 a 20 de Março, 2025",
  travelers: "por Henrique Gasparotto",
  uniqueMoments: [
    {
      id: "klein-curacao",
      title: "Klein Curaçao",
      subtitle: "Paraíso intocado",
      description: "Uma ilha deserta com praias de areia branca e águas cristalinas. O lugar perfeito para mergulhar e relaxar em um ambiente completamente natural.",
      images: [
        "/assets/experiences/curacao/klein-curacao.png",
        "/assets/experiences/curacao/klein-curacao-2.png",
      ]
    },
    {
      id: "punda-otrobanda",
      title: "Punda & Otrobanda",
      subtitle: "Coração de Willemstad",
      description: "Os bairros históricos de Willemstad, Patrimônio Mundial da UNESCO. Passear pela ponte Rainha Emma é uma experiência única que conecta duas épocas.",
      images: [
        "/assets/experiences/curacao/punda-fort.png",
        "/assets/experiences/curacao/pietermaai-culture.png",
      ]
    },
    {
      id: "kenepa-lagun",
      title: "Kenepa & Playa Lagun",
      subtitle: "Praias espetaculares",
      description: "As praias mais bonitas de Curaçao. Kenepa Grandi com suas águas azuis e Playa Lagun perfeita para mergulhos com tartarugas.",
      images: [
        "/assets/experiences/curacao/kenepa-grandi.png",
        "/assets/experiences/curacao/cas-abao.png",
      ]
    }
  ],
  mapImage: "/assets/experiences/curacao/curacao-mapa.png",
  itinerary: [
    {
      id: 1,
      date: '11 de março',
      activity: 'Canal do Panamá e um pouquinho do Casco Viejo',
      image: '/assets/experiences/curacao/casco-viejo.png',
      description: 'O dia começou cedo, com a visita ao impressionante Canal do Panamá ainda pela manhã. À tarde, exploramos um pouco (ou muito) do Casco Viejo.',
      hotel: {
        name: 'Baluarte Boutique Hotel',
        description: 'Um hotel boutique simples e charmoso localizado no coração do Casco Viejo.',
        image: '/assets/experiences/curacao/hotel-baluarte.jpg',
        details: {
          description: 'O Baluarte Boutique Hotel é uma joia escondida no coração do Casco Viejo, Patrimônio Mundial da UNESCO. Com apenas 12 quartos exclusivos, oferece uma experiência íntima e autêntica em um edifício histórico cuidadosamente restaurado. Cada detalhe foi pensado para proporcionar conforto e charme, mantendo a atmosfera colonial que torna o local tão especial.',
          highlight: 'Localização privilegiada no coração do Casco Viejo, a apenas passos das principais atrações históricas e culturais da Cidade do Panamá.',
          images: [
            '/assets/experiences/curacao/hotel-baluarte-2.jpg',
            '/assets/experiences/curacao/hotel-baluarte-3.jpg',
            '/assets/experiences/curacao/hotel-baluarte-4.jpg'
          ],
          includedServices: [
            'Café da manhã continental incluído',
            'Wi-Fi gratuito em todas as áreas',
            'Recepção 24 horas',
            'Serviço de concierge',
            'Terraço com vista panorâmica',
            'Ar condicionado individual',
            'TV de tela plana',
            'Cofre no quarto'
          ]
        }
      },
      highlights: {
        description: 'O Canal do Panamá é sensacional e surpreendeu, mas o charme do Casco Viejo nos conquistou.',
        videos: undefined
      }
    },
    {
      id: 2,
      date: '12 de março',
      activity: 'Uma corridinha matinal pela Costanera e partiu centro!',
      image: '/assets/experiences/curacao/costanera.png',
      description: 'A experiência de correr pela Costanera foi muito legal! Tirando o cheiro em torno do mercado de peixes, é claro.',
      hotel: {
        name: 'AC Hotel by Marriott Panama City',
        description: 'Um hotel moderno com vista panorâmica da cidade, localizado no centro financeiro da Cidade do Panamá.',
        image: '/assets/experiences/curacao/ac-hotel-panama.jpg',
        details: {
          description: 'O AC Hotel by Marriott Panama City combina design contemporâneo com funcionalidade, oferecendo uma experiência sofisticada no coração do distrito financeiro. Com vistas deslumbrantes da cidade e do Canal do Panamá, o hotel é perfeito para viajantes que apreciam conforto moderno e localização estratégica.',
          highlight: 'Vistas panorâmicas do Canal do Panamá e da cidade moderna, com fácil acesso ao centro financeiro e comercial.',
          images: [
            '/assets/experiences/curacao/ac-hotel-panama-2.jpg',
            '/assets/experiences/curacao/ac-hotel-panama-3.jpg',
            '/assets/experiences/curacao/ac-hotel-panama-4.jpg'
          ],
          includedServices: [
            'Café da manhã buffet completo',
            'Wi-Fi de alta velocidade',
            'Academia 24 horas',
            'Piscina na cobertura',
            'Bar e restaurante',
            'Serviço de quarto',
            'Estacionamento',
            'Business center'
          ]
        }
      },
      highlights: {
        description: 'A estrutura da Costanera é incrível. Um lugar perfeito para um bom exercício matinal.',
        videos: undefined
      }
    },
    {
      id: 3,
      date: '13 de março',
      activity: 'Oi, Curaçao!',
      image: '/assets/experiences/curacao/oi-curacao.png',
      description: 'O primeiro contato com Curaçao foi quase um susto. Muita natureza e um mar espetacular!',
      hotel: {
        name: 'Coral Estate Luxury Resort',
        description: 'Um resort exclusivo à beira-mar, com uma vista privilegiada e acesso direto a uma praia paradisíaca e super tranquila.',
        image: '/assets/experiences/curacao/coral-estate.png',
        details: {
          description: 'O Coral Estate Luxury Resort é um refúgio paradisíaco localizado em um morro à beira-mar, oferecendo vistas deslumbrantes do Caribe. Com apenas 20 suítes exclusivas, o resort proporciona uma experiência íntima e luxuosa, combinando conforto moderno com a beleza natural de Curaçao.',
          highlight: 'Localização exclusiva em um morro à beira-mar, com acesso direto a uma praia privativa e vistas panorâmicas do Caribe.',
          images: [
            '/assets/experiences/curacao/coral-estate-2.png',
            '/assets/experiences/curacao/coral-estate-3.png',
            '/assets/experiences/curacao/coral-estate-4.png'
          ],
          includedServices: [
            'Café da manhã gourmet',
            'Wi-Fi premium',
            'Piscina infinita',
            'Spa e massagens',
            'Restaurante à la carte',
            'Bar na praia',
            'Atividades aquáticas',
            'Concierge personalizado'
          ]
        }
      },
      highlights: {
        description: 'A chegada no Coral Estate. O resort está aninhado em um morro à beira-mar, o que proporciona uma vista espetacular.',
        videos: undefined
      }
    }
  ],
  accommodations: [
    {
      name: "Baluarte Boutique Hotel",
      image: "/assets/experiences/curacao/hotel-baluarte.jpg",
      dates: "11-12 de março",
      description: "Hotel boutique simples e charmoso localizado no coração do Casco Viejo"
    },
    {
      name: "AC Hotel by Marriott Panama City",
      image: "/assets/experiences/curacao/ac-hotel-panama.jpg",
      dates: "12-13 de março",
      description: "Hotel moderno com vista panorâmica da cidade, localizado no centro financeiro"
    },
    {
      name: "Coral Estate Luxury Resort",
      image: "/assets/experiences/curacao/coral-estate.png",
      dates: "13-20 de março",
      description: "Resort exclusivo à beira-mar com vista privilegiada e acesso direto à praia"
    }
  ],
  flights: [
    {
      fromAirport: "São Paulo (GRU)",
      toAirport: "Cidade do Panamá (PTY)",
      airline: "Latam Airlines",
      class: "Econômica",
      baggage: "23kg despachada",
      departureDate: "11 de março",
      departureTime: "08:30",
      arrivalTime: "14:45",
      flightNumber: "LA 808"
    },
    {
      fromAirport: "Cidade do Panamá (PTY)",
      toAirport: "Curaçao (CUR)",
      airline: "Copa Airlines",
      class: "Econômica",
      baggage: "23kg despachada",
      departureDate: "13 de março",
      departureTime: "10:15",
      arrivalTime: "13:30",
      flightNumber: "CM 201"
    },
    {
      fromAirport: "Curaçao (CUR)",
      toAirport: "São Paulo (GRU)",
      airline: "Latam Airlines",
      class: "Econômica",
      baggage: "23kg despachada",
      departureDate: "20 de março",
      departureTime: "16:20",
      arrivalTime: "22:35",
      flightNumber: "LA 809"
    }
  ],
  otherInclusions: [
    {
      title: "Transfer",
      details: "Transfer privativo aeroporto-hotel-aeroporto em Curaçao"
    },
    {
      title: "Seguro Viagem",
      details: "Seguro completo com cobertura médica, bagagem e cancelamento (Intermac)"
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
  description: "Uma experiência completa de 10 dias em Curaçao, incluindo hospedagem premium, passeios exclusivos e momentos únicos que você nunca esquecerá. Ideal para casais ou grupos pequenos que buscam uma viagem personalizada e autêntica.",
  cta: {
    text: "Reservar com especialista",
    action: "https://wa.me/?text=Olá! Gostaria de reservar a viagem para Curaçao."
  }
}; 