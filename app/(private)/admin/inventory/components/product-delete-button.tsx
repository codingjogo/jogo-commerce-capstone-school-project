"use client";

import {
	deleteProductSchema,
	TDeleteProduct,
} from "@/lib/schemas/productFormSchemas";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { deleteProduct } from "../_actions";
import { zodResolver } from "@hookform/resolvers/zod";

const ProductDeleteButton = ({productId} : {
  productId: string;
}) => {
	const form = useForm<TDeleteProduct>({
		resolver: zodResolver(deleteProductSchema),
		defaultValues: {
			id: productId,
		},
	});

	const onSubmit: SubmitHandler<TDeleteProduct> = async (
		values: TDeleteProduct
	) => {
		try {
			await deleteProduct(values);
			alert("Deleted a product");
		} catch (error) {
			console.error("Failed to delete product", error);
			alert("Failed to delete product");
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-0">
				<FormField
					control={form.control}
					name="id"
					render={({ field }) => (
						<FormItem className="hidden">
							<FormLabel>Product ID</FormLabel>
							<FormControl>
								<Input placeholder="shadcn" {...field} />
							</FormControl>
							<FormDescription>
								This is deleting a product.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full" variant="destructive">
					Delete
				</Button>
			</form>
		</Form>
	);
};

export default ProductDeleteButton;
