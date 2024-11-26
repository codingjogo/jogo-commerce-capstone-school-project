import prisma from "@/lib/db";

export async function getProducts(page: number = 1, pageSize: number = 12) {
	const products = await prisma.product.findMany({
		take: pageSize,
		skip: (page - 1) * pageSize,
		orderBy: { created_at: "desc" },
		include: {
			category: {
				select: { name: true, slug: true },
			},
			product_variant_color: {
				select: { images: true },
			},
		},
	});

	const totalProducts = await prisma.product.count();

	return { products, totalProducts };
}