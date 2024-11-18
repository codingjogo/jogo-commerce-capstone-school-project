"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import RootMobileNavLinks from "./RootMobileNavLinks";

const RootNavLinks = () => {
	const pathname = usePathname();

	return (
		<>
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
			<RootMobileNavLinks />
		</>
	);
};

export default RootNavLinks;
