import { db } from "@/db"
import { urls } from "@/db/schema"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { eq, desc } from "drizzle-orm"
import { UrlForm } from "@/components/UrlForm"
import { UrlList } from "@/components/UrlList"
import { DeleteAccountButton } from "@/components/DeleteAccountButton"

export default async function DashboardPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (!session) {
		redirect("/signin")
	}

	const userUrls = await db.query.urls.findMany({
		where: eq(urls.userId, session.user.id),
		orderBy: [desc(urls.createdAt)],
	})

	return (
		<div className="container mx-auto max-w-4xl p-4">
			<h1 className="mb-8 text-3xl font-bold">Management Interface</h1>

			<div className="grid gap-8">
				<section className="bg-base-200 rounded-xl p-6 shadow-inner">
					<h2 className="mb-4 text-xl font-semibold">Create New Short URL</h2>
					<UrlForm />
				</section>

				<section>
					<h2 className="mb-4 text-xl font-semibold">Your URLs</h2>
					<UrlList urls={userUrls} />
				</section>

				<section className="border-base-300 mt-12 border-t pt-8">
					<h2 className="text-error mb-4 text-xl font-semibold">Danger Zone</h2>
					<div className="bg-error/10 border-error/20 flex items-center justify-between rounded-xl border p-6">
						<div>
							<h3 className="font-bold">Delete Account</h3>
							<p className="text-sm opacity-70">
								Once you delete your account, there is no going back. Please be certain.
							</p>
						</div>
						<DeleteAccountButton />
					</div>
				</section>
			</div>
		</div>
	)
}
