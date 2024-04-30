"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Task from "../app/components/Task";
import CreateTaskModal from "./components/CreateTaskModal";
import { useGetTasksQuery } from "./lib/task/taskApi";
import Loading from "./components/Loading";

export default function Home() {
    // Access current user from Redux store
    const { currentUser } = useSelector((state) => state.user);
    // Use RTK Query to fetch tasks
    const { data, isLoading: taskLoading, error } = useGetTasksQuery(currentUser?._id, { skip: !currentUser });
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const tasks = data?.tasks;

    // Redirect to sign-in page if no current user
    useEffect(() => {
        if (!currentUser) {
            router.push("/signin");
        }
    }, [currentUser, router]);

    // State for active task status filter
    const [activeButton, setActiveButton] = useState("todo");

    // Function to handle task status button clicks
    const handleButtonClick = (type) => {
        setActiveButton(type);
    };

    // Functions to open and close the task creation modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        currentUser && (
            <main className="w-full h-full pb-2">
                <section className="relative h-full mx-4 rounded-lg bg-zinc-800 flex flex-col overflow-hidden">
                    <div className="h-14 w-full flex bg-zinc-800">
                        {/* Task status buttons */}
                        <button
                            className={`bg-zinc-800 m-1 rounded flex items-center justify-center flex-1 transition-all hover:bg-zinc-900 ${activeButton === "todo" ? "bg-zinc-900" : ""}`}
                            onClick={() => handleButtonClick("todo")}
                        >
                            To-Do
                        </button>
                        <button
                            className={`bg-zinc-800 m-1 rounded flex items-center justify-center flex-1 transition-all hover:bg-zinc-900 ${activeButton === "pending" ? "bg-zinc-900" : ""}`}
                            onClick={() => handleButtonClick("pending")}
                        >
                            Pending
                        </button>
                        <button
                            className={`bg-zinc-800 m-1 rounded flex items-center justify-center flex-1 transition-all hover:bg-zinc-900 ${activeButton === "complete" ? "bg-zinc-900" : ""}`}
                            onClick={() => handleButtonClick("complete")}
                        >
                            Complete
                        </button>
                    </div>
                    {/* Display tasks or loading state */}
                    {taskLoading ? (
                        <div className="bg-zinc-900 mx-1 p-4 rounded grid place-items-center h-[80vh]">
                            <Loading />
                        </div>
                    ) : (
                        tasks?.length ? (
                            <div className="bg-zinc-900 mx-1 p-4 max-sm:p-2 h-[80vh] rounded grid grid-cols-3 gap-4 max-sm:gap-2 overflow-auto pb-8 max-lg:grid-cols-2 max-md:grid-cols-1">
                                {tasks.filter((task) => task.status.toLowerCase() === activeButton).map((task) => (
                                    <Task key={task._id} task={task} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-zinc-900 mx-1 p-4 h-[80vh] rounded grid place-items-center">
                                <Image src={"/assets/EmptyBox.svg"} alt="No Tasks" loading="lazy" width={300} height={300} />
                            </div>
                        )
                    )}
                    {/* Add task button */}
                    <button className="absolute bottom-0 bg-black border-4 border-zinc-800 w-full text-white px-4 py-2 rounded-lg" onClick={openModal}>Add Task</button>
                    {/* Task creation modal */}
                    {isModalOpen && <CreateTaskModal onClose={closeModal} />}
                </section>
            </main>
        )
    );
}
