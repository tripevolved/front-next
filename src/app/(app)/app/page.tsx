'use client'

import Link from 'next/link'
import { useAppStore } from '@/core/store'
import { TravelerProfile } from '@/components/travelers'

export default function PainelPage() {
  const travelerState = useAppStore((state) => state.travelerState)
  const needsCompletion = !travelerState || !travelerState.id || travelerState.id === ''

  if (needsCompletion) {
    return <TravelerProfile />
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel</h1>
        <p className="text-gray-600">Bem-vindo ao seu painel de controle</p>
      </div>

      {/* User Information Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Suas Informações</h2>
        
        <div className="space-y-4">
          {/* Profile Picture */}
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-primary-500/10 rounded-full flex items-center justify-center">
              <span className="text-2xl text-primary-500 font-semibold">
                {travelerState?.name?.charAt(0).toUpperCase() || 'V'}
              </span>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">{travelerState?.name || 'Viajante'}</p>
              <p className="text-sm text-gray-500">{travelerState?.email || 'Não informado'}</p>
            </div>
          </div>

          {/* User Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="border-l-4 border-primary-500 pl-4">
              <p className="text-sm font-medium text-gray-500">Nome</p>
              <p className="text-base text-gray-900">{travelerState?.name || 'Não informado'}</p>
            </div>

            <div className="border-l-4 border-primary-500 pl-4">
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-base text-gray-900">{travelerState?.email || 'Não informado'}</p>
            </div>

            {travelerState?.id && (
              <div className="border-l-4 border-primary-500 pl-4 md:col-span-2">
                <p className="text-sm font-medium text-gray-500">ID do Viajante</p>
                <p className="text-base text-gray-900 font-mono text-sm">{travelerState.id}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex gap-4">
        <Link
          href="/app/viagens"
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          Minhas Viagens
        </Link>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/auth/logout"
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Sair
        </a>
      </div>
    </div>
  )
}

