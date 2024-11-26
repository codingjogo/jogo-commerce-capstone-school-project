"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Category, ProductListItem } from "@/lib/types";
import { CldImage } from "next-cloudinary";

interface ProductListProps {
	initialProducts: ProductListItem[];
	totalProducts: number;
	categories: Category[];
	initialPage: number;
	pageSize: number;
}

export default function ProductList({
	initialProducts,
	totalProducts,
	categories,
	initialPage,
	pageSize,
}: ProductListProps) {
	const [products, setProducts] = useState(initialProducts);
	const [currentPage, setCurrentPage] = useState(initialPage);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		null
	);

	const totalPages = Math.ceil(totalProducts / pageSize);

	const handlePageChange = async (newPage: number) => {
		const res = await fetch(
			`/api/products?page=${newPage}&category=${selectedCategory || ""}`
		);
		const data = await res.json();
		setProducts(data.products);
		setCurrentPage(newPage);
	};

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category);
	};

	const filteredProducts = products.filter(
		(product) =>
			product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(!selectedCategory || product.category.slug === selectedCategory)
	);

	return (
		<>
			<div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
					<Input
						type="text"
						placeholder="Search products..."
						value={searchTerm}
						onChange={handleSearch}
						className="w-full md:w-64 bg-white"
					/>
					<Select onValueChange={handleCategoryChange}>
						<SelectTrigger className="w-full md:w-64 bg-white">
							<SelectValue placeholder="Filter by category" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all-categories">All Categories</SelectItem>
							{categories.map((category) => (
								<SelectItem
									key={category.id}
									value={category.slug}
								>
									{category.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{filteredProducts.map((product) => (
						<Card key={product.id}>
							<CardHeader>
								<div className="relative aspect-square mb-2">
									<CldImage
										src={
											product.product_variant_color[0]
												?.images[0] ||
											"/placeholder.png"
										}
										alt={product.name}
										fill
										className="object-cover rounded-md"
									/>
								</div>
								<CardTitle className="text-lg">
									{product.name}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-gray-600 mb-2">
									{product.category.name}
								</p>
								<p className="text-lg font-semibold">
									${product.price.toFixed(2)}
								</p>
							</CardContent>
							<CardFooter>
								<Link
									href={`/shop/product/${product.slug}`}
									passHref
								>
									<Button className="w-full">
										View Details
									</Button>
								</Link>
							</CardFooter>
						</Card>
					))}
				</div>
				<div className="mt-8 flex justify-center space-x-2">
					<Button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
					>
						Previous
					</Button>
					<span className="py-2 px-4 bg-gray-100 rounded">
						Page {currentPage} of {totalPages}
					</span>
					<Button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
					>
						Next
					</Button>
				</div>
		</>
	);
}
