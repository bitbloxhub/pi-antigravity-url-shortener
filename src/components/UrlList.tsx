"use client";

import { deleteUrl } from "@/app/actions";
import { Trash2, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";

interface UrlListProps {
	urls: any[];
}

export function UrlList({ urls }: UrlListProps) {
	const [copyStatus, setCopyStatus] = useState<string | null>(null);

	const handleCopy = (code: string) => {
		const fullUrl = `${window.location.origin}/s/${code}`;
		navigator.clipboard.writeText(fullUrl);
		setCopyStatus(code);
		setTimeout(() => setCopyStatus(null), 2000);
	};

	if (urls.length === 0) {
		return (
			<div className="text-center p-8 bg-base-100 rounded-lg border-2 border-dashed border-base-300">
				<p className="text-base-content/60">No URLs shortened yet. Create your first one above!</p>
			</div>
		);
	}

	return (
		<div className="overflow-x-auto bg-base-100 rounded-lg shadow">
			<table className="table">
				<thead>
					<tr>
						<th>Short URL</th>
						<th>Original URL</th>
						<th>Created</th>
						<th className="text-right">Actions</th>
					</tr>
				</thead>
				<tbody>
					{urls.map((url) => (
						<tr key={url.id}>
							<td>
								<div className="flex items-center gap-2">
									<span className="font-mono text-primary font-bold">{url.shortCode}</span>
									<button
										onClick={() => handleCopy(url.shortCode)}
										className="btn btn-ghost btn-xs tooltip"
										data-tip={copyStatus === url.shortCode ? "Copied!" : "Copy link"}
									>
										<Copy size={14} />
									</button>
								</div>
							</td>
							<td className="max-w-xs truncate overflow-hidden" title={url.originalUrl}>
								<a
									href={url.originalUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="link link-hover flex items-center gap-1"
								>
									{url.originalUrl}
									<ExternalLink size={12} />
								</a>
							</td>
							<td className="text-sm opacity-70">
								{new Date(url.createdAt).toLocaleDateString()}
							</td>
							<td className="text-right">
								<button
									onClick={() => deleteUrl(url.id)}
									className="btn btn-ghost btn-sm text-error"
								>
									<Trash2 size={16} />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
