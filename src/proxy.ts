import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from '@/pkg/locale'

import { authServer } from './pkg/auth/server/auth.server'

// middleware
export default async function proxy(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  const i18nRes = createMiddleware(routing)(req)

  const country =
    req.headers.get('cf-ipcountry') ||
    req.headers.get('cloudfront-viewer-country') ||
    req.headers.get('X-Country') ||
    req.cookies.get('country')?.value ||
    'N/A'

  i18nRes.headers.set('x-country', country)
  i18nRes.cookies.set('x-country', country)

  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    const session = await authServer.getSession()

    if (!session) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
  }

  if (req.nextUrl.pathname.startsWith('/sign-in')) {
    const session = await authServer.getSession()

    if (session) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  return i18nRes
}

// config
export const config = {
  matcher: [
   '/((?!api|auth|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
}