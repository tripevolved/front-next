'use client'

import { useAppStore } from '@/core/store'
import AppMenu from './AppMenu'

interface AppLayoutContentProps {
  children: React.ReactNode
}

export function AppLayoutContent({ children }: AppLayoutContentProps) {
  const { travelerState } = useAppStore()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary-500 text-white border-b border-primary-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Greeting */}
            <div className="flex items-center">
              <h1 className="font-bold">
                Olá, {travelerState?.name || 'Viajante'}
              </h1>
            </div>
            
            {/* App Menu */}
            <AppMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
} 