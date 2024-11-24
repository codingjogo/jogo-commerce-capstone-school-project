"use client";

import React from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { Control, useFieldArray, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, Trash2 } from "lucide-react";
import { FormLabel } from "@/components/ui/form";
import { TCreateProduct } from "@/lib/schemas/productFormSchemas";

interface ColorImagesProps {
	control: Control<TCreateProduct>;
	colorIdx: number;
}

const ColorImagesUploader = ({ control, colorIdx }: ColorImagesProps) => {
	const watchImages = useWatch({
		control,
		name: `variant_colors.${colorIdx}.images` as const,
	});

	const { append: colorImageAppend } = useFieldArray({
		control,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		name: `variant_colors.${colorIdx}.images` as any,
	});

	return (
		<div>
			<FormLabel className="block mb-4">Color Images</FormLabel>

			<div className="flex gap-2">
				{watchImages.map((image, imageIdx) => {
					return (
						<div key={imageIdx} className="relative w-12 h-12">
							<CldImage
								src={image}
								sizes="100vw"
								alt={`variant-image-${image}`}
								fill
								className="object-fill"
							/>
							<Button
								variant={"destructive"}
								className="absolute h-fit -top-1 -right-1 p-1 rounded-full"
								type="button"
							>
								<Trash2 />
							</Button>
						</div>
					);
				})}

				<CldUploadWidget
					uploadPreset="soule-psycle-products"
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					onSuccess={(result: any) => {
						colorImageAppend(result.info.public_id);
					}}
				>
					{({ open }) => {
						return (
							<Button
								variant={"secondary"}
								className="w-12 h-12 flex items-center justify-center"
								onClick={() => open()}
							>
								<PlusCircleIcon />
							</Button>
						);
					}}
				</CldUploadWidget>
			</div>
		</div>
	);
};

export default ColorImagesUploader;
