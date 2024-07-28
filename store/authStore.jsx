import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { registerQuery, loginQuery, logoutQuery } from "@/utils/authQueries";
import useTaskStore from "./taskStore";

const useAuthStore = create(
  persist(
    (set) => ({
      currentUser: null,
      loading: true,
      error: null,

      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const data = await loginQuery(credentials);
          set({ currentUser: data, loading: false, error: null });

          const taskStore= useTaskStore.getState()
          taskStore.setCurrentUser(data);
          taskStore.getTasks();

          return data;
        } catch (error) {
          set({ error: error.message || "An error occurred", loading: false });
          throw error;
        }
      },

      register: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const data = await registerQuery(credentials);
          set({ currentUser: data, loading: false, error: null });

          const taskStore = useTaskStore.getState();
          taskStore.setCurrentUser(data);
          taskStore.getTasks();

          return data;
        } catch (e) {
          set({ error: error.message || "An error occurred", loading: false });
          throw error;
        }
      },

      logout: async () => {
        set({ loading: true, error: null });
        try {
          await logoutQuery();
          set({ currentUser: null, loading: false, error: null });

          const taskStore = useTaskStore.getState();
          taskStore.setCurrentUser(null);
          
        } catch (error) {
          set({
            error: error.message || "An error occurred during logout",
            loading: false,
          });
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
