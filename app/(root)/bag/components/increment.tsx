import {
	TUpdateQuantity,
	updateQuantitySchema,
} from "@/lib/schemas/bagFormShema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { incrementQuantity } from "../_actions";

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
import { PlusCircleIcon } from "lucide-react";

const Increment = ({ bagItemId }: { bagItemId: string }) => {
	const form = useForm<TUpdateQuantity>({
		resolver: zodResolver(updateQuantitySchema),
		defaultValues: {
			id: bagItemId,
		},
	});

	const onSubmit: SubmitHandler<TUpdateQuantity> = async (
		values: TUpdateQuantity
	) => {
		try {
			await incrementQuantity(values);
		} catch (error) {
			console.log("FAILED TO UPDATE QUANTITY: " + error);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="id"
					render={({ field }) => (
						<FormItem className="hidden">
							<FormLabel>Bag Item ID</FormLabel>
							<FormControl>
								<Input placeholder="shadcn" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					variant={"outline"}
					size={"sm"}
					className="p-2"
					type="submit"
				>
					<PlusCircleIcon />
				</Button>
			</form>
		</Form>
	);
};

export default Increment;
