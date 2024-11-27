"use client";

import React from "react";
import Increment from "./increment";
import Decrement from "./decrement";

const ChangeQuantity = ({
	bagItemId,
	quantity,
}: {
	bagItemId: string;
	quantity: number;
}) => {
	return (
		<div className="flex gap-2 items-center">
			<Decrement bagItemId={bagItemId} />
			<p className="text-lg">{quantity}</p>
			<Increment bagItemId={bagItemId} />
		</div>
	);
};

export default ChangeQuantity;
