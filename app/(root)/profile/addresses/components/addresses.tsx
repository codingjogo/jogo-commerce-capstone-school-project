"use client";

import React from "react";
import { TAddress } from "@/lib/types";
import { useAddressStore } from "@/stores/useAddressStore";
import { Card, CardContent } from "@/components/ui/card";
import ToggleDefault from "./toggle-default-form";

const Addresses = ({ addresses }: { addresses: TAddress[] }) => {
	const storeAddresses = useAddressStore((state) => state.addresses);
	const setAddresses = useAddressStore((state) => state.setAddresses);
	const isSingleAdd = storeAddresses.length === 1

	console.log("storeAddresses", storeAddresses.map((a) => a.house_number + " " + a.is_default))

	React.useEffect(() => {
		if (storeAddresses.length === 0) {
			setAddresses(addresses);
		}
	}, [setAddresses, addresses, storeAddresses]);

	return (
		<div>
			{storeAddresses.map((address) => {
				const {
					house_number,
					street,
					barangay,
					municipality,
					province,
					zip_code,
				} = address;

				return (
					<Card key={address.id}>
						<CardContent className="p-4">
							<p>
								<span className="font-semibold">Address:</span>{" "}
								{house_number} {street} {barangay}{" "}
								{municipality} {province} {zip_code}
							</p>
							<ToggleDefault address={address} isDisabled={isSingleAdd} />
						</CardContent>
					</Card> 
				);
			})}
		</div>
	);
};

export default Addresses;
