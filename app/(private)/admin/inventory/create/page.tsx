import React from "react";
import CreateProductForm from "../components/create-product-form";
import prisma from "@/lib/db";

const CreateProductPage = async () => {

	const categories = await prisma.category.findMany();

	return (
		<section>
			<div className="p-6">
				<CreateProductForm categories={categories} />
			</div>
		</section>
	);
};

export default CreateProductPage;
