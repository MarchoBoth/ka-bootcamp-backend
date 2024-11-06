import { NextRequest, NextResponse } from "next/server";
import React from "react";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [],
};
