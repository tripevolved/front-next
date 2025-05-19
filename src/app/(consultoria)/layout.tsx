import type { Metadata } from 'next'
import { Comfortaa, Baloo_2 } from 'next/font/google'
import '@/main.css'
import PrivacyBanner from '@/components/common/PrivacyBanner'
import AnalyticsProvider from '@/components/basic/AnalyticsProvider'
import { WizardProvider } from '@/contexts/WizardContext'
import Link from 'next/link'
import Image from 'next/image'

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
    default: 'Trip Evolved - Sua Agência de Viagens Personalizadas',
    template: '%s | Trip Evolved Viagens Personalizadas'
  },
  description: 'Cansado de pacotes prontos? Planeje sua próxima jornada com especialistas que conhecem os melhores destinos e experiências, tudo personalizado para você.',
  keywords: ['consultoria de viagens', 'planejamento de viagens', 'viagens personalizadas', 'destinos exclusivos', 'roteiros sob medida'],
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
    url: 'https://tripevolved.com.br/consultoria',
    siteName: 'Trip Evolved',
    title: 'Consultoria de Viagens | Trip Evolved',
    description: 'Cansado de pacotes prontos? Planeje sua próxima jornada com especialistas que conhecem os melhores destinos e experiências, tudo personalizado para você.',
    images: [
      {
        url: '/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Trip Evolved - Consultoria de Viagens',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consultoria de Viagens | Trip Evolved',
    description: 'Cansado de pacotes prontos? Planeje sua próxima jornada com especialistas.',
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

export default function ConsultoriaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <AnalyticsProvider />
      <body className={`${comfortaa.variable} ${baloo.variable} font-comfortaa antialiased bg-white text-gray-900`}>
        <WizardProvider>
          {/* Simple Top Menu */}
          <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
            <div className="w-full md:w-[80%] mx-auto px-4 h-16 flex items-center justify-center">
              <Link href="/" className="relative w-40 h-8">
                <Image
                  src="/assets/logo.png"
                  alt="Trip Evolved"
                  fill
                  className="object-contain"
                />
              </Link>
            </div>
          </header>

          <main className="min-h-screen flex flex-col pt-16">
            {children}
          </main>

          {/* Simple Footer */}
          <footer className="bg-secondary-900 text-white py-12">
            <div className="w-full md:w-[80%] mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="relative w-40 h-8 mb-6">
                    <Image
                      src="/assets/logo-white.png"
                      alt="Trip Evolved"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="relative w-32 h-8 mb-6">
                    <Image
                      src="/assets/cadastur.png"
                      alt="CADASTUR"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-white/80 text-sm">
                    Copyright © 2025 Trip Evolved. Todos os direitos reservados.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <Link href="/termos" className="text-white/80 hover:text-white transition-colors">
                    Termos de uso
                  </Link>
                  <Link href="/privacidade" className="text-white/80 hover:text-white transition-colors">
                    Política de privacidade
                  </Link>
                  <Link href="/cookies" className="text-white/80 hover:text-white transition-colors">
                    Política de cookies
                  </Link>
                </div>
              </div>
            </div>
          </footer>
          <PrivacyBanner />
        </WizardProvider>
      </body>
    </html>
  )
} 