import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { IoIosClose } from "react-icons/io";
import { useCreateTaskMutation } from "../lib/task/taskApi";

export default function CreateTaskModal({ onClose }) {
 const { currentUser } = useSelector((state) => state.user);
 const { register, handleSubmit } = useForm();
 const [createTask, { isLoading }] = useCreateTaskMutation();

 const userId = currentUser._id;

 const submitHandler = async (data) => {
    try {
      const newTask = { ...data, userId };
      const result = await createTask(newTask).unwrap();

      if (result) {
        toast.success("Created task successfully");
        onClose();
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.log(err);
      toast.error("Can't connect to server!");
    }
 };

 return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-zinc-900 p-4 rounded-md shadow-lg z-10">
        <div className="flex mb-4 items-center justify-between">
          <h2 className="text-lg font-semibold text-center">Create Task</h2>
          <button className="bg-zinc-800 text-lg text-white p-1 text-center rounded-full hover:bg-zinc-700" onClick={onClose}>
            <IoIosClose />
          </button>
        </div>
        {/* Task creation form goes here */}
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="bg-zinc-800 rounded-xl p-4 flex flex-col w-[24rem] max-md:w-[80vw]"
        >
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="Title"
            autoComplete="off"
            className="px-4 py-2 w-full bg-black/10 outline-none rounded-lg mb-4"
          />
          <input
            {...register("description", { required: true })}
            type="text"
            placeholder="Description"
            autoComplete="off"
            className="px-4 py-2 w-full bg-black/10 outline-none rounded-lg mb-4"
          />
          <select
            {...register("status")}
            name="status"
            className="bg-black/10 px-4 py-1.5 mb-4">
            <option value="todo">Todo</option>
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
          </select>
          <button
            type="submit"
            // disabled={isLoading}
            className="w-full text-white rounded-lg bg-[#000] py-3 hover:bg-[#2b2b2b]"
          >
            {isLoading ? "..." : "Create"}
          </button>
        </form>
      </div>
    </div>
 );
}