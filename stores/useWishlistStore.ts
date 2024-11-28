import { TWishlist } from "@/lib/types";
import { create } from "zustand";

interface WishlistState {
  wishlists: TWishlist[];
  addWishlist: (product: TWishlist) => void;
  removeWishlist: (id: string) => void;
  setWishlistItems: (wishlists: TWishlist[]) => void;
}

export const useWishlistStore = create<WishlistState>()((set) => ({
  wishlists: [],
  addWishlist: (product: TWishlist) => set((state) => ({
    wishlists: [...state.wishlists, product],
  })),
  removeWishlist: (id: string) => set((state) => ({
    wishlists: state.wishlists.filter((wish) => wish.id !== id),
  })),
  setWishlistItems: (items: TWishlist[]) => set(() => ({
    wishlists: items,
  })),
}))