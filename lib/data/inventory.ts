import { Product } from "@/app/(private)/admin/inventory/components/columns";
import prisma from "../db";

export async function getProductsData(): Promise<Product[]> {
	const products = await prisma.product.findMany({
		include: {
			category: true, // To get the category name
			product_variant_color: {
				include: {
					product_variant_size: true, // Get sizes and stock for each color variant
				},
			},
		},
	});

	return products.map((product) => {
		const firstColorVariant = product.product_variant_color[0];
		const firstImage = firstColorVariant?.images[0];
		const firstSizeVariant = firstColorVariant?.product_variant_size[0];

		return {
			id: product.id,
			image: firstImage || "/fallback-image.jpg",
			name: product.name,
			price: product.price,
			stock: firstSizeVariant?.stock || 0,
			color: firstColorVariant?.color || "N/A",
			size: firstSizeVariant?.size || "N/A",
			category: product.category.name,
		};
	});
}
