export interface Experience {
  name: string
  title: string
  dates: string
  travelers: string
  description: string
  images: string[]
  itinerary: {
    day: number
    date: string
    activity: string
    image: string
    description: string
    hotel: string
    highlights: {
      description: string
      videos: string[]
    }
  }[]
}

export const mockExperiences: Experience[] = [
  {
    name: 'curacao',
    title: 'Curaçao tem tudo que você imagina',
    dates: '11 a 20 de Março, 2025',
    travelers: 'por Henrique Gasparotto',
    description: 'Uma jornada incrível pela ilha de Curaçao, com relaxamento, cultura e praias maravilhosas! Além de uma passadinha rápida pelos encantos da Cidade do Panamá.',
    images: [
      '/assets/experiences/wine-route-1.jpg',
      '/assets/experiences/wine-route-2.jpg',
      '/assets/experiences/wine-route-3.jpg',
    ],
    itinerary: [
      {
        day: 1,
        date: '11 de março',
        activity: 'Canal do Panamá e um pouquinho do Casco Viejo',
        image: '/assets/experiences/panama-canal.jpg',
        description: 'Primeiro dia na Cidade do Panamá, com visita ao impressionante Canal do Panamá e exploração do histórico bairro de Casco Viejo.',
        hotel: 'W Panama',
        highlights: {
          description: 'Conheça o Canal do Panamá, uma das obras de engenharia mais impressionantes do mundo, e explore o charmoso bairro colonial de Casco Viejo.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 2,
        date: '12 de março',
        activity: 'A corrida da manhã pela Costanera e centro financeiro',
        image: '/assets/experiences/panama-city.jpg',
        description: 'Uma corrida matinal pela Costanera, seguida de um tour pelo moderno centro financeiro da cidade.',
        hotel: 'W Panama',
        highlights: {
          description: 'Exercite-se com vista para o mar na Costanera e descubra os arranha-céus do centro financeiro de Panamá.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 3,
        date: '13 de março',
        activity: 'Oi, Curaçao!',
        image: '/assets/experiences/curacao-arrival.jpg',
        description: 'Chegada em Curaçao e primeiro contato com a ilha caribenha.',
        hotel: 'Sandals Royal Curaçao',
        highlights: {
          description: 'Chegue à ilha de Curaçao e comece a explorar suas praias e cultura única.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 4,
        date: '14 de março',
        activity: 'Cas Abao, Porto Marie e um pôr do sol a dois',
        image: '/assets/experiences/cas-abaou.jpg',
        description: 'Visita às praias de Cas Abao e Porto Marie, seguidas de um romântico pôr do sol.',
        hotel: 'Sandals Royal Curaçao',
        highlights: {
          description: 'Explore as praias de Cas Abao e Porto Marie, conhecidas por suas águas cristalinas e vida marinha abundante.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 5,
        date: '15 de março',
        activity: 'Oi, Kenepas! Oi, Playa Lagun!',
        image: '/assets/experiences/kenepa-beach.jpg',
        description: 'Visita às praias de Kenepa e Playa Lagun, algumas das mais bonitas de Curaçao.',
        hotel: 'Sandals Royal Curaçao',
        highlights: {
          description: 'Descubra as praias de Kenepa e Playa Lagun, com suas águas azuis e paisagens deslumbrantes.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 6,
        date: '16 de março',
        activity: 'Partiu Pietermaai',
        image: '/assets/experiences/pietermaai.jpg',
        description: 'Exploração do bairro histórico de Pietermaai, com suas casas coloridas e restaurantes.',
        hotel: 'Sandals Royal Curaçao',
        highlights: {
          description: 'Conheça o bairro histórico de Pietermaai, com sua arquitetura colonial e vibrante vida noturna.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 7,
        date: '17 de março',
        activity: 'Punda, Otrobanda e uma cultura única!',
        image: '/assets/experiences/punda-otrobanda.jpg',
        description: 'Tour pelos bairros históricos de Punda e Otrobanda, o coração de Willemstad.',
        hotel: 'Sandals Royal Curaçao',
        highlights: {
          description: 'Explore os bairros históricos de Punda e Otrobanda, separados pela famosa Ponte da Rainha Emma.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 8,
        date: '18 de março',
        activity: 'Klein Curaçao: que paraíso!',
        image: '/assets/experiences/klein-curacao.jpg',
        description: 'Excursão à ilha deserta de Klein Curaçao, um verdadeiro paraíso tropical.',
        hotel: 'Sandals Royal Curaçao',
        highlights: {
          description: 'Visite a ilha deserta de Klein Curaçao, com suas praias intocadas e farol histórico.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 9,
        date: '19 de março',
        activity: 'Últimos passeios e curtir o hotel',
        image: '/assets/experiences/sandals-royal.jpg',
        description: 'Dia de relaxamento no resort, aproveitando as últimas horas em Curaçao.',
        hotel: 'Sandals Royal Curaçao',
        highlights: {
          description: 'Aproveite as instalações do resort Sandals Royal Curaçao e faça seus últimos passeios pela ilha.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
    ],
  },
  {
    name: 'praias-nordeste',
    title: 'Praias do Nordeste',
    dates: '10 a 17 de Abril, 2024',
    travelers: 'Carlos e Maria Oliveira',
    description: 'Do Recife a Maceió, descubra as águas cristalinas e praias paradisíacas do litoral nordestino.',
    images: [
      '/assets/experiences/northeast-1.jpg',
      '/assets/experiences/northeast-2.jpg',
      '/assets/experiences/northeast-3.jpg',
    ],
    itinerary: [
      {
        day: 1,
        date: '10/04',
        activity: 'Chegada em Recife e transfer para Maceió',
        image: '/assets/experiences/recife-arrival.jpg',
        description: 'Chegada em Recife, recepção no aeroporto e transfer para Maceió, onde começaremos nossa jornada pelo litoral nordestino.',
        hotel: 'Hotel Ponta Verde',
        highlights: {
          description: 'Conheça o centro histórico de Maceió e aproveite o pôr do sol na Praia de Ponta Verde.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 2,
        date: '11/04',
        activity: 'Passeio de jangada em Maragogi',
        image: '/assets/experiences/maragogi-jangada.jpg',
        description: 'Visita às piscinas naturais de Maragogi, conhecidas como Galés, com passeio de jangada e snorkeling.',
        hotel: 'Hotel Ponta Verde',
        highlights: {
          description: 'Explore as piscinas naturais de Maragogi, com suas águas cristalinas e vida marinha colorida.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 3,
        date: '12/04',
        activity: 'Visita às piscinas naturais de São Miguel dos Campos',
        image: '/assets/experiences/sao-miguel-piscinas.jpg',
        description: 'Tour pelas piscinas naturais de São Miguel dos Campos, com parada para banho e almoço regional.',
        hotel: 'Hotel Ponta Verde',
        highlights: {
          description: 'Descubra as piscinas naturais de São Miguel dos Campos, um paraíso escondido no litoral alagoano.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 4,
        date: '13/04',
        activity: 'Tour de buggy nas dunas de Maranhão',
        image: '/assets/experiences/dunas-buggy.jpg',
        description: 'Aventura de buggy pelas dunas de Maranhão, com paradas para banho nas lagoas e pôr do sol inesquecível.',
        hotel: 'Hotel Ponta Verde',
        highlights: {
          description: 'Explore as dunas de Maranhão de buggy, com suas lagoas cristalinas e paisagens deslumbrantes.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 5,
        date: '14/04',
        activity: 'Passeio de catamarã em Porto de Galinhas',
        image: '/assets/experiences/porto-galinhas.jpg',
        description: 'Navegação de catamarã em Porto de Galinhas, com parada para snorkeling nas piscinas naturais.',
        hotel: 'Hotel Ponta Verde',
        highlights: {
          description: 'Navegue de catamarã em Porto de Galinhas, conhecida por suas piscinas naturais e águas cristalinas.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 6,
        date: '15/04',
        activity: 'Visita ao centro histórico de Olinda',
        image: '/assets/experiences/olinda-historic.jpg',
        description: 'Tour pelo centro histórico de Olinda, com suas igrejas barrocas, casas coloridas e vista panorâmica do Recife.',
        hotel: 'Hotel Ponta Verde',
        highlights: {
          description: 'Explore o centro histórico de Olinda, Patrimônio Cultural da Humanidade pela UNESCO, com sua arquitetura colonial e cultura rica.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 7,
        date: '16/04',
        activity: 'Dia livre para relaxamento na praia',
        image: '/assets/experiences/beach-relax.jpg',
        description: 'Dia livre para relaxar na praia, aproveitar o sol e as águas quentes do Nordeste.',
        hotel: 'Hotel Ponta Verde',
        highlights: {
          description: 'Aproveite um dia de relaxamento nas praias paradisíacas do Nordeste, com suas águas quentes e areias brancas.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 8,
        date: '17/04',
        activity: 'Retorno para Recife e voo de volta',
        image: '/assets/experiences/recife-departure.jpg',
        description: 'Transfer para o aeroporto de Recife e voo de retorno, levando na bagagem memórias inesquecíveis do Nordeste.',
        hotel: 'Hotel Ponta Verde',
        highlights: {
          description: 'Últimas compras de artesanato local e despedida do Nordeste, com suas praias paradisíacas e cultura rica.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
    ],
  },
  {
    name: 'california-b',
    title: 'O lado B da Califórnia',
    dates: '24 de maio a 1º de junho, 2024',
    travelers: 'por Henrique Gasparotto',
    description: 'A road trip para curtir o melhor das paisagens californianas, saindo de Los Angeles e chegando em San Francisco - mas de um jeito diferente.',
    images: [
      '/assets/experiences/northeast-1.jpg',
      '/assets/experiences/northeast-2.jpg',
      '/assets/experiences/northeast-3.jpg',
    ],
    itinerary: [
      {
        day: 1,
        date: '24 de maio',
        activity: 'Los Angeles - A cidade dos sonhos',
        image: '/assets/experiences/la-skyline.jpg',
        description: 'Chegada em Los Angeles e primeiro contato com a cidade dos sonhos.',
        hotel: 'The Hollywood Roosevelt',
        highlights: {
          description: 'Explore os pontos turísticos de Los Angeles, incluindo Hollywood, Beverly Hills e Santa Monica.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 2,
        date: '25 de maio',
        activity: 'Santa Barbara e o caminho do vinho',
        image: '/assets/experiences/santa-barbara.jpg',
        description: 'Visita à charmosa Santa Barbara e às vinícolas da região.',
        hotel: 'The Ritz-Carlton Bacara',
        highlights: {
          description: 'Conheça Santa Barbara, conhecida como a Riviera Americana, e suas vinícolas.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 3,
        date: '26 de maio',
        activity: 'Big Sur - A costa mais bonita dos EUA',
        image: '/assets/experiences/big-sur.jpg',
        description: 'Dirigindo pela espetacular Highway 1, passando por Big Sur.',
        hotel: 'Post Ranch Inn',
        highlights: {
          description: 'Explore a deslumbrante costa de Big Sur, com suas falésias e pontes icônicas.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 4,
        date: '27 de maio',
        activity: 'Monterey e Carmel-by-the-Sea',
        image: '/assets/experiences/monterey.jpg',
        description: 'Visita ao Aquário de Monterey e à charmosa Carmel-by-the-Sea.',
        hotel: 'The Lodge at Pebble Beach',
        highlights: {
          description: 'Explore o famoso Aquário de Monterey e a encantadora cidade de Carmel-by-the-Sea.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 5,
        date: '28 de maio',
        activity: 'Napa Valley - O paraíso dos vinhos',
        image: '/assets/experiences/napa-valley.jpg',
        description: 'Tour pelas vinícolas de Napa Valley, uma das regiões vinícolas mais famosas do mundo.',
        hotel: 'Auberge du Soleil',
        highlights: {
          description: 'Deguste os melhores vinhos de Napa Valley e explore suas paisagens deslumbrantes.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 6,
        date: '29 de maio',
        activity: 'Sonoma - A irmã mais tranquila de Napa',
        image: '/assets/experiences/sonoma.jpg',
        description: 'Exploração da região de Sonoma, conhecida por seus vinhos e paisagens bucólicas.',
        hotel: 'Farmhouse Inn',
        highlights: {
          description: 'Descubra a região de Sonoma, com suas vinícolas menos turísticas e paisagens rurais.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 7,
        date: '30 de maio',
        activity: 'São Francisco - A cidade da baía',
        image: '/assets/experiences/san-francisco.jpg',
        description: 'Chegada em São Francisco e primeiro contato com a cidade da baía.',
        hotel: 'The St. Regis San Francisco',
        highlights: {
          description: 'Explore os pontos turísticos de São Francisco, incluindo a Golden Gate Bridge e Alcatraz.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 8,
        date: '31 de maio',
        activity: 'São Francisco - Explorando a cidade',
        image: '/assets/experiences/sf-streets.jpg',
        description: 'Tour completo por São Francisco, incluindo seus bairros mais famosos.',
        hotel: 'The St. Regis San Francisco',
        highlights: {
          description: 'Conheça os bairros de São Francisco, como Chinatown, Fisherman\'s Wharf e Haight-Ashbury.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 9,
        date: '1º de junho',
        activity: 'Últimos passeios e despedida',
        image: '/assets/experiences/sf-golden-gate.jpg',
        description: 'Último dia em São Francisco, com passeios finais e despedida da Califórnia.',
        hotel: 'The St. Regis San Francisco',
        highlights: {
          description: 'Aproveite seus últimos momentos em São Francisco antes de partir.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
    ],
  },
  {
    name: 'nordeste-praias',
    title: 'Paraíso Nordestino: Recife, Carneiros, São Miguel e Maragogi',
    dates: '15 a 22 de Agosto, 2024',
    travelers: 'por Ana Beatriz Silva',
    description: 'Uma jornada pelas praias mais deslumbrantes do Nordeste brasileiro, começando e terminando em Recife, com paradas em Praia dos Carneiros, São Miguel dos Milagres e Maragogi.',
    images: [
      '/assets/experiences/northeast-beach-1.jpg',
      '/assets/experiences/northeast-beach-2.jpg',
      '/assets/experiences/northeast-beach-3.jpg',
    ],
    itinerary: [
      {
        day: 1,
        date: '15 de agosto',
        activity: 'Chegada em Recife e transfer para Praia dos Carneiros',
        image: '/assets/experiences/recife-arrival.jpg',
        description: 'Chegada em Recife, recepção no aeroporto e transfer para Praia dos Carneiros, uma das praias mais bonitas do Brasil.',
        hotel: 'Pousada dos Carneiros',
        highlights: {
          description: 'Aproveite o pôr do sol na Praia dos Carneiros e conheça o famoso Farol de Carneiros, um dos cartões-postais da região.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 2,
        date: '16 de agosto',
        activity: 'Passeio de jangada e piscinas naturais em Carneiros',
        image: '/assets/experiences/carneiros-jangada.jpg',
        description: 'Passeio de jangada pelas piscinas naturais de Carneiros, com parada para snorkeling e almoço regional.',
        hotel: 'Pousada dos Carneiros',
        highlights: {
          description: 'Explore as piscinas naturais de Carneiros, com suas águas cristalinas e vida marinha colorida.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 3,
        date: '17 de agosto',
        activity: 'Transfer para São Miguel dos Milagres',
        image: '/assets/experiences/sao-miguel-transfer.jpg',
        description: 'Transfer para São Miguel dos Milagres, conhecido por suas praias intocadas e águas cristalinas.',
        hotel: 'Pousada São Miguel',
        highlights: {
          description: 'Chegue a São Miguel dos Milagres e aproveite o restante do dia para relaxar na praia e conhecer a vila.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 4,
        date: '18 de agosto',
        activity: 'Passeio de buggy pelas praias de São Miguel',
        image: '/assets/experiences/sao-miguel-buggy.jpg',
        description: 'Tour de buggy pelas praias de São Miguel dos Milagres, incluindo Praia do Toque, Praia do Riacho e Praia do Patacho.',
        hotel: 'Pousada São Miguel',
        highlights: {
          description: 'Explore as praias intocadas de São Miguel dos Milagres de buggy, com paradas para banho e fotos.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 5,
        date: '19 de agosto',
        activity: 'Visita às piscinas naturais de São Miguel',
        image: '/assets/experiences/sao-miguel-piscinas.jpg',
        description: 'Visita às piscinas naturais de São Miguel dos Milagres, com passeio de jangada e snorkeling.',
        hotel: 'Pousada São Miguel',
        highlights: {
          description: 'Descubra as piscinas naturais de São Miguel dos Milagres, um paraíso escondido no litoral alagoano.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 6,
        date: '20 de agosto',
        activity: 'Transfer para Maragogi',
        image: '/assets/experiences/maragogi-transfer.jpg',
        description: 'Transfer para Maragogi, conhecido por suas piscinas naturais, as Galés, e suas águas cristalinas.',
        hotel: 'Hotel Maragogi',
        highlights: {
          description: 'Chegue a Maragogi e aproveite o restante do dia para relaxar na praia e conhecer a cidade.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 7,
        date: '21 de agosto',
        activity: 'Passeio de jangada nas Galés de Maragogi',
        image: '/assets/experiences/maragogi-galés.jpg',
        description: 'Passeio de jangada nas Galés de Maragogi, com parada para snorkeling e almoço regional.',
        hotel: 'Hotel Maragogi',
        highlights: {
          description: 'Explore as Galés de Maragogi, piscinas naturais formadas por recifes de corais, com águas cristalinas e vida marinha colorida.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
      {
        day: 8,
        date: '22 de agosto',
        activity: 'Retorno para Recife e voo de volta',
        image: '/assets/experiences/recife-departure.jpg',
        description: 'Transfer para o aeroporto de Recife e voo de retorno, levando na bagagem memórias inesquecíveis do Nordeste.',
        hotel: 'Hotel Maragogi',
        highlights: {
          description: 'Últimas compras de artesanato local e despedida do Nordeste, com suas praias paradisíacas e cultura rica.',
          videos: [
            '/assets/videos/placeholder-1.mp4',
            '/assets/videos/placeholder-2.mp4',
            '/assets/videos/placeholder-3.mp4'
          ]
        }
      },
    ],
  },
]

export function getExperienceByName(name: string): Experience | null {
  return mockExperiences.find(exp => exp.name === name) || null
} 