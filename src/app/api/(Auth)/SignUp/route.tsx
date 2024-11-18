import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/configs/db';
import { Users } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { sendVerificationEmail } from '@/configs/sendVerificationEmail';

// Set up Resend client (if using for email)
// const resendClient = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
	try {

		const { firstName, lastName, email, password } = await req.json();

		console.log(firstName, lastName, email, password)

		// Basic validation
		if (!firstName || !lastName || !email || !password) {
			return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
		}

		// Check if the user already exists
		const existingUser = await db.select().from(Users).where(eq(Users.email, email)).execute();

		console.log('existing user', existingUser);

		const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		if (existingUser.length > 0) {


			if (existingUser[0].isVerified) {
				return NextResponse.json({ error: 'User already exists' }, { status: 400 });
			}

			else {

				existingUser[0].verifyCode = verifyCode;
				existingUser[0].verifyCodeExpires = new Date(Date.now() + 3600000);
				existingUser[0].password = hashedPassword;

				await db.update(Users).set(existingUser[0]).where(eq(Users.email, email)).execute();

			}


		}

		else {

			// Insert new user into the database

			const expiryDate = new Date();
			expiryDate.setHours(expiryDate.getHours() + 1);

			const newUser = await db.insert(Users).values({

				firstName: firstName,
				lastName: lastName,
				email: email,
				password: hashedPassword,
				verifyCodeExpires: expiryDate,
				verifyCode: verifyCode,
				credits: 20

			}).execute();

			console.log(newUser);

		}

		// send email verification code

		const fullName = firstName + ' ' + lastName;

		const emailResponse = await sendVerificationEmail(fullName, email, verifyCode);

		if (!emailResponse.success) {
			return new NextResponse(
				JSON.stringify({
					success: false,
					message: emailResponse.message,
				}),
				{ status: 500 }
			);
		}

		return new NextResponse(
			JSON.stringify({
				success: true,
				message: "Email registered successfully. Please verify the Email",
			}),
			{ status: 200 }
		);


	} catch (error) {
		console.error('Signup error:', error);
		return NextResponse.json({ error: 'Error registering user, please try again' }, { status: 500 });
	}
}
