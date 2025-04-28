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
      },
      {
        day: 2,
        date: '12 de março',
        activity: 'A corrida da manhã pela Costanera e centro financeiro',
      },
      {
        day: 3,
        date: '13 de março',
        activity: 'Oi, Curaçao!',
      },
      {
        day: 4,
        date: '14 de março',
        activity: 'Cas Abao, Porto Marie e um pôr do sol a dois',
      },
      {
        day: 5,
        date: '15 de março',
        activity: 'Oi, Kenepas! Oi, Playa Lagun!',
      },
      {
        day: 6,
        date: '16 de março',
        activity: 'Partiu Pietermaai',
      },
      {
        day: 7,
        date: '17 de março',
        activity: 'Punda, Otrobanda e uma cultura única!',
      },
      {
        day: 8,
        date: '18 de março',
        activity: 'Klein Curaçao: que paraíso!',
      },
      {
        day: 9,
        date: '19 de março',
        activity: 'Últimos passeios e curtir o hotel',
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
      },
      {
        day: 2,
        date: '11/04',
        activity: 'Passeio de jangada em Maragogi',
      },
      {
        day: 3,
        date: '12/04',
        activity: 'Visita às piscinas naturais de São Miguel dos Campos',
      },
      {
        day: 4,
        date: '13/04',
        activity: 'Tour de buggy nas dunas de Maranhão',
      },
      {
        day: 5,
        date: '14/04',
        activity: 'Passeio de catamarã em Porto de Galinhas',
      },
      {
        day: 6,
        date: '15/04',
        activity: 'Visita ao centro histórico de Olinda',
      },
      {
        day: 7,
        date: '16/04',
        activity: 'Dia livre para relaxamento na praia',
      },
      {
        day: 8,
        date: '17/04',
        activity: 'Retorno para Recife e voo de volta',
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
        date: '10/04',
        activity: 'Chegada em Recife e transfer para Maceió',
      },
      {
        day: 2,
        date: '11/04',
        activity: 'Passeio de jangada em Maragogi',
      },
      {
        day: 3,
        date: '12/04',
        activity: 'Visita às piscinas naturais de São Miguel dos Campos',
      },
      {
        day: 4,
        date: '13/04',
        activity: 'Tour de buggy nas dunas de Maranhão',
      },
      {
        day: 5,
        date: '14/04',
        activity: 'Passeio de catamarã em Porto de Galinhas',
      },
      {
        day: 6,
        date: '15/04',
        activity: 'Visita ao centro histórico de Olinda',
      },
      {
        day: 7,
        date: '16/04',
        activity: 'Dia livre para relaxamento na praia',
      },
      {
        day: 8,
        date: '17/04',
        activity: 'Retorno para Recife e voo de volta',
      },
    ],
  },
]

export function getExperienceByName(name: string): Experience | null {
  return mockExperiences.find(exp => exp.name === name) || null
} 