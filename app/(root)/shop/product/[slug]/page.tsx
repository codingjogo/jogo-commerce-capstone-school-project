import { notFound } from 'next/navigation'
import ProductDetail from './components/product-detail'
import { CourierOption, Review } from '@/lib/types'
import prisma from '@/lib/db'

async function getProductData(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: {
        select: { name: true, slug: true },
      },
      product_variant_color: {
        include: {
          product_variant_size: true,
        },
      },
    },
  })

  if (!product) {
    notFound()
  }

  return product
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductData(params.slug)

  // Mock data for courier options and reviews
  const courierOptions: CourierOption[] = [
    { id: '1', name: 'Standard Shipping', price: 5.99, estimatedDelivery: '3-5 business days' },
    { id: '2', name: 'Express Shipping', price: 15.99, estimatedDelivery: '1-2 business days' },
  ]

  const reviews: Review[] = [
    { id: '1', rating: 5, comment: 'Great product!', userName: 'John Doe', createdAt: '2023-05-01' },
    { id: '2', rating: 4, comment: 'Good quality, but a bit pricey.', userName: 'Jane Smith', createdAt: '2023-04-28' },
  ]

  return <ProductDetail product={product} courierOptions={courierOptions} reviews={reviews} />
}

