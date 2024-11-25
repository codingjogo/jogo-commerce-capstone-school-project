// File: seed.ts

import { PRODUCT_SIZES, PRODUCT_STATUS, SIZE_STATUS } from '@/lib/schemas/productFormSchemas';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Array of products with variant colors and sizes
  const products = [
    {
      name: 'Product 1',
      description: 'Description for Product 1',
      price: 10.99,
      status: 'ACTIVE',
      slug: 'product-1',
      code: 'test-code-1',
      category_id: "1fb0c3d1-5470-4832-8056-3d9e7536a285",
      variants: [
        {
          color: 'Red',
          images: ['red1.jpg', 'red2.jpg'],
          sizes: [
            { size: 'S', stock: 10, status: 'AVAILABLE' },
            { size: 'M', stock: 5, status: 'LOW_OF_STOCK' },
          ],
        },
        {
          color: 'Blue',
          images: ['blue1.jpg', 'blue2.jpg'],
          sizes: [
            { size: 'L', stock: 15, status: 'AVAILABLE' },
            { size: 'XL', stock: 0, status: 'OUT_OF_STOCK' },
          ],
        },
      ],
    },
    {
      name: 'Product 2',
      description: 'Description for Product 2',
      price: 15.99,
      status: 'DISCONTINUED',
      slug: 'product-2',
      code: 'test-code-2',
      category_id: "1fb0c3d1-5470-4832-8056-3d9e7536a285",
      variants: [
        {
          color: 'Green',
          images: ['green1.jpg', 'green2.jpg'],
          sizes: [
            { size: 'S', stock: 20, status: 'AVAILABLE' },
            { size: 'M', stock: 8, status: 'LOW_OF_STOCK' },
          ],
        },
      ],
    },
  ];

  for (const product of products) {
    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        status: product.status as PRODUCT_STATUS,
        code: product.code,
        slug: product.slug,
        category_id: product.category_id,
        product_variant_color: {
          create: product.variants.map((variant) => ({
            color: variant.color,
            images: variant.images,
            product_variant_size: {
              create: variant.sizes.map((size) => ({
                size: size.size as PRODUCT_SIZES,
                stock: size.stock,
                status: size.status as SIZE_STATUS,
              })),
            },
          })),
        },
      },
      include: {
        product_variant_color: {
          include: {
            product_variant_size: true
          }
        }
      }
    });
    console.log(`Created product: ${createdProduct.name}`);
  }

  console.log('Products with variants seeded successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error seeding products:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
