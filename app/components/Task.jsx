import { MdDeleteOutline } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";

export default function ({ task, fetchTask }) {
    const [expand, setExpand] = useState(false)
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
        <div key={task.title} className="bg-black p-4 rounded-lg h-fit w-[28rem] flex flex-col gap-4 justify-between overflow-hidden">
            <div className="flex justify-between">
                <span className="text-md bg-zinc-900 py-0.5 px-5 rounded-full uppercase">
                    {task.title}
                </span>
                <button className="transition-all hover:bg-zinc-800 p-2 rounded-full">
                    <BsThreeDotsVertical />
                </button>
            </div>
            <p className={`text-sm px-2 ${expand? "": "line-clamp-4"}`.trim()} onDoubleClick={()=>setExpand(!expand)}>{task.description}</p>
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
