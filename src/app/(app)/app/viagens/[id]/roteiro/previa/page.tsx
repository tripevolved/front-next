'use client'

import { ScriptPreviewPage } from '@/components/scripts/ScriptPreviewPage'
import { Script, UniqueMoment } from '@/components/scripts/types'

export default function RoteirosPreviaPage() {
  const uniqueMoment: UniqueMoment = {
    id: '1',
    title: 'Experiência Gastronômica Única',
    description: 'Jantar em um restaurante local autêntico com vista para o mar, onde você poderá saborear pratos tradicionais preparados com ingredientes frescos da região. Uma experiência que combina a culinária local com uma atmosfera inesquecível.',
    icon: '🍽️'
  }

  const script: Script = {
    startDate: '2024-06-15',
    endDate: '2024-06-20',
    days: [
      {
        dayNumber: 1,
        isAvailable: true,
        dayActions: [
          {
            id: '1',
            image: '/assets/blank-image.png',
            title: 'Torre Eiffel',
            subtitle: 'Visita Matinal',
            description: 'Comece o dia com uma visita à Torre Eiffel no horário da abertura, evitando as longas filas. Aproveite a vista panorâmica da cidade e tire fotos incríveis com a luz da manhã.',
            time: '08:00 - 10:00',
            location: 'Champ de Mars, Paris',
            highlights: [
              'Vista panorâmica de 360° de Paris',
              'Evite as longas filas da manhã',
              'Fotos incríveis com luz natural',
              'Experiência exclusiva no topo'
            ],
            gallery: [
              '/assets/blank-image.png',
              '/assets/blank-image.png',
              '/assets/blank-image.png'
            ]
          },
          {
            id: '2',
            image: '/assets/blank-image.png',
            title: 'Museu do Louvre',
            subtitle: 'Arte e História',
            description: 'Explore as principais obras do Louvre, incluindo a Mona Lisa e a Vênus de Milo. Reserve tempo para admirar a arquitetura do palácio e os jardins.',
            time: '10:30 - 13:00',
            location: 'Rue de Rivoli, Paris',
            highlights: [
              'Mona Lisa e obras-primas renascentistas',
              'Arquitetura histórica do palácio',
              'Jardins des Tuileries',
              'Guia especializado em arte'
            ],
            gallery: [
              '/assets/blank-image.png',
              '/assets/blank-image.png',
              '/assets/blank-image.png'
            ]
          },
          {
            id: '3',
            image: '/assets/blank-image.png',
            title: 'Notre-Dame',
            subtitle: 'Arquitetura Gótica',
            description: 'Visite a icônica catedral gótica e admire os vitrais coloridos. Suba as torres para uma vista única da cidade e dos gárgulas.',
            time: '14:00 - 16:00',
            location: 'Île de la Cité, Paris',
            highlights: [
              'Vitrais coloridos medievais',
              'Vista dos gárgulas das torres',
              'Arquitetura gótica impressionante',
              'História centenária da catedral'
            ],
            gallery: [
              '/assets/blank-image.png',
              '/assets/blank-image.png',
              '/assets/blank-image.png'
            ]
          },
          {
            id: '4',
            image: '/assets/blank-image.png',
            title: 'Cruzeiro no Sena',
            subtitle: 'Paris pelo Rio',
            description: 'Relaxe em um cruzeiro pelo rio Sena, passando pelos principais monumentos da cidade. Perfeito para o final da tarde.',
            time: '16:30 - 18:00',
            location: 'Rio Sena, Paris',
            highlights: [
              'Vista dos monumentos pelo rio',
              'Experiência relaxante no final da tarde',
              'Comentários em português',
              'Bebidas e aperitivos incluídos'
            ],
            gallery: [
              '/assets/blank-image.png',
              '/assets/blank-image.png',
              '/assets/blank-image.png'
            ]
          }
        ]
      },
      {
        dayNumber: 2,
        isAvailable: false,
        dayActions: []
      },
      {
        dayNumber: 3,
        isAvailable: false,
        dayActions: []
      },
      {
        dayNumber: 4,
        isAvailable: false,
        dayActions: []
      },
      {
        dayNumber: 5,
        isAvailable: false,
        dayActions: []
      },
      {
        dayNumber: 6,
        isAvailable: false,
        dayActions: []
      }
    ]
  }

  return (
    <ScriptPreviewPage
      script={script}
      uniqueMoment={uniqueMoment}
      videoPlaybackId="your-mux-playback-id-here"
      videoTitle="Paris - Cidade Luz"
    />
  )
} 