"use client";

import React from "react";
import { addressSchema, TCreateAddress } from "@/lib/schemas/addressFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";

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
import { createAddress } from "../_actions";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const AddressForm = () => {
	// 1. Define your form.
	const form = useForm<TCreateAddress>({
		resolver: zodResolver(addressSchema),
		defaultValues: {
			house_number: "test-house-number",
			street: "test-street",
			barangay: "test-barangay",
			municipality: "test-municipality",
			province: "test-province",
			zip_code: "test-zip_code",
			is_default: false,
			customer_id: "6ccc554f-5530-4988-8331-ee08d91123bf",
		},
	});

	// 2. Define a submit handler.
	const onSubmit: SubmitHandler<TCreateAddress> = async (
		values: TCreateAddress
	) => {
		const validatedValues = addressSchema.parse(values);
		try {
			await createAddress(validatedValues);
      form.reset();
			alert("Address created successfully");
		} catch (error) {
			console.error("Failed to create address", error);
			alert("Failed to create address");
		}
	};

	const onError = (error: FieldErrors<TCreateAddress>) => {
		console.log(error);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit, onError)}
				className="space-y-8"
			>
				<Card>
					<CardHeader>
						<CardTitle className="heading-1">
							Create Address
						</CardTitle>
					</CardHeader>

					<CardContent className="space-y-4">
						<FormField
							control={form.control}
							name="house_number"
							render={({ field }) => (
								<FormItem>
									<FormLabel>House Number</FormLabel>
									<FormControl>
										<Input
											className="bg-white"
											placeholder="158"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="street"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Street</FormLabel>
									<FormControl>
										<Input
											className="bg-white"
											placeholder="Bonifacio St."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="barangay"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Barangay</FormLabel>
									<FormControl>
										<Input
											className="bg-white"
											placeholder="Tinamnan"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="municipality"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Municipality</FormLabel>
									<FormControl>
										<Input
											className="bg-white"
											placeholder="Lucban"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="province"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Province</FormLabel>
									<FormControl>
										<Input
											className="bg-white"
											placeholder="Quezon"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="zip_code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Zip Code</FormLabel>
									<FormControl>
										<Input
											className="bg-white"
											placeholder="4328"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>

					<CardFooter>
						<Button type="submit">Create Address</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
};

export default AddressForm;
