import { z } from "zod";

export enum SIZE_STATUS {
	AVAILABLE = "AVAILABLE",
	OUT_OF_STOCK = "OUT_OF_STOCK",
}

export enum PRODUCT_STATUS {
	ACTIVE = "ACTIVE",
	DISCONTINUED = "DISCONTINUED",
	ARCHIVED = "ARCHIVED",
}

export enum PRODUCT_SIZES {
	XS = "XS",
	S = "S",
	M = "M",
	L = "L",
	XL = "XL",
	XXL = "XXL",
}

export const createProductVariantSize = z.object({
	id: z.string().uuid().optional().nullable(),
	size: z.nativeEnum(PRODUCT_SIZES),
  stock: z.coerce.number().min(1, "stock is required"),
  status: z.nativeEnum(SIZE_STATUS),
})

export type TCreateProductVariantSize = z.infer<typeof createProductVariantSize>;

export const createProductVariantColor = z.object({
	id: z.string().uuid().optional().nullable(),
	color: z.string().min(1, "color is required"),
	images: z.array(z.string()).min(1, "images is required"),
	product_variant_size: z.array(createProductVariantSize)
});

export type TCreateProductVariantColor = z.infer<typeof createProductVariantColor>;

export const createProductSchema = z.object({
	id: z.string().uuid().optional().nullable(),
	name: z.string().min(1, "name is required"),
	category_id: z.string().uuid(),
	description: z.string().min(1, "description is required"),
	price: z.coerce.number().min(1, "price is required"),
	status: z.nativeEnum(PRODUCT_STATUS),
	slug: z.string().min(1, "slug is required"),
	code: z.string().min(1, "code is required"),
	product_variant_color: z.array(createProductVariantColor),
});

export type TCreateProduct = z.infer<typeof createProductSchema>;

export const deleteProductSchema = z.object({
	id: z.string().uuid(),
})

export type TDeleteProduct = z.infer<typeof deleteProductSchema>;