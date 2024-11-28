import { z } from "zod";

export const wishlistSchema = z.object({
	id: z.string().uuid().optional(),
	customer_id: z.string().uuid(),
	product_variant_size_id: z.string().uuid(),
});

export type TCreateWishlist = z.infer<typeof wishlistSchema>;

export const deleteWishSchema = z.object({
	id: z.string().uuid()
})

export type TDeleteWish = z.infer<typeof deleteWishSchema>;