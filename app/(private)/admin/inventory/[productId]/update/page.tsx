import React from "react";
import prisma from "@/lib/db";
import ProductForm from "../../components/product-form";
import { TCreateProduct } from "@/lib/schemas/productFormSchemas";

const UpdateProductPage = async ({
  params
} : {
  params: {
    productId: string;
  }
}) => {
	const categories = await prisma.category.findMany()
  const product = await prisma.product.findFirst({
    where: { id: params.productId },
    include: {
      product_variant_color: {
        include: {
          product_variant_size: true,
        }
      }
    }
  }) as TCreateProduct

	return (
		<section>
			<div className="p-6">
				<ProductForm categories={categories} product={product} />
			</div>
		</section>
	);
};

export default UpdateProductPage;
