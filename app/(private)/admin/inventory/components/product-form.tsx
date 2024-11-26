	"use client";

	import React from "react";
	import { zodResolver } from "@hookform/resolvers/zod";
	import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

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
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger,
		SelectValue,
	} from "@/components/ui/select";
	import { Input } from "@/components/ui/input";
	import { useRouter } from "next/navigation";
	import ColorImagesUploader from "./color-images-uploader";
	import ColorSizes from "./color-sizes";
	import { PlusCircleIcon, Trash2Icon } from "lucide-react";
	import { isNumberKey, slugify } from "@/lib/helper";
	import {
		createProductSchema,
		PRODUCT_SIZES,
		PRODUCT_STATUS,
		SIZE_STATUS,
		TCreateProduct,
	} from "@/lib/schemas/productFormSchemas";
	import { createProduct, updateProduct } from "../_actions";
	import { category } from "@prisma/client";

	// Your missing @props are: categories
	const ProductForm = ({
		categories,
		product,
	}: {
		categories: category[];
		product?: TCreateProduct;
	}) => {
		const [slug, setSlug] = React.useState("");

		const router = useRouter();

		const form = useForm<TCreateProduct>({
			resolver: zodResolver(createProductSchema),
			defaultValues: product
				? product
				: {
						name: "test-name",
						description: "test-descriptions",
						category_id: "",
						price: 123,
						status: "ACTIVE" as PRODUCT_STATUS,
						slug,
						code: "test-code",
						product_variant_color: [
							{
								color: "test-color",
								images: [],
								product_variant_size: [
									{
										size: "" as PRODUCT_SIZES,
										stock: 0,
										status: SIZE_STATUS.AVAILABLE,
									},
								],
							},
						],
					},
		});

		const onSubmit: SubmitHandler<TCreateProduct> = async (
			data: TCreateProduct
		) => {
			try {
				const validateValues = createProductSchema.parse(data);
				if (product) {
					await updateProduct(validateValues.id!, validateValues);
				} else {
					await createProduct(validateValues);
					alert("Product created successfully!");
				}
			} catch (error) {
				console.log(
					"Product Error, please try again. Product might be already created",
					error
				);
			}
		};

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const onError = (error: any) => {
			console.error(error);
		};

		const {
			fields: variantColorFields,
			append: variantColorAppend,
			remove: variantColorRemove,
		} = useFieldArray({
			control: form.control,
			name: "product_variant_color",
		});

		const nameValue = form.watch("name");
		const slugValue = slugify(nameValue);

		React.useEffect(() => {
			form.setValue("slug", slugValue, { shouldValidate: true });
		}, [nameValue, form, slugValue]);

		return (
		<Card>
			<CardHeader>
				<CardTitle className="text-admin-h1">
					{product ? "Update" : "Create"} Product
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit, onError)}
						className="space-y-8"
					>
						{/* Hidden Slug */}
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
											value={slugValue}
											readOnly
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="grid lg:grid-cols-2 gap-2">
							{/* <div className="grid gap-2">
											<FormLabel>Category</FormLabel>
											<Button className="w-fit" variant={'secondary'} type="button" size={'sm'} onClick={() => router.push('/admin/inventory/categories/create')}><PlusCircleIcon /></Button>
										</div> */}
							<FormField
								control={form.control}
								name="category_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Category</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a category" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem
													value="default-value"
													disabled={true}
												>
													Select a category
												</SelectItem>
												{categories.map((category) => {
													return (
														<SelectItem
															key={category.id}
															value={category.id.toString()}
														>
															{category.name}
														</SelectItem>
													);
												})}
											</SelectContent>
										</Select>
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
												onChange={(e) => {
													field.onChange(
														e.target.value
													);
													setSlug(e.target.value);
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
													if (
														!isNumberKey(
															field.value.toString(),
															e
														)
													) {
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
													name={`product_variant_color.${colorIdx}.color`}
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
												form={form}
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
															product_variant_size:
																[
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
													<PlusCircleIcon /> Add
													Variant Color
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
							<Button type="submit">{product ? "Update" : "Create"}</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default ProductForm;
