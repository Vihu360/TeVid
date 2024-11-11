import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { Users } from "@/configs/schema";
import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";
import { generateAccessToken, generateRefreshToken } from "@/configs/auth-utilis";
import { User } from "@/configs/types";

export async function POST(req: NextRequest) {

	try {

		const { email, code } = await req.json();

		const existingUser = await db.select().from(Users).where(eq(Users.email, email)).execute();

		if (existingUser[0].isVerified) {
			return NextResponse.json({ error: 'User already verified' }, { status: 400 });
		}

		const createdVerifyCode = existingUser[0].verifyCode;

		if (!createdVerifyCode === code) {

			return NextResponse.json({ error: 'Invalid code' }, { status: 400 });

		}

		await db.update(Users).set({ isVerified: true }).where(eq(Users.email, email)).execute();

		// save the refresh token in database

		const user: User = {
			id: existingUser[0].id,
			email: existingUser[0].email,
			role: 'user',
		};

		const accessToken = generateAccessToken(user);
		const refreshToken = generateRefreshToken(user);


		await db.update(Users).set({ refreshToken: refreshToken }).where(eq(Users.email, email)).execute();


		// Return success along with tokens

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

	} catch (error) {

		const axiosError = error as AxiosError
		console.log(axiosError.response?.data);

	}

}
