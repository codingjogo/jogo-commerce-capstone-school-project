import { Product } from "@/app/(private)/admin/inventory/components/columns";
import prisma from "../db";

export async function getProductsData(): Promise<Product[]> {
	const products = await prisma.product.findMany({
		include: {
			category: true,
			product_variant_color: {
				include: {
					product_variant_size: true,
				},
			},
		},
	});

	return products.map((product) => {
		const colorSize = product.product_variant_color
			.map((colorVariant) => {
				const sizes = colorVariant.product_variant_size
					.map((size) => `${colorVariant.color} ${size.size}`)
					.join(", ");
				return sizes;
			})
			.join(", ");

		const firstColorVariant = product.product_variant_color[0];
		const firstImage = firstColorVariant?.images[0];

		return {
			id: product.id,
			image: firstImage || "/fallback-image.jpg",
			name: product.name,
			price: product.price,
			stock: product.product_variant_color.reduce(
				(totalStock, color) =>
					totalStock +
					color.product_variant_size.reduce((sum, size) => sum + size.stock, 0),
				0
			), // Total stock across all variants
			colorSize: colorSize || "N/A",
			category: product.category.name,
		};
	});
}

