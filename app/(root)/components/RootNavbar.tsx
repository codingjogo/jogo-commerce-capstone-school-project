"use client";

import React from "react";
import RootNavLinks from "./RootNavLinks";
import Link from "next/link";
import Image from "next/image";
import SoulePsycleLogo from "@/public/soule-psycle-logo.jpg";
import { cn } from "@/lib/utils";

const RootNavbar = () => {
	const [isScrolled, setIsScrolled] = React.useState(false);

	React.useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={cn(
				"py-2 sticky top-0 z-50 transition-colors duration-300",
				isScrolled
					? "bg-white text-gray-900 shadow-md"
					: "bg-transparent text-white"
			)}
		>
			<div className="container flex items-center justify-between">
				<Link href={"/"} className="relative w-12 h-12 rounded-xl">
					<Image
						src={SoulePsycleLogo}
						alt="soule-psycle-logo"
						fill
						className="rounded-xl object-cover"
					/>
				</Link>
				<nav className="">
					<RootNavLinks />
				</nav>
			</div>
		</header>
	);
};

export default RootNavbar;
