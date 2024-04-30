import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { MdSave } from "react-icons/md";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateTaskMutation } from "../lib/task/taskApi";

export default function EditTaskModal({ onClose, task }) {
    const [updateTask] = useUpdateTaskMutation();
    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: task.title,
            description: task.description,
            status: task.status
        }
    });

    const [selectedStatus, setSelectedStatus] = useState(task.status)

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value)
    }


    const submitHandler = async (data) => {
        try {
            await updateTask({ taskId: task._id, taskData: data }).unwrap();
            toast.success("Task updated successfully");
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-zinc-900 p-1 rounded-lg shadow-lg z-10">
            
                <form
                onSubmit={handleSubmit(submitHandler)}
                 className="bg-black p-4 rounded-lg min-h-[70vh] w-full flex flex-col gap-4 justify-between overflow-hidden">
                    <div className="flex justify-between">
                        <input
                            {...register("title", { required: true })}
                            defaultValue={task.title}
                            className="text-md bg-zinc-900 py-1 px-5 rounded-full uppercase" />
                        <button className="transition-all bg-zinc-800 hover:bg-zinc-700 size-6 grid place-items-center rounded-full" onClick={onClose}>
                            <IoIosClose />
                        </button>
                    </div>
                    <textarea
                        {...register("description", { required: true })}
                        defaultValue={task.description}
                        className="text-sm line-clamp-4 bg-zinc-900 outline-none rounded-lg p-4 w-[80vw] flex-grow overflow-auto"></textarea>
                    <div className="flex justify-between">
                    <select
                        {...register("status")}
                        onChange={handleStatusChange}
                        defaultValue={task.status}
                        className={`px-5 py-0.5 rounded-full appearance-none cursor-pointer capitalize text-sm ${selectedStatus === 'todo' ? 'bg-yellow-600' : selectedStatus === 'pending' ? 'bg-red-500' : 'bg-green-500'}`}>
                        <option value="todo" className="bg-zinc-900">Todo</option>
                        <option value="pending" className="bg-zinc-900">Pending</option>
                        <option value="complete" className="bg-zinc-900">Complete</option>
                    </select>
                        <button className="transition-all hover:scale-110 p-2 rounded-full bg-green-500" onClick={() => submitHandler()}>
                            <MdSave />
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}