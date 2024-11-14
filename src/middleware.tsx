import { verifyRefreshToken } from "@/configs/auth-utilis";
import { NextResponse, NextRequest } from "next/server";
import { db } from "./configs/db";
import { Users } from "./configs/schema";
import { eq } from "drizzle-orm";

const publicRoutes = ['/sign-up', '/verify'];
const protectedRoutes = ['/projects', '/dashboard', '/create-new'];


export async function middleware(req: NextRequest) {

	const token = req.cookies.get("refreshToken")?.value;
	const url = req.nextUrl;

	// Check if the current path is protected
	const isProtectedRoute = protectedRoutes.some(route =>
		url.pathname.startsWith(route)
	);

	// Check if the current path is public
	const isPublicRoute = publicRoutes.some(route =>
		url.pathname.startsWith(route)
	);

	// If no token exists
	if (!token) {
		// Redirect to sign-up if trying to access protected routes
		if (isProtectedRoute) {
			return NextResponse.redirect(new URL("/sign-up", req.url));
		}
		return NextResponse.next();
	}

	try {

		// Verify the refresh token
		const verifiedToken = await verifyRefreshToken(token);

		if (!verifiedToken || !verifiedToken.email) {
			throw new Error('Invalid token');
		}

		// Fetch user from database
		const users = await db
			.select()
			.from(Users)
			.where(eq(Users.email, verifiedToken.email))
			.execute();

		if (!users || users.length === 0) {
			throw new Error('User not found');
		}

		const user = users[0];

		// Verify stored refresh token matches
		if (user.refreshToken !== token) {
			throw new Error('Token mismatch');
		}

		// If user is authenticated and trying to access public routes
		if (isPublicRoute) {
			return NextResponse.redirect(new URL("/dashboard", req.url));
		}

		// Allow access to protected routes
		return NextResponse.next();

	} catch (error) {
		console.error("Middleware error:", error);

		// Clear the invalid refresh token cookie
		const response = NextResponse.redirect(new URL("/sign-up", req.url));
		response.cookies.delete("refreshToken");

		return response;
	}
}

export const config = {
	matcher: [
		'/dashboard/:path*',
		'/projects/:path*',
		'/create-new/:path*',
		'/sign-up',
		'/verify',
	],
};
