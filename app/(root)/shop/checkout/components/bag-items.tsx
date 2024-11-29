'use client';

import React from 'react'
import { TBag } from '@/lib/types'
import { category } from '@prisma/client'
import { Card, CardContent } from "@/components/ui/card";
import { CldImage } from 'next-cloudinary';
import { Badge } from '@/components/ui/badge';

const BagItems = ({bagItems, categories} : {
  bagItems: TBag[];
  categories: category[];
}) => {
  return (
    <div className="grid gap-2 lg:gap-6">
			{bagItems.length > 0 &&
				bagItems.map((item) => {
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
							<CardContent className="flex flex-col lg:flex-row gap-6 p-4">
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
									<div className="flex-1 flex flex-col lg:flex-row gap-6">
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
										<div className="flex-1 flex flex-col lg:flex-row justify-between gap-6">
											<p>{productDescription}</p>
										</div>
									</div>

									<div className="flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between">
										{/* Price */}
										<div>
											<h3 className="heading-3">
												₱{productPrice}{" "}
												<span className="text-muted-foreground">
													(₱{productTotal})
												</span>
											</h3>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>
  )
}

export default BagItems