import React from "react";
import prisma from "@/lib/db";
import ProductForm from "../components/product-form";

const CreateProductPage = async () => {


	const categories = await prisma.category.findMany()


	return (
		<section>
			<div className="p-6">
				<ProductForm categories={categories} />
			</div>
		</section>
	);
};

export default CreateProductPage;
