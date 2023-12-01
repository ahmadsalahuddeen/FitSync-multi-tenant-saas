

import { Gym } from "@/types/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";




// interface for selected usegymstore
interface GymStore {
  gym: Gym ;

  setGym: (gym: Gym) => void;
}
// store current selected gym
export const useGymStore = create<GymStore>()(devtools( persist( (set) => ({
  gym: {
    id: '',
    accountId: '',
    name: '',
    phoneNumber: '',
    creatorId: '',

  },
  setGym: (newGym: Gym) => set({ gym: newGym  }),
}),
{name:'gymStore'})));


// interface for usegymstore
interface GymsStore {
  gyms: Gym[] ;

  setGyms: (newGym: Gym[]) => void;
  setOneGyms: (newGym: Gym) => void;
  removeGyms: (gymId: string) => void;
}
// store for all gyms of current user
export const useGymsStore = create<GymsStore>()(
  devtools(

  persist(
  (set) => ({
  gyms: [],

  setGyms: (newGym: Gym[]) => set((state) => ({  gyms: newGym})),
  setOneGyms: (newGym: Gym) => set((state) => ({  gyms: [newGym, ...state.gyms] })),
  
  removeGyms: (gymId: string) => set((state) => ({  gyms: state.gyms.filter((g)=> g.id !== gymId) })),
}), {name: 'gymsStore'})));
