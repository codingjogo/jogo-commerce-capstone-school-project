import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero = () => {
	return (
		<div className="container py-32 lg:py-60 flex items-center justify-center">
			<div className="flex flex-col items-center gap-6">
				<div className="flex flex-col gap-4 items-center justify-center">
					<h1 className="break-words text-center text-4xl sm:text-5xl md:text-6xl font-extrabold">
						SoulePsycle.com
					</h1>

					<p className="break-words max-w-xl text-center text-lg sm:text-xl md:text-2xl text-muted-foreground">
						[soul•cycle] shouting your sighs. All our designs are
						copyright of our store. DO NOT REPRINT.
					</p>
				</div>

				<Button
					className="w-fit text-lg md:text-2xl py-6 md:py-8"
					size={"lg"}
					asChild
				>
					<Link href={"/shop"}>
						Shop Now!
						<ChevronRightIcon size={20} />
					</Link>
				</Button>
			</div>
		</div>
	);
};

export default Hero;
