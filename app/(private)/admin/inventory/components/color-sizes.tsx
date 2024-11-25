import React from "react";
import { Control, useFieldArray } from "react-hook-form";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAvailableSizes, numberKeysOnly } from "@/lib/helper";
import {
	PRODUCT_SIZES,
	SIZE_STATUS,
	TCreateProduct,
} from "@/lib/schemas/productFormSchemas";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface ColorSizesProps {
	control: Control<TCreateProduct>;
	colorIdx: number;
}

const ColorSizes = ({ control, colorIdx }: ColorSizesProps) => {
	const {
		fields: sizeFields,
		append: sizeAppend,
		remove: sizeRemove,
	} = useFieldArray<
		TCreateProduct,
		`product_variant_color.${number}.product_variant_size`
	>({
		control,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		name: `product_variant_color.${colorIdx}.product_variant_size` as any,
	});

	// Track selected sizes
	const selectedSizes = sizeFields.map((field) => field.size);

	// Get dynamically available sizes
	const getDynamicSizes = () =>
		getAvailableSizes(selectedSizes, Object.values(PRODUCT_SIZES));

	return (
		<div
			className={cn(
				"grid lg:grid-cols-2 gap-2",
				sizeFields.length && "mb-8 border-0 border-b-[1.5px] pb-16"
			)}
		>
			{sizeFields.map((size, sizeIdx) => {
				const availableSizes = getDynamicSizes();

				return (
					<div
						key={size.id + sizeIdx}
						className="relative grid gap-2"
					>
						{sizeFields.length > 1 && (
							<Button
								variant={"destructive"}
								className="absolute top-1 right-1 rounded-full h-fit p-1"
								type="button"
								onClick={() => sizeRemove(sizeIdx)}
							>
								<Trash2 />
							</Button>
						)}
						{sizeFields.length - 1 === sizeIdx && (
							<Button
								variant={"secondary"}
								className="absolute w-full -bottom-12 left-0"
								type="button"
								onClick={() =>
									sizeAppend({
										stock: 0,
										status: SIZE_STATUS.AVAILABLE,
										size: "" as PRODUCT_SIZES,
									})
								}
								disabled={!availableSizes.length}
							>
								<PlusCircleIcon /> Add Size
							</Button>
						)}

						<FormField
							control={control}
							name={`product_variant_color.${colorIdx}.product_variant_size.${sizeIdx}.size`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Size</FormLabel>
									<Select
										onValueChange={(value) =>
											field.onChange(value)
										}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a size" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.values(PRODUCT_SIZES).map(
												(size) => (
													<SelectItem
														key={size}
														value={size}
														disabled={selectedSizes.includes(
															size
														)} // Disable if already selected
													>
														{size}
													</SelectItem>
												)
											)}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={control}
							name={`product_variant_color.${colorIdx}.product_variant_size.${sizeIdx}.stock`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Stock #{sizeIdx + 1}</FormLabel>
									<FormControl>
										<Input
											placeholder="123"
											{...field}
											onKeyDown={(e) => {
												numberKeysOnly(e);
											}}
											onChange={(e) =>
												field.onChange(
													Number(e.target.value)
												)
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name={`product_variant_color.${colorIdx}.product_variant_size.${sizeIdx}.status`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status #{sizeIdx + 1}</FormLabel>
									<FormControl>
										<Input
											placeholder="ACTIVE"
											{...field}
											disabled={true}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default ColorSizes;
