"use client";

import React from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { usePathname } from "next/navigation";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const RootMobileNavLinks = () => {
	const [openSheet, setOpenSheet] = React.useState(false);
	const pathname = usePathname();

	return (
		<Sheet open={openSheet} onOpenChange={setOpenSheet}>
			<SheetTrigger className="text-slate-900 block md:hidden z-50">
				<MenuIcon className="w-6" />
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>SoulePsycle.com</SheetTitle>
					<SheetDescription>
						[soul•cycle] shouting your sighs. All our designs are
						copyright of our store. DO NOT REPRINT.
					</SheetDescription>
				</SheetHeader>
				<div>
					<ul className="mt-6 flex flex-col items-end gap-4">
						{NAV_LINKS.map((link) => {
							const { href, icon: LinkIcon, label } = link;

							return (
								<li key={href}>
									<Button
										className="text-lg"
										variant={"link"}
										onClick={() => {
											setOpenSheet(false);
										}}
										asChild
									>
										<Link href={href}>
											<LinkIcon className="w-4" /> {label}
											{pathname === "/bag" && <>(0)</>}
										</Link>
									</Button>
								</li>
							);
						})}
					</ul>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default RootMobileNavLinks;
