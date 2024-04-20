import { MdDeleteOutline } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function ({ task, fetchTask }) {
    const deleteTask = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/task/delete/${task._id}`);
            
            if (response.ok) {
                fetchTask()
            }
            console.log(response)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div key={task.title} className="bg-black p-4 rounded-lg h-64 w-[28rem] flex flex-col justify-between overflow-hidden">
            <div className="flex justify-between">
                <span className="text-md bg-zinc-900 py-0.5 px-5 rounded-full uppercase">
                    {task.title}
                </span>
                <button className="transition-all hover:bg-zinc-800 p-2 rounded-full">
                    <BsThreeDotsVertical />
                </button>
            </div>
            <p className="text-sm p-2 line-clamp-4 leading-9">{task.description}</p>
            <div className="flex justify-between">
                <button className="bg-green-600 px-5 py-0.5 rounded-full capitalize text-sm">
                    {task.status}
                </button>
                <button className="transition-all hover:bg-red-400 p-2 rounded-full bg-red-500" onClick={()=> deleteTask()}>
                    <MdDeleteOutline />
                </button>
            </div>
        </div>
    );
}
