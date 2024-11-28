import { TBag } from "@/lib/types";
import { create } from "zustand";

interface BagState {
 bagItems: TBag[]
 increaseQuantity: (id: string) => void;
 decreaseQuantity: (id: string) => void;
 setBagItems: (items: TBag[]) => void;
}

export const useBagStore = create<BagState>()((set) => ({
	bagItems: [],
  increaseQuantity: (id: string) =>
    set((state) => ({
      bagItems: state.bagItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),
    decreaseQuantity: (id: string) =>
      set((state) => ({
        bagItems: state.bagItems
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0), // Remove items with quantity <= 0
      })),
    setBagItems: (items) => set(() => ({ bagItems: items })),
}));
