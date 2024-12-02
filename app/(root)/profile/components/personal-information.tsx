"use client";

import React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const PersonalInformation = () => {
	const { user } = useUser();

	if (!user) {
		return (
			<div className="flex h-screen items-center justify-center">
				<h1 className="heading-1">Please login first</h1>
				<Button type="button" asChild>
					<Link href={"/sign-in"}>Go back to login</Link>
				</Button>
			</div>
		);
	}

	const userId = user.id;

	const fullName = user?.fullName;
	const email = user?.emailAddresses.map((e) => e.emailAddress);

	const handleDeleteUser = async () => {
		try {
			const deletedUser = await axios.delete(
				`/api/delete-user?id=${userId}`
			);

			if (deletedUser.status === 200) {
				return { success: true, user: deletedUser };
			}
		} catch (error) {
			console.error("Error deleting user:", error);
			alert("Failed to delete your account. Please try again later.");
		}
	};

	return (
		<div>
			<h2 className="heading-2">{fullName}</h2>
			<p>Email: {email}</p>
			<Button
				className="mt-4"
				type="button"
				variant={"destructive"}
				size={"sm"}
				onClick={handleDeleteUser}
			>
				Delete my Account
			</Button>
		</div>
	);
};

export default PersonalInformation;