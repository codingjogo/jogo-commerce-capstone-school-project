"use server";

import prisma from "@/lib/db";
import { TUpdateQuantity } from "@/lib/schemas/bagFormShema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function incrementQuantity(values: TUpdateQuantity) {
	try {
		await prisma.bag.update({
			where: { id: values.id },
			data: {
				quantity: {
					increment: 1,
				},
			},
		});
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.log("ZOD_ERROR_INCREMENT_QUANTITY_[ACTION]", error);
		}
		console.log("ZOD_ERROR_INCREMENT_QUANTITY_[ACTION]");
	}
}

export async function decrementQuantity(values: TUpdateQuantity) {
	try {
		const bagItem = await prisma.bag.findFirst({
			where: { id: values.id },
		});

		if (bagItem?.quantity === 1) {
			await prisma.bag.update({
				where: { id: values.id },
				data: {
					quantity: {
						decrement: 1,
					},
				},
			});

			await prisma.bag.delete({
				where: { id: values.id },
			});
		} else {
			await prisma.bag.update({
				where: { id: values.id },
				data: {
					quantity: {
						decrement: 1,
					},
				},
			});
		}
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.log("ZOD_ERROR_DECREMENT_QUANTITY_[ACTION]", error);
		}
		console.log("ZOD_ERROR_DECREMENT_QUANTITY_[ACTION]");
	}

	revalidatePath("/bag");
}
