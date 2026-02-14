import { db } from "@/db"
import { urls } from "@/db/schema"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
	const { code } = await params

	const urlEntry = await db.query.urls.findFirst({
		where: eq(urls.shortCode, code),
	})

	if (!urlEntry) {
		return new Response("URL not found", { status: 404 })
	}

	redirect(urlEntry.originalUrl)
}
