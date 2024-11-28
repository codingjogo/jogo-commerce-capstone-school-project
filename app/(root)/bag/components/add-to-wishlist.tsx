"use client";

import {
	TCreateWishlist,
	wishlistSchema,
} from "@/lib/schemas/wishlistFormSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HeartIcon } from "lucide-react";
import { addToWishlist } from "../../shop/product/_actions";
import { Button } from "@/components/ui/button";

const AddToWishlist = ({
	customer_id,
	product_variant_size_id,
  bagItemId,
}: {
	customer_id: string;
	product_variant_size_id: string;
  bagItemId: string;
}) => {
	// 1. Define your form.
	const form = useForm<TCreateWishlist>({
		resolver: zodResolver(wishlistSchema),
		defaultValues: {
			customer_id,
			product_variant_size_id,
		},
	});

	// 2. Define a submit handler.
	const onSubmit: SubmitHandler<TCreateWishlist> = async (
		values: TCreateWishlist
	) => {
		const validatedValues = wishlistSchema.parse(values);
		try {
			await addToWishlist(validatedValues, bagItemId);
			alert("Added to wishlist");
		} catch (error) {
			console.log("ERROR ADDING TO WISHLIST", error);
		}
	};

	const onError = (err: FieldErrors<TCreateWishlist>): void => {
		console.log("ERROR ADDING TO WISHLIST", err);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit, onError)}>
				<FormField
					control={form.control}
					name="customer_id"
					render={({ field }) => (
						<FormItem className="hidden">
							<FormLabel>Customer ID</FormLabel>
							<FormControl>
								<Input placeholder="customer_id" {...field} />
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
							<FormLabel>Customer ID</FormLabel>
							<FormControl>
								<Input placeholder="customer_id" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">
					<HeartIcon />
				</Button>

				{/* <AlertDialog>
					<AlertDialogTrigger><HeartIcon /></AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Are you absolutely sure?
							</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will
								 delete your bag item and add it to your wihlist.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel asChild>
              <Button type="button">
                  Cancel
                </Button>
              </AlertDialogCancel>
							<AlertDialogAction asChild>
                <Button type="submit">
                  Continue
                </Button>
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog> */}
			</form>
		</Form>
	);
};

export default AddToWishlist;
