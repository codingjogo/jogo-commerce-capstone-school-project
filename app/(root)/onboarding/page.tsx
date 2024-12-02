"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "./_actions";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	onboardingSchema,
	TCreateOnboarding,
} from "@/lib/schemas/onboardingFormSchemas";

export default function OnboardingComponent() {
	const { user } = useUser();
	const router = useRouter();

	const form = useForm<TCreateOnboarding>({
		resolver: zodResolver(onboardingSchema),
		defaultValues: {
			publicMetadata: {
				onboardingComplete: true,
				firstName: "test-first",
				lastName: "test-first",
				address: {
					houseNumber: "test-first",
					street: "test-first",
					barangay: "test-first",
					municipality: "test-first",
					province: "test-first",
					zipCode: "test-first",
          isDefault: true,
				},
			},
		},
	});

	const onSubmit: SubmitHandler<TCreateOnboarding> = async (
		values: TCreateOnboarding
	) => {
		try {
			const validatedValues = onboardingSchema.parse(values);
			const res = await completeOnboarding(validatedValues);
			if (res?.message) {
				// Reloads the user's data from the Clerk API
				await user?.reload();
				router.push("/");
			}
		} catch (err) {
			console.log(err);
		}
	};

  const onError = (err: FieldErrors<TCreateOnboarding>) => {
    console.log(err);
  };

	return (
		<div className="container">
			<h1>Welcome</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit, onError)}
					className="space-y-8"
				>
					<FormField
						control={form.control}
						name="publicMetadata.firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input
										className="bg-white"
										placeholder="First Name"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="publicMetadata.lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input
										className="bg-white"
										placeholder="Last Name"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="publicMetadata.address.houseNumber"
						render={({ field }) => (
							<FormItem>
								<FormLabel>House number</FormLabel>
								<FormControl>
									<Input
										className="bg-white"
										placeholder="House number"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="publicMetadata.address.street"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Street</FormLabel>
								<FormControl>
									<Input
										className="bg-white"
										placeholder="Street"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="publicMetadata.address.barangay"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Barangay</FormLabel>
								<FormControl>
									<Input
										className="bg-white"
										placeholder="Barangay 3"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="publicMetadata.address.municipality"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Municipality</FormLabel>
								<FormControl>
									<Input
										className="bg-white"
										placeholder="Lucban"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="publicMetadata.address.province"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Province</FormLabel>
								<FormControl>
									<Input
										className="bg-white"
										placeholder="Quezon"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="publicMetadata.address.zipCode"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Zip Code</FormLabel>
								<FormControl>
									<Input
										className="bg-white"
										placeholder="4328"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit">Continue</Button>
				</form>
			</Form>
		</div>
	);
}
