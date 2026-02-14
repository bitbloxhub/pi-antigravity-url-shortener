"use server"

import { db } from "@/db"
import { urls, user } from "@/db/schema"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { nanoid } from "nanoid"
import { eq, and, desc } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function getSession() {
	return await auth.api.getSession({
		headers: await headers(),
	})
}

export async function createUrl(originalUrl: string) {
	const session = await getSession()
	if (!session) throw new Error("Unauthorized")

	const shortCode = nanoid(6)
	await db.insert(urls).values({
		originalUrl,
		shortCode,
		userId: session.user.id,
	})

	revalidatePath("/dashboard")
}

export async function deleteUrl(id: string) {
	const session = await getSession()
	if (!session) throw new Error("Unauthorized")

	await db.delete(urls).where(and(eq(urls.id, id), eq(urls.userId, session.user.id)))

	revalidatePath("/dashboard")
}

export async function deleteAccount() {
	const session = await getSession()
	if (!session) throw new Error("Unauthorized")

	await db.transaction(async (tx) => {
		await tx.delete(urls).where(eq(urls.userId, session.user.id))
		await tx.delete(user).where(eq(user.id, session.user.id))
	})

	redirect("/")
}
