import AnalyticsProvider from '@/components/basic/AnalyticsProvider'
import TopMenu from '@/components/common/TopMenu'
import { WizardProvider } from '@/contexts/WizardContext'
import { Footer, PrivacyBanner } from '@/features'
import type { Metadata } from 'next'
import { Baloo_2, Comfortaa } from 'next/font/google'

const comfortaa = Comfortaa({ 
  subsets: ['latin'],
  variable: '--font-comfortaa',
})

const baloo = Baloo_2({ 
  subsets: ['latin'],
  variable: '--font-baloo',
})

export const metadata: Metadata = {
  title: 'Trip Evolved - Plataforma',
  description: 'Plataforma de viagens personalizadas.',
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <AnalyticsProvider />
      <body className={`${comfortaa.variable} ${baloo.variable} font-comfortaa antialiased bg-white text-gray-900`}>
        <WizardProvider>
          <TopMenu /> {/* TODO: Replace with AppMenu */}
          <main className="min-h-screen flex flex-col pt-16">
            {children}
          </main>
          <Footer /> {/* TODO: Replace with AppFooter */}
          <PrivacyBanner />
        </WizardProvider>
      </body>
    </html>
  )
} 