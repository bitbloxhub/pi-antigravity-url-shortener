import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import SignUp from "./SignUp"

export default async function SignUpPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (session) {
		redirect("/dashboard")
	}

	return <SignUp />
}
