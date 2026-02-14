import { db } from "@/db";
import { urls } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { eq, desc } from "drizzle-orm";
import { UrlForm } from "@/components/UrlForm";
import { UrlList } from "@/components/UrlList";
import { DeleteAccountButton } from "@/components/DeleteAccountButton";

export default async function DashboardPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/signin");
	}

	const userUrls = await db.query.urls.findMany({
		where: eq(urls.userId, session.user.id),
		orderBy: [desc(urls.createdAt)],
	});

	return (
		<div className="container mx-auto p-4 max-w-4xl">
			<h1 className="text-3xl font-bold mb-8">Management Interface</h1>
			
			<div className="grid gap-8">
				<section className="bg-base-200 p-6 rounded-xl shadow-inner">
					<h2 className="text-xl font-semibold mb-4">Create New Short URL</h2>
					<UrlForm />
				</section>

				<section>
					<h2 className="text-xl font-semibold mb-4">Your URLs</h2>
					<UrlList urls={userUrls} />
				</section>

				<section className="mt-12 pt-8 border-t border-base-300">
					<h2 className="text-xl font-semibold text-error mb-4">Danger Zone</h2>
					<div className="bg-error/10 p-6 rounded-xl border border-error/20 flex items-center justify-between">
						<div>
							<h3 className="font-bold">Delete Account</h3>
							<p className="text-sm opacity-70">Once you delete your account, there is no going back. Please be certain.</p>
						</div>
						<DeleteAccountButton />
					</div>
				</section>
			</div>
		</div>
	);
}
