import {
	Html,
	Head,
	Font,
	Preview,
	Heading,
	Section,
	Text,
} from '@react-email/components';

interface VerificationEmailProps {
	readonly fullName: string;
	readonly otp: string;
}

export default function VerificationEmail({ fullName, otp }: VerificationEmailProps) {
	return (
		<Html lang="en" dir="ltr">
			<Head>
				<title>Verification Code</title>
				<Font
					fontFamily="Roboto"
					fallbackFontFamily="Verdana"
					webFont={{
						url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
						format: 'woff2',
					}}
					fontWeight={400}
					fontStyle="normal"
				/>
			</Head>
			<Preview>Use this verification code to complete your registration</Preview>
			<Section style={{
				backgroundColor: '#f9fafb',
				padding: '40px',
				borderRadius: '10px',
				maxWidth: '600px',
				margin: '40px auto',
				boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
				fontFamily: 'Roboto, sans-serif',
				textAlign: 'center',
			}}>
				<Heading as="h1" style={{
					fontSize: '28px',
					fontWeight: 'bold',
					color: '#333',
					marginBottom: '20px',
				}}>
					Welcome, {fullName}!
				</Heading>
				<Text style={{
					fontSize: '16px',
					color: '#555',
					marginBottom: '10px',
				}}>
					Thanks for joining us!
				</Text>
				<Text style={{
					fontSize: '14px',
					color: '#777',
					marginBottom: '20px',
				}}>
					To continue, please use the verification code below:
				</Text>
				<div style={{
					display: 'inline-block',
					padding: '15px 30px',
					backgroundColor: '#3b82f6',
					color: '#fff',
					fontSize: '32px',
					fontWeight: 'bold',
					borderRadius: '8px',
					marginBottom: '20px',
				}}>
					{otp}
				</div>
				<Text style={{
					fontSize: '14px',
					color: '#777',
					marginTop: '20px',
				}}>
					If you didn&apos;t request this code, please disregard this message.
				</Text>
				<Text style={{
					fontSize: '12px',
					color: '#aaa',
					marginTop: '30px',
				}}>
					&copy; {new Date().getFullYear()} craftErsa. All rights reserved.
				</Text>
			</Section>
		</Html>
	);
}
