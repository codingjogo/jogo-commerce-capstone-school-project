import prisma from "@/lib/db"
import { notFound } from "next/navigation"

export async function getProductData(slug: string) {
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