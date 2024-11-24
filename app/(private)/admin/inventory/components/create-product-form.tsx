"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
import { useRouter } from "next/navigation";
import ColorImagesUploader from "./color-images-uploader";
import ColorSizes from "./color-sizes";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { isNumberKey } from "@/lib/helper";
import {
	createProductSchema,
	PRODUCT_SIZES,
	PRODUCT_STATUS,
	SIZE_STATUS,
	TCreateProduct,
} from "@/lib/schemas/productFormSchemas";

const initialValues = {
	category: "",
	name: "",
	code: "",
	price: 0,
	stock: 0,
	status: PRODUCT_STATUS.ACTIVE,
	description: "",
	variant_colors: [
		{
			color: "",
			images: ["iiwvxsonkgwgfarjnjtz", "lk2tow5ndjdh3xpzq6gx"],
			sizes: [
				{
					stock: 0,
					status: SIZE_STATUS.AVAILABLE,
					size: "" as PRODUCT_SIZES,
				},
			],
		},
	],
};

const CreateProductForm = () => {
	const router = useRouter();

	const form = useForm<TCreateProduct>({
		resolver: zodResolver(createProductSchema),
		defaultValues: initialValues,
	});

	// 2. Define a submit handler.
	async function onSubmit(values: TCreateProduct) {
		const validatedValues = createProductSchema.safeParse(values);
		console.log("validatedValues", validatedValues);
	}

	const {
		fields: variantColorFields,
		append: variantColorAppend,
		remove: variantColorRemove,
	} = useFieldArray({
		control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
		name: "variant_colors", // unique name for your Field Array
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-admin-h1">Create Product</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8"
					>
						<div className="grid lg:grid-cols-2 gap-2">
							<FormField
								control={form.control}
								name="category"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Category</FormLabel>
										<FormControl>
											<Input
												placeholder="Category"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												placeholder="Name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="grid lg:grid-cols-2 gap-2">
							<FormField
								control={form.control}
								name="code"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Code</FormLabel>
										<FormControl>
											<Input
												placeholder="Code"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Price</FormLabel>
										<FormControl>
											<Input
												placeholder="123.75"
												{...field}
												onChange={(e) =>
													field.onChange(
														Number(e.target.value)
													)
												}
												onKeyDown={(e) => {
													// Prevent invalid keys based on your isNumberKey function
													if (!isNumberKey(field.value.toString(), e)) {
														e.preventDefault();
													}
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="grid lg:grid-cols-2 gap-2">
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Status</FormLabel>
										<FormControl>
											<Input
												placeholder="Status"
												{...field}
												value={field.value}
												disabled={true}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Variant Colors */}
						<div>
							<h2 className="text-3xl mb-4">Variant Colors</h2>

							<div>
								{variantColorFields.map((color, colorIdx) => {
									return (
										<div key={color.id}>
											<div className="flex items-center justify-between">
												<h3 className="text-xl mb-2">
													Color #{colorIdx + 1}
												</h3>
												{variantColorFields.length >
													1 && (
													<Button
														className="h-fit rounded-full p-2"
														variant={"destructive"}
														type="button"
														onClick={() =>
															variantColorRemove(
																colorIdx
															)
														}
													>
														<Trash2Icon />
													</Button>
												)}
											</div>

											<div className="grid lg:grid-cols-2 gap-2">
												<FormField
													control={form.control}
													name={`variant_colors.${colorIdx}.color`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>
																Color
															</FormLabel>
															<FormControl>
																<Input
																	placeholder="Red"
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>

												<ColorImagesUploader
													control={form.control}
													colorIdx={colorIdx}
												/>
											</div>

											<div className="grid mt-4">
												<h3 className="text-xl mb-2">
													Sizes
												</h3>
												<ColorSizes
													control={form.control}
													colorIdx={colorIdx}
												/>
											</div>

											{variantColorFields.length - 1 ===
												colorIdx && (
												<Button
													variant={"secondary"}
													type="button"
													onClick={() =>
														variantColorAppend({
															color: "",
															images: [],
															sizes: [
																{
																	stock: 0,
																	status: SIZE_STATUS.AVAILABLE,
																	size: "" as PRODUCT_SIZES,
																},
															],
														})
													}
													className="w-full"
												>
													<PlusCircleIcon /> Add Color
												</Button>
											)}
										</div>
									);
								})}
							</div>
						</div>

						<div className="flex gap-4">
							<Button
								onClick={() => {
									router.push("/admin/inventory");
								}}
								type="button"
								variant={"secondary"}
							>
								Cancel
							</Button>
							<Button type="submit">Create</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default CreateProductForm;
