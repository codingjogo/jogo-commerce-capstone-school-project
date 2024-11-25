import React from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { Card, CardContent } from "@/components/ui/card";
import { getProductsData } from "@/lib/data/inventory";

const InventoryPage = async () => {
	const data = await getProductsData();

	return (
		<section>
			<div className="p-6">
				<h1 className="text-admin-h1">Inventory</h1>

				<div>
					<Card>
						<CardContent>
							<DataTable columns={columns} data={data} />
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
};

export default InventoryPage;
