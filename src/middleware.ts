import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { routing } from "@/pkg/locale";

const LOCALES = routing.locales;
const PROTECTED_PATHS = ["/items"];
const AUTH_PATHS = ["/sign-in", "/sign-up"];

type AppLocale = (typeof LOCALES)[number];

function isAppLocale(segment: string): segment is AppLocale {
  return (LOCALES as readonly string[]).includes(segment);
}

function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return "/";

  const [first, ...rest] = segments;
  if (isAppLocale(first)) {
    return rest.length ? `/${rest.join("/")}` : "/";
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

function localeFromPathname(pathname: string): string {
  const first = pathname.split("/").filter(Boolean)[0];
  if (first && isAppLocale(first)) return first;
  return routing.defaultLocale;
}

function withLocale(path: string, locale: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (locale === routing.defaultLocale) return p;
  return `/${locale}${p}`;
}

export default async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const pathname = req.nextUrl.pathname;
  const pathWithoutLocale = stripLocalePrefix(pathname);
  const locale = localeFromPathname(pathname);

  const isProtected = PROTECTED_PATHS.some((p) =>
    pathWithoutLocale.startsWith(p),
  );
  const isAuthPage = AUTH_PATHS.some((p) => pathWithoutLocale.startsWith(p));

  const token =
    isProtected || isAuthPage
      ? await getToken({ req, secret: process.env.AUTH_SECRET })
      : null;

  if (isProtected && !token) {
    return NextResponse.redirect(
      new URL(withLocale("/sign-in", locale), req.url),
    );
  }
  if (isAuthPage && token) {
    return NextResponse.redirect(
      new URL(withLocale("/items", locale), req.url),
    );
  }

  const i18nRes = createMiddleware(routing)(req);

  const country =
    req.headers.get("cf-ipcountry") ||
    req.headers.get("cloudfront-viewer-country") ||
    req.headers.get("X-Country") ||
    req.cookies.get("country")?.value ||
    "N/A";

  i18nRes.headers.set("x-country", country);
  i18nRes.cookies.set("x-country", country);

  return i18nRes;
}

export const config = {
  matcher: [
    "/((?!api|auth|register|books|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};
