import {create} from 'zustand'
import {devtools, persist}  from 'zustand/middleware'


interface GymStore {
  gym: {gymId: string, accountId: string} | null;
  gyms: any;
  setGym: (gym: any) => void;
}
export const useGymStore = create<GymStore>(set => ({
  gyms: null,
  gym: null,
  setGym: (gym: any)=> set({ gym }),
  setGyms: (newGym: string)=>set((state)=>({...state.gyms, newGym})),

}))