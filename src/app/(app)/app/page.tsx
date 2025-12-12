import { auth0 } from '@/lib/auth0'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function PainelPage() {
  // Get the user session from Auth0
  const session = await auth0.getSession()

  // If no session, redirect to login (middleware should handle this, but just in case)
  if (!session) {
    redirect('/auth/login')
  }

  const user = session.user

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
          {user.picture && (
            <div className="flex items-center space-x-4">
              <img
                src={user.picture}
                alt={user.name || 'User'}
                className="w-20 h-20 rounded-full border-2 border-primary-500"
              />
              <div>
                <p className="text-lg font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          )}

          {/* User Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="border-l-4 border-primary-500 pl-4">
              <p className="text-sm font-medium text-gray-500">Nome</p>
              <p className="text-base text-gray-900">{user.name || 'Não informado'}</p>
            </div>

            <div className="border-l-4 border-primary-500 pl-4">
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-base text-gray-900">{user.email || 'Não informado'}</p>
            </div>

            {user.nickname && (
              <div className="border-l-4 border-primary-500 pl-4">
                <p className="text-sm font-medium text-gray-500">Apelido</p>
                <p className="text-base text-gray-900">{user.nickname}</p>
              </div>
            )}

            {user.email_verified !== undefined && (
              <div className="border-l-4 border-primary-500 pl-4">
                <p className="text-sm font-medium text-gray-500">Email Verificado</p>
                <p className="text-base text-gray-900">
                  {user.email_verified ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Sim
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Não
                    </span>
                  )}
                </p>
              </div>
            )}

            {user.sub && (
              <div className="border-l-4 border-primary-500 pl-4 md:col-span-2">
                <p className="text-sm font-medium text-gray-500">ID do Usuário</p>
                <p className="text-base text-gray-900 font-mono text-sm">{user.sub}</p>
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

