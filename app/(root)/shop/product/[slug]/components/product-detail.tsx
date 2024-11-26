"use client";

import { useState } from "react";
import { type ProductDetail, CourierOption, Review } from "@/lib/types";
import { StarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CldImage } from "next-cloudinary";
import { cn } from "@/lib/utils";

interface ProductDetailProps {
	product: ProductDetail;
	courierOptions: CourierOption[];
	reviews: Review[];
}

export default function ProductDetail({
	product,
	courierOptions,
	reviews,
}: ProductDetailProps) {
	const [selectedColor, setSelectedColor] = useState(
		product.product_variant_color[0]
	);
	const [selectedSize, setSelectedSize] = useState(
		selectedColor.product_variant_size[0]
	);
	const [selectedCourier, setSelectedCourier] = useState(courierOptions[0]);

	const averageRating =
		reviews.reduce((sum, review) => sum + review.rating, 0) /
		reviews.length;

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="space-y-4">
					<div className="relative aspect-square">
						<CldImage
							src={selectedColor.images[0]}
							alt={product.name}
							fill
							className="object-cover rounded-lg"
						/>
					</div>
					<div className="flex space-x-2 overflow-x-auto">
						{selectedColor.images.map((image, index) => (
							<CldImage
								key={index}
								src={image}
								alt={`${product.name} - Image ${index + 1}`}
								width={100}
								height={100}
								className="object-cover rounded-md cursor-pointer"
								onClick={() => {
									const newImages = [...selectedColor.images];
									newImages.unshift(
										newImages.splice(index, 1)[0]
									);
									setSelectedColor({
										...selectedColor,
										images: newImages,
									});
								}}
							/>
						))}
					</div>
				</div>
				<div className="space-y-6">
					<h1 className="text-3xl font-bold">{product.name}</h1>
					<div className="flex items-center space-x-2">
						<div className="flex">
							{[1, 2, 3, 4, 5].map((star) => (
								<StarIcon
									key={star}
									className={`w-5 h-5 ${
										star <= averageRating
											? "text-yellow-400"
											: "text-gray-300"
									}`}
								/>
							))}
						</div>
						<span className="text-sm text-gray-600">
							({reviews.length} reviews)
						</span>
					</div>
					<p className="text-2xl font-semibold">
						${product.price.toFixed(2)}
					</p>
					<p className="text-gray-600">{product.description}</p>
					<div>
						<h3 className="font-semibold mb-2">Color</h3>
						<RadioGroup
							value={selectedColor.id}
							onValueChange={(value) =>
								setSelectedColor(
									product.product_variant_color.find(
										(c) => c.id === value
									)!
								)
							}
							className="flex space-x-2"
						>
							{product.product_variant_color.map((color) => (
								<div
									key={color.id}
									className="flex items-center space-x-2"
								>
									<RadioGroupItem
										value={color.id}
										id={`color-${color.id}`}
										className="sr-only"
									/>
									<Label
										htmlFor={`color-${color.id}`}
										className={cn(
											"w-8 h-8 rounded-full cursor-pointer",
											color.color ===
												selectedColor.color &&
												"border-4 border-muted-foreground"
										)}
										style={{ backgroundColor: color.color }}
									/>
								</div>
							))}
						</RadioGroup>
					</div>
					<div>
						<h3 className="font-semibold mb-2">Size</h3>
						<Select
							value={selectedSize.id}
							onValueChange={(value) =>
								setSelectedSize(
									selectedColor.product_variant_size.find(
										(s) => s.id === value
									)!
								)
							}
						>
							<SelectTrigger className="w-32">
								<SelectValue placeholder="Select size" />
							</SelectTrigger>
							<SelectContent>
								{selectedColor.product_variant_size.map(
									(size) => (
										<SelectItem
											key={size.id}
											value={size.id}
										>
											{size.size}
										</SelectItem>
									)
								)}
							</SelectContent>
						</Select>
					</div>
					<div>
						<h3 className="font-semibold mb-2">Shipping</h3>
						<Select
							value={selectedCourier.id}
							onValueChange={(value) =>
								setSelectedCourier(
									courierOptions.find((c) => c.id === value)!
								)
							}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select shipping method" />
							</SelectTrigger>
							<SelectContent>
								{courierOptions.map((option) => (
									<SelectItem
										key={option.id}
										value={option.id}
									>
										{option.name} - $
										{option.price.toFixed(2)} (
										{option.estimatedDelivery})
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<Button className="w-full">Add to Cart</Button>
				</div>
			</div>
			<div className="mt-12">
				<h2 className="text-2xl font-bold mb-4">Reviews</h2>
				<div className="space-y-4">
					{reviews.map((review) => (
						<div key={review.id} className="border-b pb-4">
							<div className="flex items-center space-x-2 mb-2">
								<div className="flex">
									{[1, 2, 3, 4, 5].map((star) => (
										<StarIcon
											key={star}
											className={`w-4 h-4 ${
												star <= review.rating
													? "text-yellow-400"
													: "text-gray-300"
											}`}
										/>
									))}
								</div>
								<span className="font-semibold">
									{review.userName}
								</span>
								<span className="text-sm text-gray-600">
									{review.createdAt}
								</span>
							</div>
							<p>{review.comment}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
