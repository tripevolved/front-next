import { NextResponse, type NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";
import { UserService } from "./services/user";

export async function middleware(request: NextRequest) {
  const authRes = await auth0.middleware(request);

  // authentication routes — let the middleware handle it
  if (request.nextUrl.pathname.startsWith("/auth")) {
    return authRes;
  }

  // public routes — no need to check for session
  if (request.nextUrl.pathname.startsWith("/app")) {
    const { pathname, origin } = new URL(request.url)
    const session = await auth0.getSession()

    // user does not have a session — redirect to login
    if (!session) {
      return NextResponse.redirect(`${origin}/auth/login?returnTo=${encodeURIComponent(pathname)}`)
    }

    UserService.updateTravelerState();
  }

  return authRes;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};