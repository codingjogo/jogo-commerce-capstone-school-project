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

export const createProductVariantColorSizesSchema = z.object({
	size: z.nativeEnum(PRODUCT_SIZES),
	stock: z.coerce.number().min(1, "required stock"),
	status: z.nativeEnum(SIZE_STATUS),
});

export const createProductVariantColorSchema = z.object({
	color: z.string().min(1, "required color"),
	images: z.array(z.string()).min(1, "required images"),
	sizes: z.array(createProductVariantColorSizesSchema),
});

export const createProductSchema = z.object({
	category: z.string().min(1, "required category"),
	name: z.string().min(1, "required name"),
	code: z.string().min(1, "required code"),
	price: z.coerce.number().min(1, "required price"),
	stock: z.coerce.number().min(1, "required stock"),
	status: z.nativeEnum(PRODUCT_STATUS),
	description: z.string().min(1, "required description"),
	variant_colors: z.array(createProductVariantColorSchema),
});

export type TCreateProduct = z.infer<typeof createProductSchema>;
