import type { Metadata } from 'next'
import { Comfortaa, Baloo_2 } from 'next/font/google'
import '@/main.css'
import TopMenu from '@/components/TopMenu'
import Footer from '@/components/Footer'
import WhatsAppBubble from '@/components/WhatsAppBubble'
import PrivacyBanner from '@/components/PrivacyBanner'

const comfortaa = Comfortaa({ 
  subsets: ['latin'],
  variable: '--font-comfortaa',
})

const baloo = Baloo_2({ 
  subsets: ['latin'],
  variable: '--font-baloo',
})

export const metadata: Metadata = {
  title: 'Trip Evolved - Sua Agência de Viagens Personalizada',
  description: 'Descubra experiências de viagem personalizadas feitas especialmente para você. De destinos exóticos a estadias de luxo, criamos sua jornada perfeita.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${comfortaa.variable} ${baloo.variable} font-comfortaa antialiased bg-white text-gray-900`}>
        <TopMenu />
        <main className="min-h-screen flex flex-col pt-16">
          {children}
        </main>
        <Footer />
        <WhatsAppBubble phoneNumber="5511999999999" />
        <PrivacyBanner />
      </body>
    </html>
  )
} 