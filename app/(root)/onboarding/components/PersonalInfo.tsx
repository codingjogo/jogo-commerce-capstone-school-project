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
					<Label htmlFor="firstName">First Name</Label>
					<Input
						id="firstName"
						type="text"
						{...register("firstName")}
					/>
					{errors.firstName && (
						<p className="text-red-600">
							{errors.firstName.message?.toString()}
						</p>
					)}
				</div>
				<div>
					<Label htmlFor="lastName">Last Name</Label>
					<Input
						id="lastName"
						type="text"
						{...register("lastName")}
					/>
					{errors.lastName && (
						<p className="text-red-600">
							{errors.lastName.message?.toString()}
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
