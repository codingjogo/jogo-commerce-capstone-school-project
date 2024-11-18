"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import RootMobileNavLinks from "./RootMobileNavLinks";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { LayoutDashboardIcon } from "lucide-react";

const RootNavLinks = () => {
	const pathname = usePathname();
	const router = useRouter();

	return (
		<>
			<div className="flex items-center gap-4">
				<ul className="hidden md:flex items-center gap-6">
					{NAV_LINKS.map((link) => {
						const { href, icon: LinkIcon, label } = link;

						return (
							<li key={href}>
								<Button
									variant={"link"}
									className={cn(
										"text-muted-foreground hover:text-primary",
										pathname === href
											? "text-primary underline underline-offset-4"
											: null
									)}
									asChild
								>
									<Link href={href}>
										<LinkIcon className="w-4" />
										{label}
										{href === "/bag" && <>&nbsp;(0)</>}
									</Link>
								</Button>
							</li>
						);
					})}
				</ul>
				<div className="hidden md:block">
					<SignedIn>
						{/* Mount the UserButton component */}
						<UserButton>
							<UserButton.MenuItems>
								<UserButton.Action
									label="Dashboard"
									labelIcon={<LayoutDashboardIcon />}
									onClick={() => router.push('/admin/dashboard')}
								/>
							</UserButton.MenuItems>
						</UserButton>
					</SignedIn>
				</div>
			</div>

			<div className="flex md:hidden gap-4">
				<SignedIn>
					{/* Mount the UserButton component */}
					<UserButton>
						<UserButton.MenuItems>
							<UserButton.Action
								label="Open chat"
								labelIcon={<LayoutDashboardIcon />}
								onClick={() => alert("init chat")}
							/>
						</UserButton.MenuItems>
					</UserButton>
				</SignedIn>
				<RootMobileNavLinks />
			</div>
		</>
	);
};

export default RootNavLinks;
