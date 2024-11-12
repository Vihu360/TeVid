import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"


export const metadata: Metadata = {
  title: "CraftErsa | The Ai Short Video Generator",
  description: "AI Video Generator which helps generating high qulity short videos from text for Reels, TikTok and Youtube Shorts",
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
      <body
        className={poppins.className}
			>
				{children}
				<Toaster />
      </body>
			</html>
  );
}
