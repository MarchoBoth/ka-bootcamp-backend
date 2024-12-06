import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import React from "react";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/api/") {
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
    if (request.method === "OPTIONS") {
      return new NextResponse(null, { status: 200 });
    }
    return response;
  }

  const token = request.cookies.get("token")?.value;
  // if (!token) {
  //   return NextResponse.redirect(new URL("/auth/signin", request.url));
  // } else {
  //   return NextResponse.next();
  // }
}
export const config: MiddlewareConfig = {
  matcher: [
    "/",
    "/product/:path*",
    "/categories/:path*",
    "/order/:path*",
    "/api/:path*",
  ],
};
