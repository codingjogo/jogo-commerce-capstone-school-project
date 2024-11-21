"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

const AddressInfo = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<div>
			<h2 className="text-2xl mb-2">Address Information</h2>
			<div className="space-y-4">
				<div>
					<Label htmlFor="houseNumber">House Number</Label>
					<Input
						id="houseNumber"
						type="text"
						{...register("houseNumber")}
					/>
					{errors.houseNumber && (
						<p className="text-red-600">
							{errors.houseNumber.message?.toString()}
						</p>
					)}
				</div>
				<div>
					<Label htmlFor="street">Street</Label>
					<Input id="street" type="text" {...register("street")} />
					{errors.street && (
						<p className="text-red-600">
							{errors.street.message?.toString()}
						</p>
					)}
				</div>
				<div>
					<Label htmlFor="barangay">Barangay</Label>
					<Input
						id="barangay"
						type="text"
						{...register("barangay")}
					/>
					{errors.barangay && (
						<p className="text-red-600">
							{errors.barangay.message?.toString()}
						</p>
					)}
				</div>
				<div>
					<Label htmlFor="municipality">Municipality</Label>
					<Input
						id="municipality"
						type="text"
						{...register("municipality")}
					/>
					{errors.municipality && (
						<p className="text-red-600">
							{errors.municipality.message?.toString()}
						</p>
					)}
				</div>
				<div>
					<Label htmlFor="province">Province</Label>
					<Input
						id="province"
						type="text"
						{...register("province")}
					/>
					{errors.province && (
						<p className="text-red-600">
							{errors.province.message?.toString()}
						</p>
					)}
				</div>
				<div>
					<Label htmlFor="zipCode">Zip Code</Label>
					<Input id="zipCode" type="text" {...register("zipCode")} />
					{errors.zipCode && (
						<p className="text-red-600">
							{errors.zipCode.message?.toString()}
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default AddressInfo;
