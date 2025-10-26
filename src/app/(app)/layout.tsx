import type { Metadata } from 'next'
import { Comfortaa, Baloo_2 } from 'next/font/google'
import '@/main.css'
import { AppLayoutContent } from '@/components/app/AppLayoutContent'

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
  description: 'Viagens personalizadas.',
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${comfortaa.variable} ${baloo.variable} font-comfortaa antialiased bg-white text-gray-900`}>
        <AppLayoutContent>
          {children}
        </AppLayoutContent>
      </body>
    </html>
  )
} 