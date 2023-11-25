import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// interface for selected usegymstore
interface GymStore {
  gym: string;

  setGym: (gym: any) => void;
}
// store current selected gym
export const useGymStore = create<GymStore>((set) => ({
  gym:'',
  setGym: (gym: any) => set({ gym }),
}));


// interface for usegymstore
interface GymsStore {
  gyms: any;

  setGyms: (gym: any) => void;
}
// store for all gyms of current user
export const useGymsStore = create<GymsStore>((set) => ({
  gyms: null,

  setGyms: (newGym: string) => set((state) => ({ ...state.gyms, newGym })),
}));
