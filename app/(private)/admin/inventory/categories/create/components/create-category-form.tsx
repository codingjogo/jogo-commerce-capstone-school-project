"use client";

import {
	createCategorySchema,
	TCreateCategory,
} from "@/lib/schemas/categoryFormSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { createCategory } from "../_actions";
import { slugify } from "@/lib/helper";

const CreateCategoryForm = () => {
	const [slug, setSlug] = React.useState("");

	const router = useRouter();

	// 1. Define your form.
	const form = useForm<TCreateCategory>({
		resolver: zodResolver(createCategorySchema),
		defaultValues: {
			name: "",
			slug: slug,
		},
	});

	// 2. Define a submit handler.
	const onSubmit: SubmitHandler<TCreateCategory> = async (
		values: TCreateCategory
	) => {
		const newCategory = await createCategory(values);

		alert("Successful creating a category");

		router.refresh();
		router.back();

		return newCategory;
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onError = (error: any) => {
		console.log(error);
	};

	const nameValue = form.watch("name");
	const slugValue = slugify(nameValue);

	React.useEffect(() => {
		form.setValue("slug", slugValue, { shouldValidate: true });
	}, [nameValue, form, slugValue]);

	return (
		<Card>
			<CardHeader className="pb-0">
				<CardTitle className="text-admin-h1">Create Category</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit, onError)}>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											placeholder="tote bag"
											{...field}
											onChange={(e) => {
												field.onChange(e.target.value);
												setSlug(e.target.value);
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="slug"
							render={({ field }) => (
								<FormItem className="hidden">
									<FormLabel>Slug</FormLabel>
									<FormControl>
										<Input
											placeholder="auto-generated slug"
											{...field}
											value={slugValue} // Controlled value
											readOnly // Prevent direct editing
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="mt-4 flex items-center gap-2">
							<Button
								type="button"
								variant={"outline"}
								onClick={() => router.push(`/admin/inventory`)}
							>
								Cancel
							</Button>
							<Button type="submit">Create Category</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default CreateCategoryForm;