import Link from "next/link"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function Home() {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (session) {
		redirect("/dashboard")
	}

	return (
		<div className="hero bg-base-200 min-h-[calc(100vh-64px)]">
			<div className="hero-content text-center">
				<div className="max-w-md">
					<h1 className="text-primary text-5xl font-bold italic">Antigravity</h1>
					<p className="py-6 text-xl">
						A powerful, lightning-fast URL shortener with a focus on simplicity and ease of management.
					</p>
					<div className="flex justify-center gap-4">
						<Link href="/signup" className="btn btn-primary btn-lg">
							Get Started
						</Link>
						<Link href="/signin" className="btn btn-outline btn-lg">
							Sign In
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
