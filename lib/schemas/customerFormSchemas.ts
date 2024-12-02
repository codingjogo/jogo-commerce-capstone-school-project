import { z } from "zod";

export const userSchema = z.object({
	id: z.string().uuid().optional(),
	email: z.string().uuid(),
	clerk_user_id: z.string(),
	first_name: z.string().min(1, "required first name"),
	last_name: z.string().min(1, "required last name"),
});

export type TCreateUser = z.infer<typeof userSchema>;