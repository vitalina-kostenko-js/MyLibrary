import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from './pkg/locale'

// Paths that require the user to be signed in
const PROTECTED = ['/items']
// Paths that should redirect to home if the user is already signed in
const AUTH_ONLY = ['/sign-in', '/sign-up']

// middleware
export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Let Next.js API routes pass through untouched
  if (pathname.startsWith('/auth/') || pathname.startsWith('/auth/')) {
    return NextResponse.next()
  }

  // Build the i18n response first (handles locale redirects / rewrites)
  const i18nRes = createMiddleware(routing)(req)

  // Propagate geo-country header/cookie for downstream use
  const country =
    req.headers.get('cf-ipcountry') ||
    req.headers.get('cloudfront-viewer-country') ||
    req.headers.get('X-Country') ||
    req.cookies.get('country')?.value ||
    'N/A'

  i18nRes.headers.set('x-country', country)
  i18nRes.cookies.set('x-country', country)

  // Strip optional locale prefix (/en/... or /de/...) to get a clean path
  // With localePrefix:'as-needed', the default locale (en) has NO prefix
  const cleanPath = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?(?=\/|$)/, '') || '/'

  const isProtected = PROTECTED.some(p => cleanPath.startsWith(p))
  const isAuthOnly  = AUTH_ONLY.some(p => cleanPath.startsWith(p))

  if (isProtected || isAuthOnly) {
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET ?? 'dev-secret-at-least-32-chars-long',
    })

    // Unauthenticated user trying to access a protected page → send to sign-in
    if (isProtected && !token) {
      const url = req.nextUrl.clone()
      url.pathname = '/sign-in'
      return NextResponse.redirect(url)
    }

    // Authenticated user trying to access sign-in/sign-up → send home
    if (isAuthOnly && token) {
      const url = req.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
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
