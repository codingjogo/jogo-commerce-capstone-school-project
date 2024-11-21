"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "./_actions";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import PersonalInfo from "./components/PersonalInfo";
import AddressInfo from "./components/AddressInfo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const FormSchema = z.object({
	firstName: z.string().min(1, "required first name"),
	lastName: z.string().min(1, "required last name"),
	email: z.string().email(),
	houseNumber: z.string().min(1, "required house number"),
	street: z.string().min(1, "required street"),
	barangay: z.string().min(1, "required barangay"),
	municipality: z.string().min(1, "required municipality"),
	province: z.string().min(1, "required province"),
	zipCode: z.string().min(1, "required zip code").max(4, "max is 4 digit"),
});

export type FormValues = z.infer<typeof FormSchema>;

const initialValues = {
	firstName: "",
	lastName: "",
	email: "",
	houseNumber: "",
	street: "",
	barangay: "",
	municipality: "",
	province: "",
	zipCode: "",
};

export default function OnboardingComponent() {
	const methods = useForm<FormValues>({
		resolver: zodResolver(FormSchema),
		defaultValues: initialValues,
		mode: "onBlur",
	});

	const { user } = useUser();
	const router = useRouter();

	const onSubmit = async (data: FormValues) => {
		const validatedData = FormSchema.safeParse(data);

		if (!validatedData.success) {
			const errorDetails = validatedData.error.format();
			console.error("Validation errors:", errorDetails);

			return;
		}

		const res = await completeOnboarding(validatedData.data);
		if (res?.message) {
			await user?.reload();
			router.push("/");
		}
	};

	const watching = methods.watch();
	console.log("watching", watching);

	return (
		<FormProvider {...methods}>
			<div>
				<div className="container">
					<Card>
						<CardHeader>
							<h1 className="text-4xl font-bold">Welcome</h1>
						</CardHeader>
						<CardContent>
							<form onSubmit={methods.handleSubmit(onSubmit)}>
								<div className="flex flex-col gap-6">
									<PersonalInfo />
									<AddressInfo />
								</div>

								<Button
									type="submit"
									className="max-w-sm mt-6 px-12"
								>
									Done
								</Button>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</FormProvider>
	);
}
