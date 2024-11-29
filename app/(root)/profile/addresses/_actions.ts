'use server';

import prisma from "@/lib/db";
import { TCreateAddress } from "@/lib/schemas/addressFormSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function createAddress(values: TCreateAddress) {
	const {
		house_number,
		street,
		barangay,
		municipality,
		province,
		zip_code,
		is_default,
		customer_id,
	} = values;

	try {
		await prisma.address.create({
			data: {
				house_number,
				street,
				barangay,
				municipality,
				province,
				zip_code,
				is_default,
				customer_id: customer_id as string,
			},
		});
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.log("ZOD_ERROR_CREATE_ADDRESS", error);
		}
		console.log("FAILED_CREATE_ADDRESS", error);
	}

	revalidatePath("/profile");
	redirect("/profile");
}
