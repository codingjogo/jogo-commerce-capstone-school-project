import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import Addresses from "./components/addresses";
import { currentUser } from "@clerk/nextjs/server";

const AddressesPage = async () => {
	const user = await currentUser();

	if (!user) {
		notFound();
	}

	const user_id = await prisma.customer.findFirst({
		where: { clerk_user_id: user.id },
		select: {
			id: true
		}
	})

	if (!user_id) {
		notFound();
	}

	const addresses = await prisma.address.findMany({
		where: { customer_id: user_id.id },
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
