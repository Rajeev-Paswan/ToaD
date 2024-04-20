"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Task from "../app/components/Task.jsx";
import CreateTaskModal from "./components/CreateTask.jsx";

export default function Home() {
    const { currentUser } = useSelector((state) => state.user);
    const router = useRouter();
    const [tasks, setTasks] = useState([]);

    console.log(currentUser);

    const fetchTask = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/task/`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'X-User-ID': currentUser._id
                    }
                }
            );
            const data = await response.json();
            setTasks(data.tasks);
            console.log("fetch success")
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (currentUser) {
            fetchTask();
        }
    }, [currentUser]);

    //  the active task
    const [activeButton, setActiveButton] = useState("toDo");

    useEffect(() => {
        if (!currentUser) {
            router.push("/signin");
        }
    }, []);

    const handleButtonClick = (type) => {
        setActiveButton(type);
    };

    // modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        fetchTask()
    };

    return (
        currentUser && (
            <main className="h-[calc(100vh-15%)] w-full pb-2 ">
                {/* <div className="text-center p-8">
                    Welcome, {currentUser.name}
                </div> */}
                <section className="h-full mx-4 rounded-lg bg-zinc-800 overflow-hidden">
                    <div className="h-14 w-full flex bg-zinc-800">
                        <button
                            className={`bg-zinc-800 m-1 rounded flex items-center justify-center flex-1 hover:bg-zinc-900 ${activeButton === "toDo" ? "bg-zinc-900" : ""
                                }`}
                            onClick={() => handleButtonClick("toDo")}
                        >
                            To-Do
                        </button>
                        <button
                            className={`bg-zinc-800 m-1 rounded flex items-center justify-center flex-1 hover:bg-zinc-900 ${activeButton === "pending" ? "bg-zinc-900" : ""
                                }`}
                            onClick={() => handleButtonClick("pending")}
                        >
                            Pending
                        </button>
                        <button
                            className={`bg-zinc-800 m-1 rounded flex items-center justify-center flex-1 hover:bg-zinc-900 ${activeButton === "complete" ? "bg-zinc-900" : ""
                                }`}
                            onClick={() => handleButtonClick("complete")}
                        >
                            Complete
                        </button>
                    </div>
                    <div className="h-[calc(100vh-28.5%)] bg-zinc-900 mx-1 p-4 rounded flex flex-wrap justify-between gap-4 overflow-y-scroll">
                        {tasks.map((task) => (
                            <Task key={task._id} task={task} fetchTask={fetchTask} />
                        ))}
                        <div className="w-full">
                            <button className="bg-black  w-full border border-gray-500 text-white px-4 py-2 rounded-lg" onClick={openModal}>Create Task</button>
                            {isModalOpen && <CreateTaskModal onClose={closeModal} />}
                        </div>
                    </div>
                </section>
            </main>
        )
    );
}
