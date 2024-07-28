import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { TbRotateClockwise } from "react-icons/tb";
import { MdEdit } from "react-icons/md";
import EditTaskModal from "./EditTaskModal";
import useTaskStore from "../../store/taskStore";

export default function Task({ task }) {
  const [taskView, setTaskView] = useState(false);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const loading = useTaskStore((state) => state.loading);

  const handleDeleteTask = async () => {
    try {
      await deleteTask(task._id, task.status);
    } catch (error) {
      console.error(error);
    }
  };

  const openTaskView = () => {
    setTaskView(true);
  };

  const closeTaskView = () => {
    setTaskView(false);
  };

  return (
    <div className="bg-black p-4 rounded-lg h-56 w-full flex flex-col gap-4 justify-between overflow-hidden">
      <div className="flex justify-between">
        <span className="text-md bg-zinc-900 py-0.5 px-5 rounded-full uppercase">
          {task?.title || "Title"}
        </span>
        <button
          className="transition-all hover:bg-zinc-800 p-2 rounded-full"
          onClick={openTaskView}
        >
          <MdEdit />
        </button>
        {taskView && <EditTaskModal onClose={closeTaskView} task={task} />}
      </div>
      <p className="text-sm px-2 line-clamp-4">{task?.description}</p>
      <div className="flex justify-between">
        <button className="bg-green-600 px-5 py-0.5 rounded-full capitalize text-sm">
          {task?.status}
        </button>
        <button
          className="transition-all hover:bg-red-400 p-2 rounded-full bg-red-500"
          onClick={handleDeleteTask}
          disabled={loading}
        >
          {loading ? <TbRotateClockwise className="animate-spin" /> : <MdDeleteOutline />}
        </button>
      </div>
    </div>
  );
}