
import { Gym } from "@/services/gymService";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// interface for selected usegymstore
interface GymStore {
  gym: Gym | null;

  setGym: (gym: Gym) => void;
}
// store current selected gym
export const useGymStore = create<GymStore>((set) => ({
  gym: null,
  setGym: (newGym: Gym) => set({ gym: newGym  }),
}));


// interface for usegymstore
interface GymsStore {
  gyms: Gym[] ;

  setGyms: (newGyms: Gym[]) => void;
}
// store for all gyms of current user
export const useGymsStore = create<GymsStore>((set) => ({
  gyms: [],

  setGyms: (newGyms: Gym[]) => set((state) => ({ gyms: [...state.gyms, ...newGyms] })),
}));
