import React from "react";
import { v4 as uuidv4 } from "uuid";
import { DataTable } from "./components/data-table";
import { columns, Product } from "./components/columns";

async function getData(): Promise<Product[]> {
	// Fetch data from your API here.
	return [
		{
			id: uuidv4(),
			image: "/fallback-image.jpg",
			name: "Classic T-Shirt",
			price: 19.99,
			stock: 50,
			color: "Black",
			size: "M",
		},
		{
			id: uuidv4(),
			image: "/fallback-image.jpg",
			name: "Vintage Denim Jacket",
			price: 59.99,
			stock: 15,
			color: "Blue",
			size: "L",
		},
		{
			id: uuidv4(),
			image: "/fallback-image.jpg",
			name: "Slim Fit Chinos",
			price: 39.99,
			stock: 30,
			color: "Khaki",
			size: "S",
		},
		{
			id: uuidv4(),
			image: "/fallback-image.jpg",
			name: "Cotton Hoodie",
			price: 29.99,
			stock: 20,
			color: "Gray",
			size: "XL",
		},
		{
			id: uuidv4(),
			image: "/fallback-image.jpg",
			name: "Leather Boots",
			price: 89.99,
			stock: 10,
			color: "Brown",
			size: "M",
		},
		{
			id: uuidv4(),
			image: "/fallback-image.jpg",
			name: "Graphic Tee",
			price: 24.99,
			stock: 40,
			color: "White",
			size: "XS",
		},
		{
			id: uuidv4(),
			image: "/fallback-image.jpg",
			name: "Flannel Shirt",
			price: 34.99,
			stock: 25,
			color: "Red",
			size: "L",
		},
		{
			id: uuidv4(),
			image: "/fallback-image.jpg",
			name: "Running Shoes",
			price: 79.99,
			stock: 18,
			color: "Black",
			size: "M",
		},
		{
			id: uuidv4(),
			image: "/fallback-image.jpg",
			name: "Cargo Pants",
			price: 44.99,
			stock: 22,
			color: "Green",
			size: "XL",
		},
		{
			id: uuidv4(),
			image: "/fallback-image.jpg",
			name: "Formal Blazer",
			price: 99.99,
			stock: 12,
			color: "Navy",
			size: "L",
		},
		{
			id: uuidv4(),
			image: "/fallback-image.jpg",
			name: "Wool Scarf",
			price: 14.99,
			stock: 35,
			color: "Gray",
			size: "S",
		},
		{
			id: uuidv4(),
			image: "/fallback-image.jpg",
			name: "Baseball Cap",
			price: 19.99,
			stock: 60,
			color: "Black",
			size: "M",
		},
		{
			id: uuidv4(),
			image: "/fallback-image.jpg",
			name: "Summer Shorts",
			price: 24.99,
			stock: 45,
			color: "Beige",
			size: "L",
		},
		{
			id: uuidv4(),
			image: "/fallback-image.jpg",
			name: "Winter Coat",
			price: 129.99,
			stock: 8,
			color: "Black",
			size: "XL",
		},
		{
			id: uuidv4(),
			image: "/fallback-image.jpg",
			name: "Silk Tie",
			price: 24.99,
			stock: 28,
			color: "Red",
			size: "M",
		},
		{
			id: uuidv4(),
			image: "/fallback-image.jpg",
			name: "Casual Sneakers",
			price: 54.99,
			stock: 20,
			color: "White",
			size: "S",
		},
		{
			id: uuidv4(),
			image: "/fallback-image.jpg",
			name: "Denim Jeans",
			price: 49.99,
			stock: 30,
			color: "Blue",
			size: "L",
		},
		{
			id: uuidv4(),
			image: "/fallback-image.jpg",
			name: "Polo Shirt",
			price: 29.99,
			stock: 50,
			color: "Navy",
			size: "M",
		},
		{
			id: uuidv4(),
			image: "/fallback-image.jpg",
			name: "Leather Belt",
			price: 24.99,
			stock: 40,
			color: "Brown",
			size: "M",
		},
		{
			id: uuidv4(),
			image: "/fallback-image.jpg",
			name: "Rain Jacket",
			price: 79.99,
			stock: 15,
			color: "Yellow",
			size: "XL",
		},
	];
}

const InventoryPage = async () => {
	const data = await getData();

	return (
		<section>
			<div className="p-6">
				<h1 className="text-admin-h1">Inventory</h1>

				<div>
					<DataTable columns={columns} data={data} />
				</div>
			</div>
		</section>
	);
};

export default InventoryPage;
