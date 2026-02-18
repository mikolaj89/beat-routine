import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isPublicPath } from "./utils/middleware-utils";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  console.log('middleware triggered')
  const hasRefreshCookie = Boolean(request.cookies.get("refresh")?.value);

  // If logged in, keep users out of /login.
  if (pathname === "/login" && hasRefreshCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/sessions";
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  if (hasRefreshCookie) {
  
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/login";

  const from = `${pathname}${search}`;
  loginUrl.searchParams.set("from", from);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

