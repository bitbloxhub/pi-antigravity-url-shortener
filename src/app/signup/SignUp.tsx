"use client"

import { useState } from "react"
import { signUp } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignUp() {
	const [name, setName] = useState("")
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
			const { error: signUpError } = await signUp.email({
				email,
				password,
				name,
				callbackURL: "/dashboard",
			})

			if (signUpError) {
				setError(signUpError.message || "Failed to sign up")
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
					<h2 className="card-title mb-4 justify-center text-2xl font-bold">Sign Up</h2>
					{error && (
						<div className="alert alert-error mb-4">
							<span>{error}</span>
						</div>
					)}
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="form-control">
							<label className="label">
								<span className="label-text">Name</span>
							</label>
							<input
								type="text"
								placeholder="John Doe"
								className="input input-bordered w-full"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
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
								{loading ? "Signing Up..." : "Sign Up"}
							</button>
						</div>
					</form>
					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<Link href="/signin" className="link link-primary">
							Sign In
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
