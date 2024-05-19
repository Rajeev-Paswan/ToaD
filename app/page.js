"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Task from "../app/components/Task";
import CreateTaskModal from "./components/CreateTaskModal";
import { useGetTasksQuery } from "./lib/task/taskApi";
import { setUserTasks } from "./lib/task/taskSlice";
import Loading from "./components/Loading";

export default function Home() {
    const { currentUser } = useSelector((state) => state.user);
    const { data, isLoading: taskLoading, error } = useGetTasksQuery(currentUser?._id, { skip: !currentUser });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();

    const tasks = data?.tasks;
    
    useEffect(() => {
        if (tasks) {
            dispatch(setUserTasks(tasks));
        }
    }, [tasks, dispatch]);
    
    const userTasks = useSelector((state) => state.task);

    console.log(userTasks)

    // State for active task status filter
    const [activeTaskStatus, setActiveTaskStatus] = useState("todo");
    const filteredTasks = userTasks?.filter((task) => task.status.toLowerCase() === activeTaskStatus);

    // Function to handle task status button clicks
    const handleTaskStatusButtonClick = (status) => {
        setActiveTaskStatus(status);
    };

    // Functions to open and close the task creation modal
    const openTaskCreationModal = () => {
        setIsModalOpen(true);
    };

    const closeTaskCreationModal = () => {
        setIsModalOpen(false);
    };

    return (
        currentUser && (
            <main className="w-full h-full pb-2">
                <section className="relative h-full mx-2 rounded-lg bg-zinc-800 flex flex-col overflow-hidden">
                    <div className="h-14 w-full flex bg-zinc-800">
                        {/* Task status buttons */}
                        <button
                            className={`bg-zinc-800 m-1 rounded flex items-center justify-center flex-1 transition-all hover:bg-zinc-900 ${activeTaskStatus === "todo" ? "bg-zinc-900" : ""}`}
                            onClick={() => handleTaskStatusButtonClick("todo")}
                        >
                            To-Do
                        </button>
                        <button
                            className={`bg-zinc-800 m-1 rounded flex items-center justify-center flex-1 transition-all hover:bg-zinc-900 ${activeTaskStatus === "pending" ? "bg-zinc-900" : ""}`}
                            onClick={() => handleTaskStatusButtonClick("pending")}
                        >
                            Pending
                        </button>
                        <button
                            className={`bg-zinc-800 m-1 rounded flex items-center justify-center flex-1 transition-all hover:bg-zinc-900 ${activeTaskStatus === "complete" ? "bg-zinc-900" : ""}`}
                            onClick={() => handleTaskStatusButtonClick("complete")}
                        >
                            Complete
                        </button>
                    </div>
                    {/* Display tasks or loading state */}
                    {taskLoading ? (
                        <div className="bg-zinc-900 mx-1 p-4 rounded flex items-center justify-center h-full">
                            <Loading />
                        </div>
                    ) : (
                        filteredTasks.length ? (
                            <div className="bg-zinc-900 mx-1 p-4 max-sm:p-2 h-[80vh] max-sm:h-full rounded grid grid-cols-3 gap-4 max-sm:gap-2 overflow-auto pb-8 max-lg:grid-cols-2 max-md:grid-cols-1">
                                {filteredTasks.map((task) => (
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
                    <button className="absolute bottom-0 bg-black border-4 border-zinc-800 w-full text-white px-4 py-2 rounded-lg" onClick={openTaskCreationModal}>Add Task</button>
                    {/* Task creation modal */}
                    {isModalOpen && <CreateTaskModal onClose={closeTaskCreationModal} />}
                </section>
            </main>
        )
    );
}