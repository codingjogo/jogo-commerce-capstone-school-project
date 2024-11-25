import { PRODUCT_STATUS } from "@prisma/client";

export interface ProductDetail {
  id: string;
  name: string;
  description: string;
  price: number;
  status: PRODUCT_STATUS;
  slug: string;
  code: string;
  category: {
    name: string;
    slug: string;
  };
  product_variant_color: Array<{
    id: string;
    color: string;
    images: string[];
    product_variant_size: Array<{
      id: string;
      size: PRODUCT_SIZES;
      stock: number;
      status: SIZE_STATUS;
    }>;
  }>;
}

export interface CourierOption {
	id: string;
	name: string;
	price: number;
	estimatedDelivery: string;
}

export interface Review {
	id: string;
	rating: number;
	comment: string;
	userName: string;
	createdAt: string;
}

export interface ProductListItem {
  id: string;
  name: string;
  description: string;
  price: number;
  status: PRODUCT_STATUS;
  slug: string;
  category: {
    name: string;
    slug: string;
  };
  product_variant_color: Array<{
    images: string[];
  }>;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}