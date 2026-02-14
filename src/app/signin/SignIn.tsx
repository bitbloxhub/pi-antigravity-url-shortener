"use client"

import { useState } from "react"
import { signIn } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignIn() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError("")

		try {
			const { error: signInError } = await signIn.email({
				email,
				password,
				callbackURL: "/dashboard",
			})

			if (signInError) {
				setError(signInError.message || "Failed to sign in")
				setLoading(false)
			} else {
				router.push("/dashboard")
				router.refresh()
			}
		} catch (err) {
			setError("An unexpected error occurred")
			setLoading(false)
		}
	}

	return (
		<div className="flex flex-1 items-center justify-center p-4">
			<div className="card bg-base-100 border-base-200 w-full max-w-md border shadow-xl">
				<div className="card-body">
					<h2 className="card-title mb-4 justify-center text-2xl font-bold">Sign In</h2>
					{error && (
						<div className="alert alert-error mb-4">
							<span>{error}</span>
						</div>
					)}
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="email"
								placeholder="email@example.com"
								className="input input-bordered w-full"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<input
								type="password"
								placeholder="••••••••"
								className="input input-bordered w-full"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<div className="form-control mt-6">
							<button
								type="submit"
								className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
								disabled={loading}
							>
								{loading ? "Signing In..." : "Sign In"}
							</button>
						</div>
					</form>
					<div className="mt-4 text-center text-sm">
						Don't have an account?{" "}
						<Link href="/signup" className="link link-primary">
							Sign Up
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
