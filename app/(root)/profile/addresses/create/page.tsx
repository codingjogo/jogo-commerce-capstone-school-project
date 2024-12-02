import React from "react";
import AddressForm from "../components/address-form";
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

const CreateAddressPage = async () => {
	const user = await currentUser();

	if (!user) {
		notFound();
	}

	const user_id = await prisma.customer.findFirst({
		where: { clerk_user_id: user.id },
		select: {
			id: true,
		},
	});

	if (!user_id) {
		notFound();
	}

	return (
		<section>
			<div className="container py-8 lg:py-12">
				<AddressForm customer_id={user_id.id} />
			</div>
		</section>
	);
};

export default CreateAddressPage;
