import { HeartIcon, HomeIcon, ShoppingBagIcon, StoreIcon } from "lucide-react";

export const NAV_LINKS  = [
	{
		href: "/",
		label: "Home",
		icon: HomeIcon,
	},
	{
		href: "/shop/products",
		label: "Shop",
		icon: StoreIcon,
	},
	{
		href: "/wishlist",
		label: "Wishlist",
		icon: HeartIcon,
	},
	{
		href: "/bag",
		label: "Bag",
		icon: ShoppingBagIcon,
	},
];