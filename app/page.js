"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import Task from "../app/components/Task";
import CreateTaskModal from "./components/CreateTaskModal";
import Loading from "./components/Loading";
import useAuthStore from "../store/authStore";
import useTaskStore from "../store/taskStore";

export default function Home() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const getTasks = useTaskStore(state => state.getTasks)
  const tasks = useTaskStore((state) => state.tasks);
  const loading = useTaskStore((state) => state.loading);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTaskStatus, setActiveTaskStatus] = useState("todo");

  useEffect(() => {
    if (currentUser) {
      getTasks()
    }
  }, [])

  const activeTasks = tasks[activeTaskStatus] || [];

  const handleTaskStatusButtonClick = (status) => {
    setActiveTaskStatus(status);
  };

  const openTaskCreationModal = () => {
    setIsModalOpen(true);
  };
  const closeTaskCreationModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="size-full pb-2">
      <section className="relative h-full mx-2 rounded-lg bg-zinc-800 flex flex-col overflow-hidden">
        <div className="h-14 w-full flex bg-zinc-800">
          {["todo", "pending", "complete"].map((status) => (
            <button
              key={status}
              className={`bg-zinc-800 m-1 rounded flex items-center justify-center flex-1 transition-all hover:bg-zinc-900 ${activeTaskStatus === status ? "bg-zinc-900" : ""
                }`}
              onClick={() => handleTaskStatusButtonClick(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="bg-zinc-900 mx-1 p-4 rounded flex items-center justify-center h-full">
            <Loading />
          </div>
        ) : activeTasks.length > 0 ? (
          <div className="bg-zinc-900 mx-1 p-4 max-sm:p-2 h-[80vh] max-sm:h-full rounded grid grid-cols-3 gap-4 max-sm:gap-2 overflow-auto pb-8 max-lg:grid-cols-2 max-md:grid-cols-1">
            {activeTasks.map((task) => (
              task && task._id ? <Task key={task._id} task={task} /> : null
            ))}
          </div>
        ) : (
          <div className="bg-zinc-900 mx-1 p-4 h-[80vh] rounded grid place-items-center">
            <Image
              src="/assets/EmptyBox.svg"
              alt="No Tasks"
              loading="lazy"
              width={300}
              height={300}
            />
          </div>
        )}
        <button
          className="absolute bottom-0 bg-black border-4 border-zinc-800 w-full text-white px-4 py-2 rounded-lg"
          onClick={openTaskCreationModal}
        >
          Add Task
        </button>
        {isModalOpen && <CreateTaskModal onClose={closeTaskCreationModal} />}
      </section>
    </main>
  );
}