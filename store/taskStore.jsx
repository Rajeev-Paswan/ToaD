import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  createTaskQuery,
  getTasksQuery,
  deleteTaskQuery,
  updateTaskQuery,
} from "@/utils/taskQueries";
import useAuthStore from "./authStore";

const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: {
        todo: [],
        pending: [],
        complete: [],
      },
      loading: false,
      error: null,

      setCurrentUser: (user) => set({ currentUser: user }),

      createTask: async (newTask) => {
        set({ loading: true, error: null });
        const currentUser = useAuthStore.getState().currentUser;

        if (!currentUser) {
          const localTask = {
            ...newTask,
            _id: Date.now().toString(),
            status: newTask.status || "todo",
          };
          set((state) => ({
            tasks: {
              ...state.tasks,
              [localTask.status]: [
                localTask,
                ...(state.tasks[localTask.status] || []),
              ],
            },
            loading: false,
          }));
          return localTask;
        }

        try {
          const createdTask = await createTaskQuery(newTask);
          await get().getTasks();
          set((state) => ({
            tasks: {
              ...state.tasks,
              [createdTask.status]: [
                createdTask,
                ...(state.tasks?.[createdTask.status] || []),
              ],
            },
            loading: false,
          }));
          return createdTask;
        } catch (error) {
          set({
            error: error.message || "Failed to create task",
            loading: false,
          });
          throw error;
        }
      },

      getTasks: async () => {
        set({ loading: true, error: null });
        const currentUser = useAuthStore.getState().currentUser;

        if (!currentUser) {
          set({ loading: false });
          return get().tasks;
        }

        try {
          const { tasks: data } = await getTasksQuery(currentUser._id);
          const organizedTasks = {
            todo: data.filter((task) => task.status === "todo"),
            pending: data.filter((task) => task.status === "pending"),
            complete: data.filter((task) => task.status === "complete"),
          };
          set({ tasks: organizedTasks, loading: false });
          return organizedTasks;
        } catch (error) {
          set({
            error: error.message || "Failed to fetch tasks",
            loading: false,
          });
          throw error;
        }
      },

      deleteTask: async (taskId, status) => {
        set({ loading: true, error: null });
        const currentUser = useAuthStore.getState().currentUser;

        if (!currentUser) {
          set((state) => ({
            tasks: {
              ...state.tasks,
              [status]: state.tasks[status].filter(
                (task) => task._id !== taskId
              ),
            },
            loading: false,
          }));
          return;
        }

        try {
          await deleteTaskQuery(taskId);
          await get().getTasks();
          set((state) => ({
            tasks: {
              ...state.tasks,
              [status]: state.tasks[status].filter(
                (task) => task._id !== taskId
              ),
            },
            loading: false,
          }));
        } catch (error) {
          set({
            error: error.message || "Failed to delete task",
            loading: false,
          });
          throw error;
        }
      },

      updateTask: async (taskId, taskData, oldStatus) => {
        set({ loading: true, error: null });
        const currentUser = useAuthStore.getState().currentUser;

        if (!currentUser) {
          set((state) => {
            const newTasks = { ...state.tasks };
            newTasks[oldStatus] = newTasks[oldStatus].filter(
              (task) => task._id !== taskId
            );
            const updatedTask = { ...taskData, _id: taskId };
            newTasks[updatedTask.status] = [
              updatedTask,
              ...(newTasks[updatedTask.status] || []),
            ];
            return { tasks: newTasks, loading: false };
          });
          return taskData;
        }

        try {
          const updatedTask = await updateTaskQuery(taskId, taskData);
          await get().getTasks();
          set((state) => {
            const newTasks = { ...state.tasks };
            newTasks[oldStatus] = newTasks[oldStatus].filter(
              (task) => task._id !== taskId
            );
            newTasks[updatedTask.status] = [
              updatedTask,
              ...(newTasks[updatedTask.status] || []),
            ];
            return { tasks: newTasks, loading: false };
          });
          return updatedTask;
        } catch (error) {
          set({
            error: error.message || "Failed to update task",
            loading: false,
          });
          throw error;
        }
      },
    }),
    {
      name: "task-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ tasks: state.tasks }),
    }
  )
);

export default useTaskStore;
