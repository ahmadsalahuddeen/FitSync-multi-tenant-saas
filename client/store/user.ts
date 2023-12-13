import { Gym, Staff } from "@/types/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { persistNSync } from "persist-and-sync";

// interface for selected useUserStore
interface UserStore {
  user: Staff;

  setUser: (user: Staff) => void;
  resetUser: () => void;
}
// store current selected user
export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: {
          id: "",
          accountId: "",
          name: "",
          status: "",
          image: "",
          bio: "",

          email: "",
          password: "",
          role: "member",
          gyms: [],
          isInstructor: false,
          isActive: false,
        },
        setUser: (newUser: Staff) => set({ user: newUser }),
        resetUser: () =>
          set({
            user: {
              id: "",
              accountId: "",
              name: "",
              status: "",
              image: "",
              bio: "",

              email: "",
              password: "",
              role: "member",
              gyms: [],
              isInstructor: false,
              isActive: false,
            },
          }),
      }),
      { name: "UserStore" },
    ),
  ),
);
