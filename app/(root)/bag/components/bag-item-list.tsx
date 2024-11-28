"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TBag } from "@/lib/types";
import { category } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import React from "react";
import ChangeQuantity from "./change-quantity";
import { useBagStore } from "@/stores/useBagStore";
import AddToWishlist from "./add-to-wishlist";

const BagItemList = ({
	bagItems,
	categories,
}: {
	bagItems: TBag[];
	categories: category[];
}) => {
	const setBagItems = useBagStore((state) => state.setBagItems);
	const items = useBagStore((state) => state.bagItems);

	React.useEffect(() => {
		setBagItems(bagItems); // Initialize Zustand store with fetched data
	}, [bagItems, setBagItems]);

	return (
		<div>
			{items.length === 0 && (
				<Card>
					<CardContent className="p-4">
						<h1 className="text-center text-admin-h1">
							Your Bag is Empty
						</h1>
						<p className="text-center">
							Add items to your bag to start shopping.
						</p>
					</CardContent>
				</Card>
			)}
			{items.length > 0 &&
				items.map((item) => {
					const bagItemId = item.id;
					const firstImage =
						item.product.product_variant_color.find(
							(c) =>
								c.id ===
								item.product_variant_size
									.product_variant_color_id
						)?.images[0] || "";
					const productName = item.product.name;
					const productCategory = categories.find(
						(c) => c.id === item.product.category_id
					)?.slug;
					const productDescription = item.product.description;
					const productPrice = item.product.price;
					const productQuantity = item.quantity;
					const productColor =
						item.product.product_variant_color.find(
							(c) =>
								c.id ===
								item.product_variant_size
									.product_variant_color_id
						)?.color;
					const productSize = item.product_variant_size.size;
					const productTotal = item.product.price * item.quantity;

					return (
						<Card key={item.id}>
							<CardContent className="flex gap-6 p-4">
								{/* Image */}
								<div className="relative w-24 aspect-square">
									<CldImage
										src={firstImage}
										alt={`image-of-${firstImage}`}
										fill
										className="object-cover"
									/>
								</div>

								{/* Product Details */}
								<div className="flex-1 flex flex-col justify-between gap-6">
									<div className="flex-1 flex gap-6">
										{/* Name and Category */}
										<div className="space-y-1">
											<h2 className="heading-2">
												{productName}
											</h2>
											<Badge variant="outline">
												{productCategory}
											</Badge>
											<p className="text-sm text-muted-foreground font-semibold">
												{productSize} | {productColor}
											</p>
										</div>

										{/* Description */}
										<div className="flex-1 flex justify-between gap-6">
											<p>{productDescription}</p>

											<div>
												<ChangeQuantity
													bagItemId={bagItemId}
													quantity={productQuantity}
												/>
											</div>
										</div>
									</div>

									<div className="flex justify-between">
										{/* Price */}
										<div>
											<h3 className="heading-3">
												₱{productPrice}{" "}
												<span className="text-muted-foreground">
													(₱{productTotal})
												</span>
											</h3>
										</div>

										{/* Heart Button */}
										<AddToWishlist
											customer_id={
												"6ccc554f-5530-4988-8331-ee08d91123bf"
											}
											product_variant_size_id={
												item.product_variant_size_id
											}
											bagItemId={bagItemId}
										/>
									</div>
								</div>
							</CardContent>
						</Card>
					);
				})}
		</div>
	);
};

export default BagItemList;
