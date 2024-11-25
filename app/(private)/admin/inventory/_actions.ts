'use server';

import prisma from '@/lib/db';
import { createProductSchema, TCreateProduct } from '@/lib/schemas/productFormSchemas';

export async function createProduct(data: TCreateProduct) {
	try {
		const validatedData = createProductSchema.parse(data);

		const product = await prisma.product.create({
			data: {
				name: validatedData.name,
				description: validatedData.description,
				category_id: validatedData.category_id,
				price: validatedData.price,
				status: validatedData.status,
				slug: validatedData.slug,
				code: validatedData.code,
				product_variant_color: {
					create: validatedData.product_variant_color.map((variant) => ({
						color: variant.color,
						images: variant.images,
						product_variant_size: {
							create: variant.product_variant_size.map((size) => ({
								size: size.size,
								stock: size.stock,
								status: size.status,
							})),
						},
					})),
				},
			},
		});

		return product;
	} catch (error) {
		console.error('Error creating product:', error);
		throw new Error('Failed to create product');
	}
}
