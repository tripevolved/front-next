import type { Metadata } from 'next'
import { Comfortaa, Baloo_2 } from 'next/font/google'
import '@/main.css'
import TopMenu from '@/components/common/TopMenu'
import Footer from '@/components/common/Footer'
import WhatsAppBubble from '@/components/WhatsAppBubble'
import PrivacyBanner from '@/components/common/PrivacyBanner'
import AnalyticsProvider from '@/components/basic/AnalyticsProvider'

const comfortaa = Comfortaa({ 
  subsets: ['latin'],
  variable: '--font-comfortaa',
})

const baloo = Baloo_2({ 
  subsets: ['latin'],
  variable: '--font-baloo',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://tripevolved.com.br'),
  title: {
    default: 'Trip Evolved - Sua Agência de Viagens Personalizada',
    template: '%s | Trip Evolved'
  },
  description: 'Descubra experiências de viagem personalizadas feitas especialmente para você. De destinos exóticos a estadias de luxo, criamos sua jornada perfeita.',
  keywords: ['agência de viagens', 'viagens personalizadas', 'destinos exóticos', 'estadias de luxo', 'roteiros exclusivos', 'viagens sob medida'],
  authors: [{ name: 'Trip Evolved' }],
  creator: 'Trip Evolved',
  publisher: 'Trip Evolved',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://tripevolved.com.br',
    siteName: 'Trip Evolved',
    title: 'Trip Evolved - Sua Agência de Viagens Personalizada',
    description: 'Descubra experiências de viagem personalizadas feitas especialmente para você. De destinos exóticos a estadias de luxo, criamos sua jornada perfeita.',
    images: [
      {
        url: '/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Trip Evolved - Experiências de viagem personalizadas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trip Evolved - Sua Agência de Viagens Personalizada',
    description: 'Descubra experiências de viagem personalizadas feitas especialmente para você.',
    images: ['/assets/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <AnalyticsProvider />
      <body className={`${comfortaa.variable} ${baloo.variable} font-comfortaa antialiased bg-white text-gray-900`}>
        <TopMenu />
        <main className="min-h-screen flex flex-col pt-16">
          {children}
        </main>
        <Footer />
        <WhatsAppBubble phoneNumber="5512991694499" />
        <PrivacyBanner />
      </body>
    </html>
  )
} 