"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { FormValues } from "./page";

export const completeOnboarding = async (formData: FormValues) => {
	const { userId } = await auth();

	if (!userId) {
		return { message: "No Logged In User" };
	}

	const client = await clerkClient();

	try {
		const res = await client.users.updateUser(userId, {
			firstName: formData.firstName,
			lastName: formData.lastName,
			publicMetadata: {
				onboardingComplete: true,
				addresses: {
					Home: {
						houseNumber: formData.houseNumber,
						street: formData.street,
						barangay: formData.barangay,
						municipality: formData.municipality,
						province: formData.province,
						zipCode: formData.zipCode,
					},
				},
			},
		});

		return {
			message: {
				publicMetadata: res.publicMetadata,
				firstName: formData.firstName,
				lastName: formData.lastName,
			},
		};
	} catch (error) {
		return {
			error: "There was an error updating the user metadata." + error,
		};
	}
};
