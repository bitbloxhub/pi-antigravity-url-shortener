import type { Metadata } from "next"
import { Fira_Code } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/Navbar"

const firaCode = Fira_Code({
	variable: "--font-fira-code",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "URL Shortener",
	description: "A nice URL shortener built with Better Auth and Next.js",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${firaCode.variable} flex min-h-screen flex-col font-mono antialiased`}>
				<Navbar />
				<main className="flex flex-1 flex-col">{children}</main>
			</body>
		</html>
	)
}
