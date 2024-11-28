'use client';

import React from "react";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	TCreateWishlist,
	wishlistSchema,
} from "@/lib/schemas/wishlistFormSchemas";
import { addToWishlist } from "../../_actions";
import { HeartIcon } from "lucide-react";

const AddToWishlist = ({
	product_variant_size_id,
	customer_id,
}: {
	slug: string;
	product_variant_size_id: string;
	customer_id: string;
}) => {
	const form = useForm<TCreateWishlist>({
		resolver: zodResolver(wishlistSchema),
		defaultValues: {
			customer_id,
			product_variant_size_id,
		},
	});

	const onSubmit = async (values: TCreateWishlist) => {
		try {
			const validatedData = wishlistSchema.parse(values);

			await addToWishlist(validatedData);
			alert("Product added to wishlist!");
			form.reset();
		} catch (error) {
			console.log("Error creating wishlist", error);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
				<FormField
					control={form.control}
					name="customer_id"
					render={({ field }) => (
						<FormItem className="hidden">
							<FormLabel>Customer ID</FormLabel>
							<FormControl>
								<Input
									placeholder="Customer ID (e.g 1234-5678-123)"
									{...field}
								/>
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
							<FormLabel>Product Variant Size ID</FormLabel>
							<FormControl>
								<Input
									placeholder="Product Variant Size ID (e.g 1234-5678-123)"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="w-full" variant={'outline'} type="submit"><HeartIcon />Add to Wishlist</Button>
			</form>
		</Form>
	);
};

export default AddToWishlist;
