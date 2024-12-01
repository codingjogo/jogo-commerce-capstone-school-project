"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	addressDefaultSchema,
	TToggleDefaultAddres,
} from "@/lib/schemas/addressFormSchema";
import { toggleDefaultAddress } from "../_actions";
import { Switch } from "@/components/ui/switch";
import { TAddress } from "@/lib/types";
import { useAddressStore } from "@/stores/useAddressStore";

const ToggleDefault = ({address, isDisabled} : {
	address: TAddress
	isDisabled: boolean;
}) => {
	const {id, is_default} = address;
	
	const onChangeDefault = useAddressStore((state) => state.onChangeDefault);

	const form = useForm<TToggleDefaultAddres>({
		resolver: zodResolver(addressDefaultSchema),
		defaultValues: {
			id,
			is_default,
		},
	});

	const onSubmit: SubmitHandler<TToggleDefaultAddres> = async (
		values: TToggleDefaultAddres
	) => {
		const validatedValues = addressDefaultSchema.parse(values);
		try {
			await toggleDefaultAddress(validatedValues);
			onChangeDefault(address)
			alert("Successful toggle the default adrress.");
		} catch (error) {
			console.log("FAILED TO TOGGLE", error);
		}
	};

	const onError = (error: FieldErrors<TToggleDefaultAddres>) => {
		console.log(error);
	};

	React.useEffect(() => {
    form.reset({
      id: address.id,
      is_default: address.is_default,
    });
  }, [address, form]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit, onError)}
				className="space-y-8"
			>
				<FormField
					control={form.control}
					name="id"
					render={({ field }) => (
						<FormItem className="hidden">
							<FormLabel>Address ID</FormLabel>
							<FormControl>
								<Input placeholder="Address ID" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="is_default"
					render={({ field }) => (
						<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
							<div className="space-y-0.5">
								<FormLabel className="text-base">
									Default Address
								</FormLabel>
								<FormDescription>
									This will be the default shipping address when
									checking out.
								</FormDescription>
							</div>
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={(value) => {
										field.onChange(value);
										form.handleSubmit(
											onSubmit,
											onError
										)();
									}}
									disabled={isDisabled}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<Button type="submit" className="hidden">
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default ToggleDefault;
