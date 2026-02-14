"use client";

import { useState } from "react";
import { createUrl } from "@/app/actions";

export function UrlForm() {
	const [url, setUrl] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			await createUrl(url);
			setUrl("");
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex gap-2">
			<input
				type="url"
				placeholder="https://example.com/very/long/url/that/needs/shortening"
				className="input input-bordered flex-1"
				value={url}
				onChange={(e) => setUrl(e.target.value)}
				required
			/>
			<button className={`btn btn-primary ${loading ? "loading" : ""}`} disabled={loading}>
				Shorten
			</button>
		</form>
	);
}
