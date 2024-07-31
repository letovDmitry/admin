import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req) {
  const token = req.cookies.get("access_token", { path: '/admin' });

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (
    token &&
    (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (
    !token &&
    req.nextUrl.pathname !== "/login" &&
    req.nextUrl.pathname !== "/register"
  )
    return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: [
    "/login/:path*",
    "/register/:path*",
    "/admin/:path*",
    "/booster/:path*",
    "/checkout/:path*",
    // "/:path*",
  ],
};
