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
    description: 'Uma jornada incrível por Curaçao, uma ilha que é muito mais que só praias e resorts! Além de uma passadinha rápida pelos encantos da Cidade do Panamá.',
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
        description: 'O dia começou cedo, com a visita ao impressionante Canal do Panamá ainda pela manhã. À tarde, exploramos um pouco (ou muito) do Casco Viejo.',
        hotel: 'Baluarte Boutique Hotel',
        highlights: {
          description: 'O Canal do Panamá é sensacional e surpreendeu, mas o charme do Casco Viejo nos conquistou.',
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
        activity: 'Uma corridinha matinal pela Costanera e partiu centro!',
        image: '/assets/experiences/panama-city.jpg',
        description: 'A experiência de correr pela Costanera foi muito legal! Tirando o cheiro em torno do mercado de peixes, é claro.',
        hotel: 'AC Hotel by Marriott Panama City',
        highlights: {
          description: 'A estrutura da Costanera é incrível. Um lugar perfeito para um bom exercício matinal.',
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
        description: 'O primeiro contato com Curaçao foi quase um susto. Muita natureza e um mar espetacular!',
        hotel: 'Coral Estate Luxury Resort',
        highlights: {
          description: 'A chegada no Coral Estate. O resort está aninhado em um morro à beira-mar, o que proporciona uma vista espetacular.',
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
        description: 'O norte de Curaçao tem ilhas que são espetáculos e Cas Abao e Porto Marie não poderiam ser deixadas de fora.',
        hotel: 'Coral Estate Luxury Resort',
        highlights: {
          description: 'O jantar ao pôr do sol, no Karakter, foi uma experiência incrível. A comida e o atendimento, impecáveis, mas a paisagem é o que faz toda a diferença.',
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
        description: 'A Playa Lagun foi a maior surpresa da viagem. Que lugar: água mais profunda, perfeita para mergulhos, mas com um mar tranquilo demais!',
        hotel: 'Lagun Blou Resort',
        highlights: {
          description: 'E a vista do Lagun Blou Resort foi uma surpresa muito positiva. Que lugar!',
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
        description: 'Desde o começo, sabíamos que queríamos conhecer Willemstad, viver a cultura. E já começamos bem, ficando muito bem localizado em Pietermaai.',
        hotel: 'Pietermaai Boutique Hotel',
        highlights: {
          description: 'O bairro histórico de Pietermaai é muito vibrante e tem tudo pertinho.',
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
        description: 'Punda e Otrobanda, o coração de Willemstad. Atravessar a ponte Rainha Emma é uma experiência incrível. Dá até pra ver o pessoal correndo quando o sino toca!',
        hotel: 'Pietermaai Boutique Hotel',
        highlights: {
          description: 'Otrobanda tem alguns lugares incríveis, como a Kura Hulanda Village, que tem um centro comercial muito charmoso e com restaurantes ótimos.',
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
        description: 'Imperdível: Klein Curaçao merece cada segundo da visita. É natureza quase intocada.',
        hotel: 'Pietermaai Boutique Hotel',
        highlights: {
          description: 'O ponto alto tem que ser Klein Curaçao, certo?',
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
        description: 'O dia de passear pela manhã, comprar as últimas lembrancinhas e, claro, relaxamento no hotel, aproveitando as últimas horas em Curaçao.',
        hotel: 'Pietermaai Boutique Hotel',
        highlights: {
          description: 'Curtir a piscina do hotel!',
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
    title: 'A Califórnia que poucos falam',
    dates: '24 a 31 de maio, 2024',
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
        activity: 'LA só de passagem',
        image: '/assets/experiences/la-skyline.jpg',
        description: 'O dia em Los Angeles foi só de passagem, mas com uma chegada no Observatório Griffith antes de partir rumo a Morro Bay.',
        hotel: 'Holland Inn & Suites',
        highlights: {
          description: 'A viagem era o atrativo do dia: o Observatório Griffith para começar. Depois, Highway 1, Topanga State Park e paisagens incríveis pela Los Padres National Forest.',
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
        activity: 'Uma manhã única em Morro Bay e partiu rumo Fresno',
        image: '/assets/experiences/santa-barbara.jpg',
        description: 'A manhã em Morro Bay foi incrível. A cidadezinha é muito tranquila, com a vista para a Morro Rock sendo um show à parte.',
        hotel: 'Hotel Picadilly',
        highlights: {
          description: 'Morro Bay. Uma parada um tanto aleatória na nossa viagem, mas foi muito legal conhecer um pouco mais do estilo por lá. Completamente diferente de tudo que vemos nos filmes, que normalmente se passam em LA ou San Francisco.',
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
        activity: 'Sequoia & Kings Canyon - Que lugar! E para fechar, Yosemite no fim da tarde',
        image: '/assets/experiences/big-sur.jpg',
        description: 'Fresno é a porta de entrada para alguns dos parques nacionais mais impressionantes dos EUA: Sequoia & Kings Canyon e o mundialmente famoso Yosemite National Park. Os lugares valem cada segundo da visita.',
        hotel: 'Fairfield Inn & Suites Oakhurst Yosemite',
        highlights: {
          description: 'A manhã começou por visitar as Sequoias e elas fazem você se sentir pequeno. Natureza pura! Mas o ponto alto do alto foi a vista de El Capitan no fim do dia, já em Yosemite. Sensacional!',
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
        activity: 'Yosemite e ponto final',
        image: '/assets/experiences/monterey.jpg',
        description: 'Sabíamos que Yosemite merecia mais do que uma visita rápida de fim de dia e não nos decepcionamos. É um espetáculo atrás do outro.',
        hotel: 'Fairfield Inn & Suites Oakhurst Yosemite',
        highlights: {
          description: 'Queríamos uma trilha tranquila - mas erramos a curva e não foi tão tranquilo. A compensação foi chegarmos ao topo da Vernal Fall e ao Clark Point: são realmente espetaculares. Depois, descobrimos que pegamos a John Muir Trail.',
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
        activity: 'Lake Tahoe - (quase) ainda na Califórnia!',
        image: '/assets/experiences/napa-valley.jpg',
        description: 'Um pouco mais ao norte, Lake Tahoe é uma das maravilhas naturais da Califórnia. Partimos cedo de Oakhurst, passamos pela Eldorado National Forest e chegamos em South Lake Tahoe, nossa base para conhecer esse lugar lindo.',
        hotel: 'Station House Inn',
        highlights: {
          description: 'Passar ao lado de Nevada e achar um cantinho lindo, cheio de pedras, para só curtir a vista do lago.',
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
        activity: 'Dia de praia em Tahoe!',
        image: '/assets/experiences/sonoma.jpg',
        description: 'Num cantinho pertinho de Kings Beach, descobrimos uma praia tranquila para relaxar e curtir o dia. O que dizer da água: gelada, muito gelada! Mas tínhamos que mergulhar um pouco, certo?',
        hotel: 'Station House Inn',
        highlights: {
          description: 'Ponto alto também para Emerald Bay, um cantinho do lago com uma vista espetacular para uma ilhota, que cria um cenário lindo.',
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
        description: 'A chegada em São Francisco tinha que ser pela Golden Gate Bridge, certo? Fizemos questão que nosso caminho nos trouxesse por lá.',
        hotel: 'The Donatello',
        highlights: {
          description: 'Estávamos muito bem localizados, pertinho de Union Square e dos principais pontos. O Ferry Building foi o ponto alto do dia, com direito a empanada argentina!',
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
        activity: 'Piers, muitos piers. E, claro, Alcatraz!',
        image: '/assets/experiences/sf-streets.jpg',
        description: 'São Francisco oferece muitas vistas da Baía, e tínhamos que aproveitar. Coit Tower, Palace of Fine Arts... Mas, principalmente, os piers em torno do Fisherman\'s Wharf.',
        hotel: 'The Donatello',
        highlights: {
          description: 'A viagem para Alcatraz foi uma das mais legais de toda a viagem. A experiência toda, com as histórias contadas lá dentro, vale muito a pena. E as vistas do trajeto de barco...',
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