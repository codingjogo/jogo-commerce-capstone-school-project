import { z } from "zod";

export const addressSchema = z.object({
	id: z.string().uuid().optional(),
	house_number: z.string().min(1, "house number is required"),
	street: z.string().min(1, "street is required"),
	barangay: z.string().min(1, "barangay is required"),
	municipality: z.string().min(1, "municipality is required"),
	province: z.string().min(1, "province is required"),
	zip_code: z.string().min(1, "zip code is required"),
	is_default: z.boolean(),
	customer_id: z.string().uuid().optional(),
});

export type TCreateAddress = z.infer<typeof addressSchema>;

export const addressDefaultSchema = z.object({
	id: z.string().uuid(),
	is_default: z.boolean(),
})

export type TToggleDefaultAddres = z.infer<typeof addressDefaultSchema>;