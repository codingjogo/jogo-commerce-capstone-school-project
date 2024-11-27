"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { bagSchema, TCreateBag } from "@/lib/schemas/bagFormShema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addToBag } from "../../_actions";
import { ShoppingBagIcon } from "lucide-react";

const AddToBag = ({
	slug,
	quantity,
	product_id,
	product_variant_size_id,
	product_variant_color_id,
	customer_id,
	resetOnChange
}: {
	slug: string;
	quantity: number;
	product_id: string;
	product_variant_size_id: string;
	product_variant_color_id: string;
	customer_id: string;
	resetOnChange: {
		selectedColor: { id: string };
		selectedSize: { id: string };
	};
}) => {
	const form = useForm<TCreateBag>({
		resolver: zodResolver(bagSchema),
		defaultValues: {
			quantity: quantity | 1,
			product_id,
			product_variant_size_id,
			product_variant_color_id,
			customer_id,
		},
	});

	const onSubmit: SubmitHandler<TCreateBag> = async (data: TCreateBag) => {
		try {
			await addToBag(data, slug);
			alert("Product added to bag!");
			form.reset();
		} catch (error) {
			console.log("ERROR_CREATING_PRODUCT", error);
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onError = (error: any) => {
		console.log(error);
	};

	React.useEffect(() => {
		form.reset({
			product_variant_size_id: resetOnChange.selectedSize.id,
			product_variant_color_id: resetOnChange.selectedColor.id,
			quantity,
			product_id,
			customer_id,
		});
	}, [resetOnChange, form, quantity, product_id, customer_id]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit, onError)}>
				<FormField
					control={form.control}
					name="quantity"
					render={({ field }) => (
						<FormItem className="hidden">
							<FormLabel>Quantity</FormLabel>
							<FormControl>
								<Input
									placeholder="shadcn"
									{...field}
									onChange={(e) =>
										field.onChange(Number(e.target.value))
									}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="product_id"
					render={({ field }) => (
						<FormItem className="hidden">
							<FormLabel>Product ID</FormLabel>
							<FormControl>
								<Input placeholder="shadcn" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="product_variant_size_id"
					render={({ field }) => (
						<FormItem className="hidden">
							<FormLabel>Variant Size ID</FormLabel>
							<FormControl>
								<Input placeholder="shadcn" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="product_variant_color_id"
					render={({ field }) => (
						<FormItem className="hidden">
							<FormLabel>Variant Color ID</FormLabel>
							<FormControl>
								<Input placeholder="shadcn" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="customer_id"
					render={({ field }) => (
						<FormItem className="hidden">
							<FormLabel>Customer ID</FormLabel>
							<FormControl>
								<Input placeholder="shadcn" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full">
					<ShoppingBagIcon />
					Add to Bag
				</Button>
			</form>
		</Form>
	);
};

export default AddToBag;
