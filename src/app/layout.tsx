import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const firaCode = Fira_Code({
	variable: "--font-fira-code",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "URL Shortener",
	description: "A nice URL shortener built with Better Auth and Next.js",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${firaCode.variable} antialiased min-h-screen flex flex-col font-mono`}>
				<Navbar />
				<main className="flex-1 flex flex-col">{children}</main>
			</body>
		</html>
	);
}
