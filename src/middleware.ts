import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/tipo-perfil/')) {
    const name = pathname.split('/')[2];
    return NextResponse.redirect(new URL(`/perfil/${name}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/tipo-perfil/:name*',
}; 