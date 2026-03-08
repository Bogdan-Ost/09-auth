import { NextRequest, NextResponse } from "next/server";

export const proxy = (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("accessToken")?.value;

  const isPrivatePage = pathname.startsWith("/profile");
  const isAuthPage =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  if (isPrivatePage && !token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return NextResponse.next();
};
