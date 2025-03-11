import { NextRequest, NextResponse } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n, LanguageType, Locale } from "./i18n.config";
import { Pages, Routes } from "./constants/enum";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: LanguageType[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  let locale = "";

  try {
    locale = matchLocale(languages, locales, i18n.defaultLocale);
  } catch {
    locale = i18n.defaultLocale;
  }
  return locale;
}

export default withAuth(
  async function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);

    requestHeaders.set("x-url", request.url);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/public/")) {
      return response;
    }

    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) => !pathname.startsWith(`/${locale}`)
    );

    if (pathnameIsMissingLocale) {
      const locale = getLocale(request);
      return NextResponse.redirect(
        new URL(`/${locale}${pathname}`, request.url)
      );
    }

    const currentLocale = request.url.split("/")[3] as Locale;
    const isAuth = await getToken({ req: request, secureCookie: false });
    const isAuthPage = pathname.startsWith(`/${currentLocale}/${Routes.AUTH}`);
    const protectedRoutes = [Routes.PROFILE, Routes.ADMIN];
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(`/${currentLocale}/${route}`)
    );

    if (pathname === `/${currentLocale}/${Routes.ADMIN}`) {
      return NextResponse.redirect(
        new URL(`/${currentLocale}/${Routes.ADMIN}/${Pages.USERS}`, request.url)
      );
    }

    const previousUrl =
      request.cookies.get("previous-url")?.value || `/${currentLocale}`;

    response.cookies.set("previous-url", request.url, {
      path: "/",
      httpOnly: true,
    });

    if (!isAuth && isProtectedRoute) {
      return NextResponse.redirect(
        new URL(`/${currentLocale}/${Routes.AUTH}/${Pages.LOGIN}`, request.url)
      );
    }

    // If user is logged in and tries to access login/register, redirect to the previous page
    if (isAuth && isAuthPage) {
      return NextResponse.redirect(new URL(previousUrl, request.url));
    }

    // If user is logged and try to access admin pages, redirect to the previous page
    if (isAuth && pathname.startsWith(`/${currentLocale}/${Routes.ADMIN}`)) {
      if (isAuth.role != "ADMIN") {
        return NextResponse.redirect(new URL(previousUrl, request.url));
      }
    }

    return response;
  },
  {
    callbacks: {
      authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|assets/.*|defaultImage.png).*)",
  ],
};
