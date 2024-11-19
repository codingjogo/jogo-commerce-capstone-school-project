"use client";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
	id: string;
	image: string;
	name: string;
	price: number;
	stock: number;
	color: string;
	size: string;
};

export const columns: ColumnDef<Product>[] = [
	{
		accessorKey: "image",
		header: "Image",
		cell: ({ row }) => {
			return (
				<div className="relative w-12 h-12">
					<Image
						src={row.original.image}
						alt="product-image"
						fill
						className="object-contain"
					/>
				</div>
			);
		},
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
	},
	{
		accessorKey: "price",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Price" />
		),
	},
	{
		accessorKey: "stock",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Stock" />
		),
	},

	{
		accessorKey: "color",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Color" />
		),
	},

	{
		accessorKey: "size",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Size" />
		),
	},
	{
		id: "actions",
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem className="p-0 mb-2">
							<Button className="w-full " asChild>
								<Link
									href={`/admin/inventory/${row.original.id}/edit`}
								>
									Edit
								</Link>
							</Button>
						</DropdownMenuItem>
						<DropdownMenuItem className="p-0">
							<Button className="w-full" variant={"destructive"}>
								Delete
							</Button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
