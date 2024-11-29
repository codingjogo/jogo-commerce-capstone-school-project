import React from "react";
import BagItemList from "./components/bag-item-list";
import prisma from "@/lib/db";
import OrderSummary from "./components/order-summary";

const BagPage = async () => {
	const bagItems = await prisma.bag.findMany({
		where: {
			customer_id: "6ccc554f-5530-4988-8331-ee08d91123bf" // change with the actual customer ID
		},
		include: {
			product: {
				include: {
					product_variant_color:true
				}
			},
			product_variant_size: true,
		}
	})

	const categories = await prisma.category.findMany();

	return (
		<section className="container py-6">
			<h1 className="text-4xl mb-6">Your Bag</h1>
			<div className="flex flex-col lg:flex-row items-start gap-6">
				<BagItemList bagItems={bagItems} categories={categories} />
				<OrderSummary />
			</div>
		</section>
	);
};

export default BagPage;