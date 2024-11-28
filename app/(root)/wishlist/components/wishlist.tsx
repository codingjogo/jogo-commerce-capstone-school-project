"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TWishlist } from "@/lib/types";
import { category } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import RemoveToWishlist from "./remove-to-wishllist";

const BagItemList = ({
	whistLists,
	categories,
}: {
	whistLists: TWishlist[];
	categories: category[];
}) => {

	return (
		<div>
      {whistLists.length === 0 && (
        <Card>
          <CardContent className="p-4">
            <h1 className="text-center text-admin-h1">Your Wishlist is Empty</h1>
            <p className="text-center">
              Add Favorites in your wishlist.
            </p>
          </CardContent>
        </Card>
      )}
			{whistLists.length > 0 && whistLists.map((item) => {
				const wishlistId = item.id;
				const firstImage = item.product_variant_size.product_variant_color.images[0]
				const productName = item.product_variant_size.product_variant_color.product.name;
				const productCategory = categories.find(
					(c) => c.id === item.product_variant_size.product_variant_color.product.category_id
				)?.slug;
				const productDescription = item.product_variant_size.product_variant_color.product.description;
				const productPrice = item.product_variant_size.product_variant_color.product.price;
				const productColor = item.product_variant_size.product_variant_color.color
				const productSize = item.product_variant_size.size;

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
									</div>
								</div>

								<div className="flex justify-between">
									{/* Price */}
									<div>
										<h3 className="heading-3">
											₱{productPrice}{" "}
										</h3>
									</div>

									{/* Heart Button */}
									<RemoveToWishlist wishlistId={wishlistId} />
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
