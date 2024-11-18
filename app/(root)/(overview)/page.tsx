import { FeaturedProducts } from "@/components/FeaturedProducts";
import Hero from "../components/Hero";

export default function Home() {
	return (
		<>
			{/* Hero Section */}
			<section className="bg-slate-900 text-white">
				<Hero />
			</section>
			{/* Featured Products Section */}
			<section className="container pt-16 py-8">
				<h1 className="text-4xl mb-8 text-center font-bold">
					Featured Products
				</h1>

				<FeaturedProducts />
			</section>
		</>
	);
}
