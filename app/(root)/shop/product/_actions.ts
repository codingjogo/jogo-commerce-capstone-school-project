"use server";

import prisma from "@/lib/db";
import { TCreateBag } from "@/lib/schemas/bagFormShema";
import { TCreateWishlist, TDeleteWish } from "@/lib/schemas/wishlistFormSchemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function addToBag(data: TCreateBag, slug: string) {
	try {
		await prisma.bag.create({
			data: {
				quantity: data.quantity,
				product_id: data.product_id,
				product_variant_size_id: data.product_variant_size_id,
				product_variant_color_id: data.product_variant_color_id,
				customer_id: data.customer_id,
			},
		});
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.log("ZOD_ERROR_ADD_TO_BAG_[ACTION]", error);
		}

		console.log("ADD_TO_BAG_ERROR_[ACTION]", error);
	}

	revalidatePath(`/shop/product/${slug}`);
}

export async function addToWishlist(data: TCreateWishlist, bagItem: string) {
	try {
		await prisma.$transaction([
			prisma.wishlist.createMany({
				data: {
					customer_id: data.customer_id,
					product_variant_size_id: data.product_variant_size_id,
				},
			}),
			prisma.bag.deleteMany({
				where: {
					id: bagItem,
				},
			}),
		]);
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.log("ZOD_ERROR_ADD_TO_WISHLIST_[ACTION]", error);
		}
		console.log("ADD_TO_WISHLIST_ERROR_[ACTION]", error);
	}

  revalidatePath('/bag')
}

export async function removeToWishlist(values: TDeleteWish) {
	try {
		await prisma.wishlist.delete({where: { id: values.id }})
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.log("ZOD_ERROR_REMOVE_TO_WISHLIST_[ACTION]", error);
		}
		console.log("REMOVE_TO_WISHLIST_ERROR_[ACTION]", error);
	}

	revalidatePath('/wishlist')
}