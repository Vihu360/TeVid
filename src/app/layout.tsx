import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import PayPalProvider from "./_components/PayPalProvider";
import { SpeedInsights } from '@vercel/speed-insights/next';


export const metadata: Metadata = {
	title: "CraftErsa | The AI Short Video Generator",
	description: "AI Video Generator which helps generate high-quality short videos from text for Reels, TikTok, and YouTube Shorts",
};

const poppins = Poppins({
	weight: ['400', '700'],
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (

		<html lang="en">
			<body className={poppins.className}>
				<PayPalProvider>
					{children}
					<SpeedInsights />
					<Toaster />
				</PayPalProvider>
			</body>
		</html>
	);
}
