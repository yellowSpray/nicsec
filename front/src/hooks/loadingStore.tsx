import { create } from "zustand";

type useLoadingStore = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

export const useLoadingStore = create<useLoadingStore>((set) => ({
    isLoading: true, // initial statement for loading
    setIsLoading: (status) => set({ isLoading: status }), // function for change statement
}))