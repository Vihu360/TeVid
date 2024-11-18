import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from "@/configs/auth-utilis";
import { AxiosError } from "axios";
import { User } from "@/configs/types";

export async function POST(req: NextRequest) {
	try {
		const { email, password } = await req.json();

		console.log(email, password);

		const existingUserCheck = await db.select().from(Users).where(eq(Users.email, email)).execute();

		console.log(existingUserCheck)

		// Check if user exists

		if (existingUserCheck.length > 0) {
			if (existingUserCheck[0].isVerified) {

				// Check if password is correct

				const isPasswordCorrect = await bcrypt.compare(password, existingUserCheck[0].password);

				if (!isPasswordCorrect) {
					return NextResponse.json({ error: 'Incorrect Email or password' }, { status: 400 });
				}

				// Generate Access Token and Refresh Token

				const user: User = {
					id: existingUserCheck[0].id,
					email: existingUserCheck[0].email,
				};

				const accessToken = generateAccessToken(user);
				const refreshToken = generateRefreshToken(user);

				// save the refresh token in database

				await db.update(Users).set({ refreshToken: refreshToken }).where(eq(Users.email, email)).execute();


				// Return login success along with tokens


				interface CookieOptions {
					expires: Date;
					httpOnly: boolean;
					secure: boolean;
					sameSite: "strict" | "lax" | "none";
				}

				const cookie: CookieOptions = {
					expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
					httpOnly: true,
					secure: true,
					sameSite: "strict",
				};

				const response = NextResponse.json(
					{
						success: true,
						message: "Login Successful",
					},
					{ status: 200 }
				)

				response.cookies.set("accessToken", accessToken, cookie);
				response.cookies.set("refreshToken", refreshToken, cookie);

				return response;

			} else {
				return Response.json({ message: 'Please Sign Up again, your account is not verified' }, { status: 400 });
			}
		} else {
			return NextResponse.json({ message: 'Incorrect Email or password' }, { status: 400 });
		}

	} catch (error) {
		console.log(error);
		const axiosError = error as AxiosError;
		return NextResponse.json(axiosError.response?.data, { status: 500 });

	}
}
