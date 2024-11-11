import { verifyRefreshToken } from "@/configs/auth-utilis";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("refreshToken")?.value;
  const url = req.nextUrl;

	// If the token exists and the user is trying to access signup, signin, or verify


	const verifyToken = verifyRefreshToken(token as string);

	console.log(verifyToken)

  if (verifyToken) {
    if (
      url.pathname.startsWith("/signup") ||
      url.pathname.startsWith("/verify")
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // If the token doesn't exist and the user is trying to access the main application

  if (
    (!verifyToken && url.pathname.startsWith("/projects")) ||
    url.pathname.startsWith("/dashboard") ||
    url.pathname.startsWith("/create-new") 
  ) {
    return NextResponse.redirect(new URL("/signup", req.url));
  }
}
