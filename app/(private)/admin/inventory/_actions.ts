"use server";

import prisma from "@/lib/db";
import {
	TCreateProduct,
	TDeleteProduct,
} from "@/lib/schemas/productFormSchemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(data: TCreateProduct) {
	try {
		await prisma.product.create({
			data: {
				name: data.name,
				description: data.description,
				category_id: data.category_id,
				price: data.price,
				status: data.status,
				slug: data.slug,
				code: data.code,
				product_variant_color: {
					create: data.product_variant_color.map((variant) => ({
						color: variant.color,
						images: variant.images,
						product_variant_size: {
							create: variant.product_variant_size.map(
								(size) => ({
									size: size.size,
									stock: size.stock,
									status: size.status,
								})
							),
						},
					})),
				},
			},
		});
	} catch (error) {
		console.error("Error creating product:", error);
		throw new Error("Failed to create product");
	}

	revalidatePath("/admin/inventory");
	redirect("/admin/inventory");
}

export async function deleteProduct(values: TDeleteProduct) {
	try {
		const { id } = values;

		await prisma.product.delete({
			where: { id },
		});
	} catch (error) {
		console.error("Error deleting product:", error);
		throw new Error("Failed to deleting product");
	}

	revalidatePath("/admin/inventory");
	redirect("/admin/inventory");
}
