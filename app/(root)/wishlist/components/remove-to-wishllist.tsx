'use client';

import React from "react";
import {
	deleteWishSchema,
	TDeleteWish,
} from "@/lib/schemas/wishlistFormSchemas";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { removeToWishlist } from "../../shop/product/_actions";
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
import { HeartOffIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

const RemoveToWishlist = ({wishlistId} : {
  wishlistId: string;
}) => {
	const form = useForm<TDeleteWish>({
		resolver: zodResolver(deleteWishSchema),
		defaultValues: {
			id: wishlistId,
		},
	});

	// 2. Define a submit handler.
	const onSubmit: SubmitHandler<TDeleteWish> = async (
		values: TDeleteWish
	) => {
		const validatedValues = deleteWishSchema.parse(values);

		try {
			await removeToWishlist(validatedValues);
      alert('Removed successfully from wish list')
		} catch (error) {
			console.error("Failed to delete wish", error);
			alert("Failed to delete wish");
		}
	};

  const onError: (errors: FieldErrors<TDeleteWish>) => void = (errors) => {
    console.error(errors);
  };

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit, onError)}>
				<FormField
					control={form.control}
					name="id"
					render={({ field }) => (
						<FormItem className="hidden">
							<FormLabel>Bag Item ID</FormLabel>
							<FormControl>
								<Input placeholder="Bag Item ID" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" variant="outline">
					<HeartOffIcon />
				</Button>
			</form>
		</Form>
	);
};

export default RemoveToWishlist;
