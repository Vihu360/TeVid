import VerificationEmail from '../../Emails/verificationEmail';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY as string);


export async function sendVerificationEmail(
	fullName: string,
	email: string,
	verifyCode: string
) {
	try {

		const emailContent = VerificationEmail({ fullName, otp: verifyCode });


		await resend.emails.send({
			from: 'send@craftersa.com',
			to: email,
			subject: 'Craftersa Verification Code',
			react: emailContent,
		});

		return { success: true, message: 'Verification email sent successfully.' };
	} catch (emailError) {
		console.error('Error sending verification email:', emailError);
		return { success: false, message: 'Failed to send verification email.' };
	}
}
