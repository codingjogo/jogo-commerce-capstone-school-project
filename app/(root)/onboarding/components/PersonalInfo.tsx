"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useFormContext } from "react-hook-form";

const PersonalInfo = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<div>
			<h2 className="text-2xl mb-2">Personal Information</h2>
			<div className="space-y-4">
				<div>
					<Label htmlFor="first_name">First Name</Label>
					<Input
						id="first_name"
						type="text"
						{...register("first_name")}
					/>
					{errors.first_name && (
						<p className="text-red-600">
							{errors.first_name.message?.toString()}
						</p>
					)}
				</div>
				<div>
					<Label htmlFor="last_name">Last Name</Label>
					<Input
						id="last_name"
						type="text"
						{...register("last_name")}
					/>
					{errors.last_name && (
						<p className="text-red-600">
							{errors.last_name.message?.toString()}
						</p>
					)}
				</div>
				<div>
					<Label htmlFor="email">Email</Label>
					<Input id="email" type="email" {...register("email")} />
					{errors.email && (
						<p className="text-red-600">
							{errors.email.message?.toString()}
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default PersonalInfo;
