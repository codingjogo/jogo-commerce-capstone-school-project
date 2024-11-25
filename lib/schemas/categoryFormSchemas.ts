import { z } from "zod";

export const createCategorySchema = z.object({
	name: z.string().min(1, "name is required"),
	slug: z.string().min(1, "slug is required"),
});

export type TCreateCategory = z.infer<typeof createCategorySchema>;