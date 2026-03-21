import type { Metadata } from 'next'
import { Comfortaa, Baloo_2 } from 'next/font/google'
import '@/main.css'
import { TravelerStateBootstrap } from '@/components/app/TravelerStateBootstrap'
import { TravelerStateGate } from '@/components/app/TravelerStateGate'

const comfortaa = Comfortaa({ 
  subsets: ['latin'],
  variable: '--font-comfortaa',
})

const baloo = Baloo_2({ 
  subsets: ['latin'],
  variable: '--font-baloo',
})

export const metadata: Metadata = {
  title: 'Trip Evolved',
  description: 'Cruzeiros de luxo & viagens extraordinárias.',
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${comfortaa.variable} ${baloo.variable} font-comfortaa antialiased bg-white text-gray-900`}>
        <TravelerStateBootstrap />
        <TravelerStateGate>{children}</TravelerStateGate>
      </body>
    </html>
  )
} 