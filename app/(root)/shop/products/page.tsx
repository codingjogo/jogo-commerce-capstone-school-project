import prisma from "@/lib/db";
import ProductList from "./components/product-list";
import { getProducts } from "@/lib/data/shop/products";

async function getCategories() {
	return prisma.category.findMany({
		select: { id: true, name: true, slug: true },
	});
}

export default async function ProductsPage({
	searchParams,
}: {
	searchParams: { page: string };
}) {
	const page = parseInt(searchParams.page) || 1;
	const pageSize = 12;

	const { products, totalProducts } = await getProducts(page, pageSize);
	const categories = await getCategories();

	return (
		<section>
			<div className="container py-8 lg:py-12">
				<h1 className="text-4xl mb-6">Shop All Products</h1>
				<ProductList
					initialProducts={products}
					totalProducts={totalProducts}
					categories={categories}
					initialPage={page}
					pageSize={pageSize}
				/>
			</div>
		</section>
	);
}
