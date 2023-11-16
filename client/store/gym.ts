import {create} from 'zustand'
import {devtools, persist}  from 'zustand/middleware'


interface GymStore {
  gym: any;
  setGym: (gym: any) => void;
}
export const useGymStore = create<GymStore>(set => ({
  gym: null,
  setGym: (gym: any)=> set({ gym }),

}))