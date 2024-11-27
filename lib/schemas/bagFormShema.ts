import { z } from "zod";

export const bagSchema = z.object({
	id: z.string().uuid().optional().nullable(),
	quantity: z.coerce.number().min(1, "at least input 1"),
	product_id: z.string().uuid(),
	product_variant_size_id: z.string().uuid(),
	product_variant_color_id: z.string().uuid(),
	customer_id: z.string().uuid(),
});

export type TCreateBag = z.infer<typeof bagSchema>;

export const updateQuantitySchema = z.object({
	id: z.string().uuid(),
})

export type TUpdateQuantity = z.infer<typeof updateQuantitySchema>;