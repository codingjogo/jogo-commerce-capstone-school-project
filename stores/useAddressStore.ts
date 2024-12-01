import { TAddress } from "@/lib/types";
import { create } from "zustand";

interface AddressState {
  addresses: TAddress[];
  setAddresses: (address: TAddress[]) => void;
  onChangeDefault: (address: TAddress) => void;
 }

export const useAddressStore = create<AddressState>()((set) => ({
  addresses: [],
  setAddresses: (addresses: TAddress[]) => set(() => ({
    addresses,
  })),
  onChangeDefault: (targetAddress: TAddress) =>
    set((state) => ({
      addresses: state.addresses.map((addr) =>
        addr.id === targetAddress.id
          ? { ...addr, is_default: true } // Set the target address to default
          : { ...addr, is_default: false } // Unset default for other addresses
      ),
    })),
}));