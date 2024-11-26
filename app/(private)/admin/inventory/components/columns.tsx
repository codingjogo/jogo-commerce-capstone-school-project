"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import ProductDeleteButton from "./product-delete-button";

export type Product = {
	id: string;
	image: string;
	name: string;
	price: number;
	stock: number;
	colorSize: string;
	category: string;
};

// Updated columns definition
export const columns: ColumnDef<Product>[] = [
	{
		accessorKey: "image",
		header: "Image",
		cell: ({ row }) => {
			return (
				<div className="relative w-12 h-12">
					<CldImage
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
		accessorKey: "category",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Category" />
		),
	},
	{
		accessorKey: "colorSize",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Color & Size" />
		),
		cell: ({ row }) => row.original.colorSize,
	},
	{
		accessorKey: "stock",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Total Stock" />
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
							<Button className="w-full" asChild>
								<Link
									href={`/admin/inventory/${row.original.id}/update`}
								>
									Edit
								</Link>
							</Button>
						</DropdownMenuItem>
						<DropdownMenuItem className="p-0">
							<ProductDeleteButton productId={row.original.id} />
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

