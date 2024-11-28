import React from "react";
import prisma from "@/lib/db";
import Wishlist from "./components/wishlist";

const WishlistPage = async () => {
	const whistLists = await prisma.wishlist.findMany({
		where: {
			customer_id: "6ccc554f-5530-4988-8331-ee08d91123bf" // change with the actual customer ID
		},
		include: {
			product_variant_size: {
        include: {
          product_variant_color: {
						include: {
							product: true
						}
					},
        }
			}
		}
	})

	const categories = await prisma.category.findMany();

	return (
		<section className="container py-6">
			<h1 className="text-4xl mb-6">Your Wishlist</h1>
			<Wishlist whistLists={whistLists} categories={categories} />
		</section>
	);
};

export default WishlistPage;