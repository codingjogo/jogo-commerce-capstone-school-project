'use server';

import prisma from "@/lib/db";
import { TCreateAddress, TToggleDefaultAddres } from "@/lib/schemas/addressFormSchema";
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

export async function toggleDefaultAddress(values: TToggleDefaultAddres) {
	try {
		await prisma.$transaction(async (tx) => {
			// Find the current default address for the same customer
			const currentDefaultAddress = await tx.address.findFirst({
				where: {
					customer_id: "6ccc554f-5530-4988-8331-ee08d91123bf", // Ensure `customer_id` is part of the request
					is_default: true,
				},
			});

			// If there is a current default, set it to false
			if (currentDefaultAddress) {
				await tx.address.update({
					where: { id: currentDefaultAddress.id },
					data: {
						is_default: false,
						updated_at: new Date(),
					},
				});
			}

			// Set the new address as default
			await tx.address.update({
				where: { id: values.id },
				data: {
					is_default: values.is_default,
					updated_at: new Date(),
				},
			});
		});

		return { success: true };

	} catch (error) {
		if (error instanceof z.ZodError) {
			console.log("ZOD ERROR, SERVER FAILED TO TOGGLE DEFAULT ADDRESS", error)
		}
		console.log("SERVER FAILED TO TOGGLE DEFAULT ADDRESS", error)
	}
}