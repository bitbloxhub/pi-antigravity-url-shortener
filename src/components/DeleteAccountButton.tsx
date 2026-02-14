"use client";

import { useState } from "react";
import { deleteAccount } from "@/app/actions";
import { Trash2 } from "lucide-react";

export function DeleteAccountButton() {
	const [confirming, setConfirming] = useState(false);

	if (!confirming) {
		return (
			<button
				onClick={() => setConfirming(true)}
				className="btn btn-error btn-outline btn-sm"
			>
				Delete Account
			</button>
		);
	}

	return (
		<div className="flex items-center gap-4">
			<span className="text-sm font-medium text-error">Are you absolutely sure?</span>
			<button
				onClick={async () => {
					await deleteAccount();
				}}
				className="btn btn-error btn-sm"
			>
				Yes, Delete Everything
			</button>
			<button
				onClick={() => setConfirming(false)}
				className="btn btn-ghost btn-sm"
			>
				Cancel
			</button>
		</div>
	);
}
