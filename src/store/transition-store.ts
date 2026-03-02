import { create } from "zustand";

interface TransitionStore {
  rect: DOMRect | null;
  image: string;
  setTransition: (rect: DOMRect, image: string) => void;
  reset: () => void;
}

export const useTransitionStore = create<TransitionStore>((set) => ({
  rect: null,
  image: "",
  setTransition: (rect, image) => set({ rect, image }),
  reset: () => set({ rect: null, image: "" }),
}));
