import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import Addresses from "./components/addresses";

const AddressesPage = async () => {
	const addresses = await prisma.address.findMany({
		where: { customer_id: "6ccc554f-5530-4988-8331-ee08d91123bf" },
		include: {
			customer: true,
		},
	});

	if (!addresses) {
		notFound();
	}

	return (
		<section>
			<div className="container py-8 lg:py-12">
				<div className="flex items-start justify-between">
					<h1 className="text-4xl mb-6">Your Address</h1>
					<Button type="button" variant={"secondary"} asChild>
						<Link href={"/profile/addresses/create"}>Create</Link>
					</Button>
				</div>

				<Addresses addresses={addresses} />
			</div>
		</section>
	);
};

export default AddressesPage;
