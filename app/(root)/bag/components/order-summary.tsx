"use client";

import React from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useBagStore } from "@/stores/useBagStore";
import { Separator } from "@/components/ui/separator";

const OrderSummary = () => {
	const bagItems = useBagStore((state) => state.bagItems);
	const subTotal = Number(
		Math.ceil(
			bagItems.reduce(
				(total, nextPrice) =>
					total + nextPrice.product.price * nextPrice.quantity,
				0
			)
		)
	);
	const shippingFee = Number(Math.ceil(40)); // change this with dynamic value based on their region
	const totalPrice = Number(Math.ceil(subTotal + shippingFee)).toFixed(2);

	return (
		<Card className="w-full lg:w-fit">
			<CardHeader>
				<CardTitle className="heading-2">Order Summary</CardTitle>
			</CardHeader>
			<CardContent>
				{bagItems.map((item) => {
					const quantity = item.quantity;
					const qtyWPrice = Math.ceil(
						Number(item.product.price * quantity)
					).toFixed(2);
					const productName = item.product.name;

					return (
						<div key={item.id}>
							{/* Qty and Name */}
							<div className="flex-1 flex justify-between gap-2">
								<p className="block text-muted-foreground">
									{quantity}x {productName}
								</p>
								<p className="block">(₱{qtyWPrice})</p>
							</div>
						</div>
					);
				})}

				<Separator className="my-4" />

				<div>
					{/* Qty and Name */}
					<div className="flex-1 flex justify-between gap-2">
						<p className="block text-muted-foreground">Sub total</p>
						<p className="block">₱{subTotal}</p>
					</div>

					<div className="flex-1 flex justify-between gap-2">
						<p className="block text-muted-foreground">
							Shipping Fee
						</p>
						<p className="block">+ ₱({shippingFee})</p>
					</div>
				</div>

				<Separator className="my-4" />

				<div className="flex-1 flex justify-between gap-2">
					<p className="block text-muted-foreground">Total</p>
					<p className="block">₱{totalPrice}</p>
				</div>
			</CardContent>
			<CardFooter>
				<Button className="w-full" type={"button"} asChild>
					<Link href={"/shop/checkout"}>Proceed to Checkout</Link>
				</Button>
			</CardFooter>
		</Card>
	);
};

export default OrderSummary;
