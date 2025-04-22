import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const path = request.nextUrl.pathname;

  const protectedRoutes = ["/dashboard"];
  const authRoutes = ["/login"];

  if (!token && protectedRoutes.some((route) => path.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && authRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}