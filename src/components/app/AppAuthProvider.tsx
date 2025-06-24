'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Cookies from 'js-cookie'

interface AppAuthProviderProps {
  children: React.ReactNode
}

interface UserCredentials {
  idToken: string
  accessToken: string
  refreshToken: string
}

// Check auth from cookies
const checkAuth = (): boolean => {
  if (typeof window === 'undefined') return false
  
  try {
    const userCredentialsCookie = Cookies.get('user-credentials')
    if (!userCredentialsCookie) return false
    
    const userCredentials: UserCredentials = JSON.parse(userCredentialsCookie)
    return !!userCredentials.accessToken
  } catch (error) {
    console.error('Error parsing user credentials:', error)
    return false
  }
}

// Check if the current path is protected
const isProtectedPath = (pathname: string): boolean => {
  // All paths under /app/(app) are protected except for login, register, and logout
  const publicPaths = ['/app/entrar', '/app/cadastro', '/app/sair']
  return pathname.startsWith('/app') && !publicPaths.some(path => pathname.startsWith(path))
}

export function AppAuthProvider({ children }: AppAuthProviderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check authentication status
    const authStatus = checkAuth()
    setIsAuthenticated(authStatus)
    setIsLoading(false)

    // If not authenticated and on a protected path, redirect to login
    if (!authStatus && isProtectedPath(pathname || '/')) {
      const currentPath = encodeURIComponent(pathname || '/')
      router.push(`/app/entrar?redirectTo=${currentPath}`)
    }
  }, [pathname, router])

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  // If not authenticated and on a protected path, show nothing (will redirect)
  if (!isAuthenticated && isProtectedPath(pathname || '/')) {
    return null
  }

  // Render children if authenticated or on public path
  return <>{children}</>
} 