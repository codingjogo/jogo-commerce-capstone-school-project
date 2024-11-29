import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const AddressesPage = async () => {
	// const { userId } = await auth()

	const addresses = await prisma.address.findMany({
		where: { customer_id: "6ccc554f-5530-4988-8331-ee08d91123bf" },
	});

	if (!addresses) {
		notFound();
	}

	console.log("addresses", addresses);

	return (
		<section>
			<div className="container py-8 lg:py-12">
				<div className="flex items-start justify-between">
          <h1 className="text-4xl mb-6">Your Profile</h1>
          <Button type="button" variant={'secondary'} asChild>
            <Link href={'/profile/addresses/create'}>
              Create
            </Link>
          </Button>
        </div>

				<div>
					{addresses.map((address) => {
						const {
							house_number,
							street,
							barangay,
							municipality,
							province,
							zip_code,
							is_default,
						} = address;

						return (
							<Card key={address.id}>
								<CardContent className="p-4">
									{is_default && (
										<p>
											{is_default && "My Default Address"}
										</p>
									)}
									<p>
										<span className="font-semibold">
											Address:
										</span>{" "}
										{house_number} {street} {barangay}{" "}
										{municipality} {province} {zip_code}
									</p>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default AddressesPage;
