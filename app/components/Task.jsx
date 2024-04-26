import { MdDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import EditTaskModal from "./EditTaskModal";

export default function ({ task, fetchTask }) {
    const [taskView, setTaskView] = useState(false);

    const deleteTask = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task/delete/${task._id}`, { method: 'DELETE' });

            if (response.ok) {
                fetchTask()
            }
            console.log(response)
        } catch (error) {
            console.error(error);
        }
    }

    // create task modal
    const openTaskView = () => {
        setTaskView(true);
    };

    const closeTaskView = () => {
        setTaskView(false);
        fetchTask()
    };

    return (
        <div key={task._id} className="bg-black p-4 rounded-lg h-56 w-full flex flex-col gap-4 justify-between overflow-hidden">
            <div className="flex justify-between">
                <span className="text-md bg-zinc-900 py-0.5 px-5 rounded-full uppercase">
                    {task.title}
                </span>
                <button className="transition-all hover:bg-zinc-800 p-2 rounded-full" onClick={openTaskView}>
                    <MdEdit />
                </button>
                {taskView && <EditTaskModal onClose={closeTaskView} onDelete={deleteTask} task={task} />}

            </div>
            <p className="text-sm px-2 line-clamp-4">{task.description}</p>
            <div className="flex justify-between">
                <button className="bg-green-600 px-5 py-0.5 rounded-full capitalize text-sm">
                    {task.status}
                </button>
                <button className="transition-all hover:bg-red-400 p-2 rounded-full bg-red-500" onClick={() => deleteTask()}>
                    <MdDeleteOutline />
                </button>
            </div>
        </div>
    );
}
