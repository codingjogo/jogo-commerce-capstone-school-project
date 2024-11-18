import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero = () => {
	return (
		<div className="container py-32 lg:py-60 flex items-center justify-center">
			<div className="flex flex-col items-center gap-6">
				<div className="flex flex-col gap-4 items-center justify-center">
					<h1 className="text-hero">SoulePsycle.com</h1>
					<p className="text-lg text-muted-foreground">
						[soul•cycle] shouting your sighs. All our designs are
						copyright of our store. DO NOT REPRINT.
					</p>
				</div>

				<Button className="w-fit text-lg" size={'lg'} asChild>
                    <Link href={'/shop'}>
                        Shop Now!<ChevronRightIcon className="w-6" />
                    </Link>
                </Button>
			</div>
		</div>
	);
};

export default Hero;
