"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboardIcon, PackageIcon, TruckIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import SoulePsycleLogo from "@/public/soule-psycle-logo.jpg";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
	{
		href: "/admin/dashboard",
		label: "Dashboard",
		icon: LayoutDashboardIcon,
	},
	{
		href: "/admin/inventory",
		label: "Inventory",
		icon: PackageIcon,
	},
	{
		href: "/admin/orders",
		label: "Orders",
		icon: TruckIcon,
	},
];

const AdminNavbar = () => {
	const pathname = usePathname();
	const router = useRouter();

	return (
		<aside className="p-1 min-h-screen bg-gray-100 flex flex-col justify-between">
			<nav className="flex flex-col gap-1 justify-between">
				<div className="bg-primary text-white p-1 flex flex-col gap-4">
					<Link href={"/"}>
						<div className="relative w-full h-12 md:h-24 rounded-xl">
							<Image
								src={SoulePsycleLogo}
								alt="soule-psycle-logo"
								fill
								className="object-contain rounded-xl"
							/>
						</div>
					</Link>

					<h2 className="text-center hidden md:block text-xl md:text-2xl font-bold">
						SoulePsycle
					</h2>
				</div>

				<ul className="flex flex-col gap-1">
					{NAV_LINKS.map((link) => {
						const { href, icon: LinkIcon, label } = link;

						return (
							<li key={href}>
								<Button
									className="justify-start w-full py-6 md:px-14 hover:bg-primary hover:text-white shadow-md"
									variant={
										pathname === href
											? "default"
											: "secondary"
									}
									asChild
								>
									<Link href={href}>
										<LinkIcon />
										<p className="hidden md:block">{label}</p>
									</Link>
								</Button>
							</li>
						);
					})}
				</ul>
			</nav>

			{/* Signout */}
			<div className="p-2">
				<SignedIn>
					{/* Mount the UserButton component */}
					<UserButton>
						<UserButton.MenuItems>
							<UserButton.Action
								label="Dashboard"
								labelIcon={<LayoutDashboardIcon />}
								onClick={() => router.push("/admin/dashboard")}
							/>
						</UserButton.MenuItems>
					</UserButton>
				</SignedIn>
			</div>
		</aside>
	);
};

export default AdminNavbar;
