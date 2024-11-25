import prisma from "@/lib/db"
import ProductList from "./components/product-list"


async function getProducts(page: number = 1, pageSize: number = 12) {
  const products = await prisma.product.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
    orderBy: { created_at: 'desc' },
    include: {
      category: {
        select: { name: true, slug: true },
      },
      product_variant_color: {
        select: { images: true },
      },
    },
  })

  const totalProducts = await prisma.product.count()

  return { products, totalProducts }
}

async function getCategories() {
  return prisma.category.findMany({
    select: { id: true, name: true, slug: true },
  })
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  const page = parseInt(searchParams.page) || 1
  const pageSize = 12

  const { products, totalProducts } = await getProducts(page, pageSize)
  const categories = await getCategories()

  return (
    <ProductList
      initialProducts={products}
      totalProducts={totalProducts}
      categories={categories}
      initialPage={page}
      pageSize={pageSize}
    />
  )
}

