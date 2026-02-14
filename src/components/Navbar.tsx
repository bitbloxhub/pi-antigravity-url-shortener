"use client";

import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function Navbar() {
	const { data: session, isPending } = useSession();
	const router = useRouter();

	const handleSignOut = async () => {
		await signOut();
		router.push("/");
	};

	return (
		<div className="navbar bg-base-100 shadow-sm px-4">
			<div className="flex-1">
				<Link href="/" className="btn btn-ghost text-xl">
					URL Shortener
				</Link>
			</div>
			<div className="flex-none gap-2">
				{isPending ? (
					<span className="loading loading-spinner loading-sm"></span>
				) : session ? (
					<div className="dropdown dropdown-end">
						<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
							<div className="w-10 rounded-full">
								<img
									alt="Avatar"
									src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}`}
								/>
							</div>
						</div>
						<ul
							tabIndex={0}
							className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
						>
							<li>
								<Link href="/dashboard">Dashboard</Link>
							</li>
							<li>
								<button onClick={handleSignOut}>Sign Out</button>
							</li>
						</ul>
					</div>
				) : (
					<div className="flex gap-2">
						<Link href="/signin" className="btn btn-ghost">
							Sign In
						</Link>
						<Link href="/signup" className="btn btn-primary">
							Sign Up
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
